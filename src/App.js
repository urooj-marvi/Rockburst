import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Chip,
  Divider,
  Alert,
  AlertTitle
} from '@mui/material';
import ModelArchitecture from './components/ModelArchitecture';
import EvaluationMetrics from './components/EvaluationMetrics';
import IntensityPredictor from './components/IntensityPredictor';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Area,
  AreaChart
} from 'recharts';
import {
  TrendingUp,
  Assessment,
  DataUsage,
  Psychology,
  Warning,
  CheckCircle
} from '@mui/icons-material';

// Mock data based on the notebook results
const modelResults = {
  accuracy: 81.77,
  loss: 0.7593,
  stdAccuracy: 0.95,
  stdLoss: 0.0316,
  foldResults: [
    { fold: 1, loss: 0.7796, accuracy: 80.83 },
    { fold: 2, loss: 0.8013, accuracy: 82.67 },
    { fold: 3, loss: 0.7590, accuracy: 80.50 },
    { fold: 4, loss: 0.7491, accuracy: 82.83 },
    { fold: 5, loss: 0.7073, accuracy: 82.00 }
  ]
};

const classDistribution = [
  { name: 'Level 0 (Low)', value: 758, percentage: 25.3, color: '#4CAF50' },
  { name: 'Level 1 (Medium)', value: 766, percentage: 25.5, color: '#FF9800' },
  { name: 'Level 2 (High)', value: 729, percentage: 24.3, color: '#F44336' },
  { name: 'Level 3 (Very High)', value: 747, percentage: 24.9, color: '#9C27B0' }
];

const featureGroups = [
  { name: 'Seismic Features', count: 20, color: '#2196F3' },
  { name: 'Mechanical Features', count: 6, color: '#FF5722' },
  { name: 'Geological Features', count: 37, color: '#4CAF50' }
];

const topFeatures = [
  { name: 'signal_energy_mean_year', correlation: 0.89, group: 'Seismic' },
  { name: 'signal_energy_std_year', correlation: 0.87, group: 'Seismic' },
  { name: 'dominant_frequency_mean_year', correlation: 0.85, group: 'Seismic' },
  { name: 'axial_stress', correlation: 0.83, group: 'Mechanical' },
  { name: 'radial_stress', correlation: 0.81, group: 'Mechanical' },
  { name: 'elastic_strain_energy', correlation: 0.79, group: 'Mechanical' },
  { name: 'brittleness_ratio', correlation: 0.77, group: 'Mechanical' },
  { name: 'density', correlation: 0.75, group: 'Mechanical' }
];

