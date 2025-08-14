// Data Export Utility for Rockburst Visualization Dashboard
// This file shows how to export data from Jupyter notebook and integrate with React

export const exportModelResults = () => {
  // Example of how to export results from Jupyter notebook
  const pythonCode = `
# In your Jupyter notebook, add this code to export results:

import json
import pandas as pd
import numpy as np

# Export cross-validation results
fold_results = [
    {'fold': 1, 'loss': 0.7796, 'accuracy': 80.83},
    {'fold': 2, 'loss': 0.8013, 'accuracy': 82.67},
    {'fold': 3, 'loss': 0.7590, 'accuracy': 80.50},
    {'fold': 4, 'loss': 0.7491, 'accuracy': 82.83},
    {'fold': 5, 'loss': 0.7073, 'accuracy': 82.00}
]

# Export feature correlations
feature_correlations = [
    {'name': 'signal_energy_mean_year', 'correlation': 0.89, 'group': 'Seismic'},
    {'name': 'signal_energy_std_year', 'correlation': 0.87, 'group': 'Seismic'},
    {'name': 'dominant_frequency_mean_year', 'correlation': 0.85, 'group': 'Seismic'},
    {'name': 'axial_stress', 'correlation': 0.83, 'group': 'Mechanical'},
    {'name': 'radial_stress', 'correlation': 0.81, 'group': 'Mechanical'},
    {'name': 'elastic_strain_energy', 'correlation': 0.79, 'group': 'Mechanical'},
    {'name': 'brittleness_ratio', 'correlation': 0.77, 'group': 'Mechanical'},
    {'name': 'density', 'correlation': 0.75, 'group': 'Mechanical'}
]

# Export class distribution
class_distribution = [
    {'name': 'Level 0 (Low)', 'value': 758, 'percentage': 25.3, 'color': '#4CAF50'},
    {'name': 'Level 1 (Medium)', 'value': 766, 'percentage': 25.5, 'color': '#FF9800'},
    {'name': 'Level 2 (High)', 'value': 729, 'percentage': 24.3, 'color': '#F44336'},
    {'name': 'Level 3 (Very High)', 'value': 747, 'percentage': 24.9, 'color': '#9C27B0'}
]

# Export confusion matrix
confusion_matrix = [
    [185, 12, 3, 0],
    [8, 178, 14, 0],
    [2, 10, 175, 13],
    [0, 1, 8, 188]
]

# Export per-class metrics
per_class_metrics = [
    {'class': 'Level 0', 'precision': 94.9, 'recall': 92.5, 'f1': 93.7, 'support': 200},
    {'class': 'Level 1', 'precision': 88.6, 'recall': 89.0, 'f1': 88.8, 'support': 200},
    {'class': 'Level 2', 'precision': 87.5, 'recall': 87.5, 'f1': 87.5, 'support': 200},
    {'class': 'Level 3', 'precision': 93.5, 'recall': 94.0, 'f1': 93.7, 'support': 200}
]

# Save to JSON files
with open('model_results.json', 'w') as f:
    json.dump({
        'fold_results': fold_results,
        'feature_correlations': feature_correlations,
        'class_distribution': class_distribution,
        'confusion_matrix': confusion_matrix,
        'per_class_metrics': per_class_metrics,
        'overall_metrics': {
            'accuracy': 81.77,
            'loss': 0.7593,
            'std_accuracy': 0.95,
            'std_loss': 0.0316
        }
    }, f, indent=2)

print("Model results exported to model_results.json")
`;

  return pythonCode;
};

export const loadModelResults = async () => {
  // Example of how to load results in React
  try {
    const response = await fetch('/data/model_results.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading model results:', error);
    return null;
  }
};

export const dataStructure = {
  foldResults: [
    {
      fold: 1,
      loss: 0.7796,
      accuracy: 80.83
    }
  ],
  featureCorrelations: [
    {
      name: 'feature_name',
      correlation: 0.89,
      group: 'Seismic'
    }
  ],
  classDistribution: [
    {
      name: 'Level 0 (Low)',
      value: 758,
      percentage: 25.3,
      color: '#4CAF50'
    }
  ],
  confusionMatrix: [
    [185, 12, 3, 0],
    [8, 178, 14, 0],
    [2, 10, 175, 13],
    [0, 1, 8, 188]
  ],
  perClassMetrics: [
    {
      class: 'Level 0',
      precision: 94.9,
      recall: 92.5,
      f1: 93.7,
      support: 200
    }
  ],
  overallMetrics: {
    accuracy: 81.77,
    loss: 0.7593,
    stdAccuracy: 0.95,
    stdLoss: 0.0316
  }
};

export const integrationGuide = `
# Integration Guide

## 1. Export Data from Jupyter Notebook
Run the Python code provided in exportModelResults() to create a JSON file with your model results.

## 2. Place Data in Public Folder
Copy the generated model_results.json file to the public/data/ folder of your React app.

## 3. Update Components
Replace the mock data in App.js with real data loaded from the JSON file:

```javascript
import { loadModelResults } from './utils/dataExport';

function App() {
  const [modelData, setModelData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await loadModelResults();
      setModelData(data);
    };
    loadData();
  }, []);

  if (!modelData) return <div>Loading...</div>;

  // Use modelData instead of mock data
}
```

## 4. Customize Visualizations
Update the chart components to use your actual data structure and styling preferences.
`;

export default {
  exportModelResults,
  loadModelResults,
  dataStructure,
  integrationGuide
};
