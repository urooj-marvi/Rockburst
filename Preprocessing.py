# preprocess.py
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import KNNImputer

# -----------------
# Load Dataset
# -----------------
file_path = "updated_file_r.csv"
df = pd.read_csv(file_path)

# Parse date/time
df['event_time'] = pd.to_datetime(df['event_time'], errors='coerce')
df['event_year'] = df['event_time'].dt.year
df['event_month'] = df['event_time'].dt.month
df['event_day'] = df['event_time'].dt.day
df['event_hour'] = df['event_time'].dt.hour

# Cyclic encodings for time
df['hour_sin'] = np.sin(2 * np.pi * df['event_hour'] / 24)
df['hour_cos'] = np.cos(2 * np.pi * df['event_hour'] / 24)
df['month_sin'] = np.sin(2 * np.pi * df['event_month'] / 12)
df['month_cos'] = np.cos(2 * np.pi * df['event_month'] / 12)

# Encode intensity labels as numbers
intensity_map = {"I": 1, "II": 2, "III": 3, "IV": 4}
df['intensity_label_num'] = df['intensity_label'].map(intensity_map)

# Handle missing values with KNN imputer
num_cols = df.select_dtypes(include=[np.number]).columns.tolist()
imputer = KNNImputer(n_neighbors=5)
df[num_cols] = imputer.fit_transform(df[num_cols])

# One-hot encode rock_type and location
encoder = OneHotEncoder(drop='first', sparse_output=False)
encoded_cats = encoder.fit_transform(df[['rock_type', 'location']])
encoded_cat_df = pd.DataFrame(encoded_cats, columns=encoder.get_feature_names_out(['rock_type', 'location']))

df = pd.concat([df.reset_index(drop=True), encoded_cat_df], axis=1)
df.drop(columns=['rock_type', 'location'], inplace=True)

# Scale numerical features
scaler = StandardScaler()
num_features = df.select_dtypes(include=[np.number]).columns.tolist()
num_features.remove('intensity_label_num')  # Keep target separate
df[num_features] = scaler.fit_transform(df[num_features])

# Save preprocessed dataset
df.to_csv("preprocessed_dataset.csv", index=False)
print("✅ Preprocessing complete. Saved as preprocessed_dataset.csv")