const removedFeatures = [
  { name: 'peak_ground_acceleration', correlation: 0.968, reason: 'Too highly correlated' },
  { name: 'tangential_stress', correlation: 0.968, reason: 'Too highly correlated' },
  { name: 'seismic_event_rate', correlation: 0.964, reason: 'Too highly correlated' },
  { name: 'depth', correlation: 0.962, reason: 'Too highly correlated' },
  { name: 'compressive_strength', correlation: 0.961, reason: 'Too highly correlated' }
];

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function App() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#1a237e' }}>
        <Toolbar>
          <Warning sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Rockburst Intensity Prediction - Model Visualization Dashboard
          </Typography>
          <Chip 
            label={`Accuracy: ${modelResults.accuracy}%`} 
            color="success" 
            variant="outlined"
            sx={{ color: 'white', borderColor: 'white' }}
          />
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {/* Model Performance Summary */}
        <Alert severity="info" sx={{ mb: 3 }}>
          <AlertTitle>Model Performance Summary</AlertTitle>
          <strong>Neural Network Model:</strong> Multi-branch architecture with seismic, mechanical, and geological features
          <br />
          <strong>Dataset:</strong> 3,000 samples with 4 intensity levels (0-3)
          <br />
          <strong>Validation:</strong> 5-fold stratified cross-validation
        </Alert>

        {/* Key Metrics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={3}>
            <Card sx={{ bgcolor: '#e8f5e8' }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  <CheckCircle sx={{ mr: 1 }} />
                  Overall Accuracy
                </Typography>
                <Typography variant="h4" component="div" color="primary">
                  {modelResults.accuracy}%
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ±{modelResults.stdAccuracy}% std
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ bgcolor: '#fff3e0' }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  <TrendingUp sx={{ mr: 1 }} />
                  Validation Loss
                </Typography>
                <Typography variant="h4" component="div" color="warning.main">
                  {modelResults.loss}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ±{modelResults.stdLoss} std
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ bgcolor: '#e3f2fd' }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  <DataUsage sx={{ mr: 1 }} />
                  Total Features
                </Typography>
                <Typography variant="h4" component="div" color="info.main">
                  63
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  After feature selection
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ bgcolor: '#f3e5f5' }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  <Psychology sx={{ mr: 1 }} />
                  Model Architecture
                </Typography>
                <Typography variant="h4" component="div" color="secondary.main">
                  Multi-Branch
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Neural Network
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tabs for different visualizations */}
        <Paper sx={{ width: '100%' }}>
          <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tab label="Model Performance" />
            <Tab label="Data Distribution" />
            <Tab label="Feature Analysis" />
            <Tab label="Cross-Validation Results" />
            <Tab label="Model Architecture" />
            <Tab label="Evaluation Metrics" />
            <Tab label="Intensity Predictor" />
          </Tabs>

          {/* Model Performance Tab */}
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Cross-Validation Accuracy by Fold
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={modelResults.foldResults}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="fold" />
                        <YAxis domain={[75, 85]} />
                        <Tooltip />
                        <Bar dataKey="accuracy" fill="#2196F3" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Cross-Validation Loss by Fold
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={modelResults.foldResults}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="fold" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="loss" stroke="#f44336" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Data Distribution Tab */}
          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Class Distribution
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={classDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percentage }) => `${name}: ${percentage}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {classDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Feature Groups Distribution
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={featureGroups}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Feature Analysis Tab */}
          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Top Feature Correlations
                    </Typography>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={topFeatures} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 1]} />
                        <YAxis dataKey="name" type="category" width={150} />
                        <Tooltip />
                        <Bar dataKey="correlation" fill="#4CAF50" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Removed Features (High Correlation)
                    </Typography>
                    <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
                      {removedFeatures.map((feature, index) => (
                        <Box key={index} sx={{ mb: 2, p: 2, bgcolor: '#fff3e0', borderRadius: 1 }}>
                          <Typography variant="subtitle2" color="error">
                            {feature.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Correlation: {feature.correlation} | Reason: {feature.reason}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Cross-Validation Results Tab */}
          <TabPanel value={tabValue} index={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Detailed Cross-Validation Results
                    </Typography>
                    <Box sx={{ overflow: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{ backgroundColor: '#f5f5f5' }}>
                            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Fold</th>
                            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Validation Loss</th>
                            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Validation Accuracy (%)</th>
                            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Performance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {modelResults.foldResults.map((result, index) => (
                            <tr key={index}>
                              <td style={{ padding: '12px', border: '1px solid #ddd' }}>Fold {result.fold}</td>
                              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{result.loss.toFixed(4)}</td>
                              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{result.accuracy.toFixed(2)}%</td>
                              <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                                <Chip 
                                  label={result.accuracy > 80 ? "Good" : "Fair"} 
                                  color={result.accuracy > 80 ? "success" : "warning"}
                                  size="small"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body2" color="textSecondary">
                      <strong>Average Results:</strong> Loss = {modelResults.loss.toFixed(4)} ± {modelResults.stdLoss.toFixed(4)}, 
                      Accuracy = {modelResults.accuracy.toFixed(2)}% ± {modelResults.stdAccuracy.toFixed(2)}%
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
                     </TabPanel>

           {/* Model Architecture Tab */}
           <TabPanel value={tabValue} index={4}>
             <ModelArchitecture />
           </TabPanel>

           {/* Evaluation Metrics Tab */}
           <TabPanel value={tabValue} index={5}>
             <EvaluationMetrics />
           </TabPanel>

           {/* Intensity Predictor Tab */}
           <TabPanel value={tabValue} index={6}>
             <IntensityPredictor />
           </TabPanel>
         </Paper>
       </Container>
     </Box>
   );
 }

export default App;
