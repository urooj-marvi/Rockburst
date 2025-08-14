# feature_engineering.py
import pandas as pd
import numpy as np
from scipy.signal import stft

# Load preprocessed dataset
df = pd.read_csv("preprocessed_dataset.csv")

# -----------------
# Vibration Feature Engineering
# -----------------
# Signal energy normalized
df['signal_energy_norm'] = df['signal_energy'] / (df['signal_energy'].max() + 1e-6)

# Relative dominant frequency (normalized)
df['dominant_frequency_norm'] = df['dominant_frequency'] / (df['dominant_frequency'].max() + 1e-6)

# Event-wise vibration variability (std of main vibration features)
vibration_cols = ['signal_energy', 'dominant_frequency', 'signal_rms']
df['vibration_std'] = df[vibration_cols].std(axis=1)

# Location-wise vibration mean and std
loc_vib_stats = df.groupby('event_year')[vibration_cols].agg(['mean', 'std']).reset_index()
loc_vib_stats.columns = ['event_year'] + [f"{col}_{stat}_year" for col, stat in loc_vib_stats.columns[1:]]
df = df.merge(loc_vib_stats, on='event_year', how='left')

# -----------------
# Geological Feature Engineering
# -----------------
# Fault density proxy: number of events per depth
fault_density = df.groupby('event_year')['event_id'].count().reset_index()
fault_density.columns = ['event_year', 'yearly_event_count']
df = df.merge(fault_density, on='event_year', how='left')
df['fault_density_proxy'] = df['yearly_event_count'] / (df['depth'] + 1e-6)

# -----------------
# Seismic Dynamics
# -----------------
df['energy_ratio'] = df['signal_energy'] / (df['total_seismic_energy'] + 1e-6)
df['stress_ratio'] = df['axial_stress'] / (df['radial_stress'] + 1e-6)
df['freq_dur_product'] = df['dominant_frequency'] * df['event_duration']
df['energy_per_pulse'] = df['total_seismic_energy'] / (df['seismic_pulses'] + 1e-6)
df['seismic_energy_density'] = df['cumulative_seismic_energy'] / (df['depth'] + 1e-6)

# Save engineered dataset
df.to_csv("engineered_dataset.csv", index=False)
print("✅ Feature engineering complete. Saved as engineered_dataset.csv")
