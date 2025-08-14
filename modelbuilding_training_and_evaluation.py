# train_model.py
import os
import pandas as pd
import numpy as np
from sklearn.model_selection import StratifiedKFold
from sklearn.preprocessing import StandardScaler
from sklearn.utils.class_weight import compute_class_weight
from tensorflow.keras.layers import Input, Dense, Dropout, Concatenate, BatchNormalization
from tensorflow.keras.models import Model
from tensorflow.keras.regularizers import l1_l2
from tensorflow.keras.optimizers import AdamW
from tensorflow.keras.callbacks import EarlyStopping, Callback
import tensorflow as tf
import math
from scipy.stats import pearsonr
from sklearn.metrics import classification_report, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns

# =========================
# CONFIGURATION
# =========================
DATA_PATH = "engineered_dataset.csv"
MODEL_SAVE_DIR = "saved_models"
os.makedirs(MODEL_SAVE_DIR, exist_ok=True)

# =========================
# 1. Load Dataset
# =========================
if not os.path.exists(DATA_PATH):
    raise FileNotFoundError(f"Dataset not found at {DATA_PATH}")

df = pd.read_csv(DATA_PATH)
print(f"Dataset loaded: {df.shape}")

# =========================
# 2. Feature Groups
# =========================
seismic_feats = [
    'signal_energy','event_duration','dominant_frequency','signal_rms',
    'seismic_event_rate','peak_ground_acceleration','gutenberg_richter_b',
    'cumulative_seismic_energy','seismic_pulses','total_seismic_energy',
    'signal_energy_norm','dominant_frequency_norm','vibration_std',
    'signal_energy_mean_year','signal_energy_std_year',
    'dominant_frequency_mean_year','dominant_frequency_std_year',
    'signal_rms_mean_year','signal_rms_std_year',
    'yearly_event_count','energy_ratio','stress_ratio',
    'freq_dur_product','energy_per_pulse','seismic_energy_density'
]

mechanical_feats = [
    'depth','compressive_strength','tensile_strength','tangential_stress',
    'brittleness_ratio','elastic_strain_energy','density',
    'axial_stress','radial_stress','strain_rate'
]

geo_feats = [
    'hour_sin','hour_cos','month_sin','month_cos',
] + [col for col in df.columns if col.startswith('rock_type_')] \
  + [col for col in df.columns if col.startswith('location_')]

target_col = 'intensity_label_num'

# =========================
# 3. Remove Highly Correlated Features
# =========================
y = df[target_col].values - 1
all_features = df[seismic_feats + mechanical_feats + geo_feats].values
feature_names = seismic_feats + mechanical_feats + geo_feats

target_correlations = []
for i, feature in enumerate(feature_names):
    corr, _ = pearsonr(all_features[:, i], y)
    target_correlations.append((feature, abs(corr)))

high_corr_threshold = 0.9
features_to_remove = [f for f, corr in target_correlations if corr > high_corr_threshold]

seismic_feats = [f for f in seismic_feats if f not in features_to_remove]
mechanical_feats = [f for f in mechanical_feats if f not in features_to_remove]
geo_feats = [f for f in geo_feats if f not in features_to_remove]

print(f"Removed {len(features_to_remove)} highly correlated features.")

# =========================
# 4. Prepare Data
# =========================
X_seismic = df[seismic_feats].values
X_mech = df[mechanical_feats].values
X_geo = df[geo_feats].values

# Class weights
class_weights = compute_class_weight("balanced", classes=np.unique(y), y=y)
class_weight_dict = dict(zip(np.unique(y), class_weights))

# =========================
# 5. Model Builder
# =========================
def build_model(input_shapes, num_classes):
    # Seismic branch
    inp_s = Input(shape=(input_shapes[0],))
    x_s = Dense(16, activation='relu', kernel_regularizer=l1_l2(1e-3, 1e-2))(inp_s)
    x_s = BatchNormalization()(x_s)
    x_s = Dropout(0.6)(x_s)
    x_s = Dense(8, activation='relu', kernel_regularizer=l1_l2(1e-3, 1e-2))(x_s)
    x_s = BatchNormalization()(x_s)
    x_s = Dropout(0.6)(x_s)

    # Mechanical branch
    inp_m = Input(shape=(input_shapes[1],))
    x_m = Dense(8, activation='relu', kernel_regularizer=l1_l2(1e-3, 1e-2))(inp_m)
    x_m = BatchNormalization()(x_m)
    x_m = Dropout(0.6)(x_m)

    # Geological branch
    inp_g = Input(shape=(input_shapes[2],))
    x_g = Dense(8, activation='relu', kernel_regularizer=l1_l2(1e-3, 1e-2))(inp_g)
    x_g = BatchNormalization()(x_g)
    x_g = Dropout(0.6)(x_g)

    # Merge branches
    merged = Concatenate()([x_s, x_m, x_g])
    merged = Dense(8, activation='relu', kernel_regularizer=l1_l2(1e-3, 1e-2))(merged)
    merged = BatchNormalization()(merged)
    merged = Dropout(0.7)(merged)

    output = Dense(num_classes, activation='softmax')(merged)

    model = Model(inputs=[inp_s, inp_m, inp_g], outputs=output)
    model.compile(
        optimizer=AdamW(learning_rate=0.001, weight_decay=0.01),
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )
    return model

# =========================
# 6. Cosine Annealing Scheduler
# =========================
class CosineAnnealingScheduler(Callback):
    def __init__(self, initial_lr=0.001, min_lr=1e-6, max_epochs=50, warmup_epochs=5):
        self.initial_lr = initial_lr
        self.min_lr = min_lr
        self.max_epochs = max_epochs
        self.warmup_epochs = warmup_epochs

    def on_epoch_begin(self, epoch, logs=None):
        if epoch < self.warmup_epochs:
            lr = self.initial_lr * (epoch + 1) / self.warmup_epochs
        else:
            progress = (epoch - self.warmup_epochs) / (self.max_epochs - self.warmup_epochs)
            lr = self.min_lr + (self.initial_lr - self.min_lr) * 0.5 * (1 + math.cos(math.pi * progress))
        tf.keras.backend.set_value(self.model.optimizer.lr, lr)
        print(f"Epoch {epoch+1}: Learning rate = {lr:.6f}")

# =========================
# 7. Cross-validation Training
# =========================
skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
fold_results = []
all_preds, all_labels = [], []

for fold, (train_idx, val_idx) in enumerate(skf.split(X_seismic, y)):
    print(f"\n===== Fold {fold+1} =====")

    X_s_train, X_s_val = X_seismic[train_idx], X_seismic[val_idx]
    X_m_train, X_m_val = X_mech[train_idx], X_mech[val_idx]
    X_g_train, X_g_val = X_geo[train_idx], X_geo[val_idx]
    y_train, y_val = y[train_idx], y[val_idx]

    scaler_s = StandardScaler().fit(X_s_train)
    scaler_m = StandardScaler().fit(X_m_train)
    scaler_g = StandardScaler().fit(X_g_train)

    X_s_train, X_s_val = scaler_s.transform(X_s_train), scaler_s.transform(X_s_val)
    X_m_train, X_m_val = scaler_m.transform(X_m_train), scaler_m.transform(X_m_val)
    X_g_train, X_g_val = scaler_g.transform(X_g_train), scaler_g.transform(X_g_val)

    model = build_model(
        input_shapes=[X_seismic.shape[1], X_mech.shape[1], X_geo.shape[1]],
        num_classes=len(np.unique(y))
    )

    callbacks = [
        EarlyStopping(monitor='val_loss', patience=10, restore_best_weights=True),
        CosineAnnealingScheduler()
    ]

    model.fit(
        [X_s_train, X_m_train, X_g_train], y_train,
        validation_data=([X_s_val, X_m_val, X_g_val], y_val),
        epochs=50, batch_size=32,
        class_weight=class_weight_dict,
        callbacks=callbacks,
        verbose=1
    )

    val_loss, val_acc = model.evaluate([X_s_val, X_m_val, X_g_val], y_val, verbose=0)
    fold_results.append((val_loss, val_acc))
    print(f"Fold {fold+1} — Loss: {val_loss:.4f}, Accuracy: {val_acc:.4f}")

    preds = np.argmax(model.predict([X_s_val, X_m_val, X_g_val]), axis=1)
    all_preds.extend(preds)
    all_labels.extend(y_val)

    # Save model for this fold
    model.save(os.path.join(MODEL_SAVE_DIR, f"model_fold_{fold+1}.h5"))

# =========================
# 8. Final Metrics
# =========================
print("\n=== Cross-validation results ===")
for i, (loss, acc) in enumerate(fold_results):
    print(f"Fold {i+1}: Loss={loss:.4f}, Acc={acc:.4f}")
print(f"Avg Loss: {np.mean([x[0] for x in fold_results]):.4f}")
print(f"Avg Acc: {np.mean([x[1] for x in fold_results]):.4f}")

print("\n=== Classification Report ===")
print(classification_report(all_labels, all_preds, digits=4))

cm = confusion_matrix(all_labels, all_preds)
plt.figure(figsize=(8,6))
sns.heatmap(cm, annot=True, fmt="d", cmap="Blues")
plt.xlabel("Predicted")
plt.ylabel("True")
plt.title("Confusion Matrix")
plt.savefig(os.path.join(MODEL_SAVE_DIR, "confusion_matrix.png"))
