import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Alert,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress
} from '@mui/material';
import {
  Science,
  TrendingUp,
  Warning,
  CheckCircle,
  ExpandMore,
  Calculate,
  Refresh
} from '@mui/icons-material';

const IntensityPredictor = () => {
  const [formData, setFormData] = useState({
    // Seismic Features
    signal_energy_mean_year: 0.5,
    signal_energy_std_year: 0.3,
    dominant_frequency_mean_year: 0.4,
    signal_rms_mean_year: 0.6,
    signal_rms_std_year: 0.2,
    yearly_event_count: 150,
    energy_ratio: 0.7,
    stress_ratio: 0.8,
    freq_dur_product: 0.5,
    energy_per_pulse: 0.6,
    seismic_energy_density: 0.4,
    
    // Mechanical Features
    axial_stress: 0.8,
    radial_stress: 0.6,
    elastic_strain_energy: 0.7,
    brittleness_ratio: 0.5,
    density: 2.7,
    
    // Geological Features
    hour_sin: 0.5,
    hour_cos: 0.5,
    month_sin: 0.5,
    month_cos: 0.5,
    rock_type_granite: 0,
    rock_type_limestone: 0,
    rock_type_sandstone: 1,
    location_mine_a: 1,
    location_mine_b: 0,
    location_mine_c: 0
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confidence, setConfidence] = useState(0);

  const intensityLevels = [
    { level: 0, name: 'Low', color: '#4CAF50', description: 'Minimal risk, normal operations' },
    { level: 1, name: 'Medium', color: '#FF9800', description: 'Moderate risk, increased monitoring' },
    { level: 2, name: 'High', color: '#F44336', description: 'High risk, safety protocols required' },
    { level: 3, name: 'Very High', color: '#9C27B0', description: 'Critical risk, immediate action needed' }
  ];

  // Mock prediction function (in real app, this would call your ML model)
  const predictIntensity = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Simple mock prediction based on input values
      const seismicScore = (
        formData.signal_energy_mean_year * 0.3 +
        formData.signal_energy_std_year * 0.2 +
        formData.dominant_frequency_mean_year * 0.2 +
        formData.energy_ratio * 0.3
      );
      
      const mechanicalScore = (
        formData.axial_stress * 0.4 +
        formData.radial_stress * 0.3 +
        formData.elastic_strain_energy * 0.3
      );
      
      const totalScore = (seismicScore + mechanicalScore) / 2;
      
      let predictedLevel;
      let confidenceScore;
      
      if (totalScore < 0.3) {
        predictedLevel = 0;
        confidenceScore = 85 + Math.random() * 10;
      } else if (totalScore < 0.5) {
        predictedLevel = 1;
        confidenceScore = 80 + Math.random() * 15;
      } else if (totalScore < 0.7) {
        predictedLevel = 2;
        confidenceScore = 75 + Math.random() * 15;
      } else {
        predictedLevel = 3;
        confidenceScore = 70 + Math.random() * 20;
      }
      
      setPrediction({
        level: predictedLevel,
        confidence: confidenceScore,
        scores: {
          seismic: seismicScore,
          mechanical: mechanicalScore,
          total: totalScore
        }
      });
      
      setConfidence(confidenceScore);
      setLoading(false);
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      signal_energy_mean_year: 0.5,
      signal_energy_std_year: 0.3,
      dominant_frequency_mean_year: 0.4,
      signal_rms_mean_year: 0.6,
      signal_rms_std_year: 0.2,
      yearly_event_count: 150,
      energy_ratio: 0.7,
      stress_ratio: 0.8,
      freq_dur_product: 0.5,
      energy_per_pulse: 0.6,
      seismic_energy_density: 0.4,
      axial_stress: 0.8,
      radial_stress: 0.6,
      elastic_strain_energy: 0.7,
      brittleness_ratio: 0.5,
      density: 2.7,
      hour_sin: 0.5,
      hour_cos: 0.5,
      month_sin: 0.5,
      month_cos: 0.5,
      rock_type_granite: 0,
      rock_type_limestone: 0,
      rock_type_sandstone: 1,
      location_mine_a: 1,
      location_mine_b: 0,
      location_mine_c: 0
    });
    setPrediction(null);
    setConfidence(0);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderSlider = (field, label, min = 0, max = 1, step = 0.1) => (
    <Grid item xs={12} sm={6}>
      <Typography variant="body2" gutterBottom>
        {label}
      </Typography>
      <Slider
        value={formData[field]}
        onChange={(e, value) => handleInputChange(field, value)}
        min={min}
        max={max}
        step={step}
        marks={[
          { value: min, label: min },
          { value: max, label: max }
        ]}
        valueLabelDisplay="auto"
        sx={{ mt: 1 }}
      />
      <Typography variant="caption" color="textSecondary">
        Current: {formData[field].toFixed(2)}
      </Typography>
    </Grid>
  );

  const renderTextField = (field, label, type = "number", min = 0, max = 1000) => (
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label={label}
        type={type}
        value={formData[field]}
        onChange={(e) => handleInputChange(field, parseFloat(e.target.value) || 0)}
        inputProps={{ min, max, step: type === "number" ? 0.1 : undefined }}
        size="small"
      />
    </Grid>
  );

  const renderSelect = (field, label, options) => (
    <Grid item xs={12} sm={6}>
      <FormControl fullWidth size="small">
        <InputLabel>{label}</InputLabel>
        <Select
          value={formData[field]}
          label={label}
          onChange={(e) => handleInputChange(field, e.target.value)}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        <Science sx={{ mr: 1 }} />
        Rockburst Intensity Predictor
      </Typography>
      
      <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
        Input feature values to predict rockburst intensity levels in real-time.
      </Typography>

      <Grid container spacing={3}>
        {/* Input Form */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Feature Input
              </Typography>
              
              {/* Seismic Features */}
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Warning sx={{ mr: 1, color: '#2196F3' }} />
                    Seismic Features
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    {renderSlider('signal_energy_mean_year', 'Signal Energy Mean (Year)', 0, 1)}
                    {renderSlider('signal_energy_std_year', 'Signal Energy Std (Year)', 0, 1)}
                    {renderSlider('dominant_frequency_mean_year', 'Dominant Frequency Mean (Year)', 0, 1)}
                    {renderSlider('signal_rms_mean_year', 'Signal RMS Mean (Year)', 0, 1)}
                    {renderSlider('signal_rms_std_year', 'Signal RMS Std (Year)', 0, 1)}
                    {renderTextField('yearly_event_count', 'Yearly Event Count', 'number', 0, 1000)}
                    {renderSlider('energy_ratio', 'Energy Ratio', 0, 1)}
                    {renderSlider('stress_ratio', 'Stress Ratio', 0, 1)}
                    {renderSlider('freq_dur_product', 'Frequency-Duration Product', 0, 1)}
                    {renderSlider('energy_per_pulse', 'Energy per Pulse', 0, 1)}
                    {renderSlider('seismic_energy_density', 'Seismic Energy Density', 0, 1)}
                  </Grid>
                </AccordionDetails>
              </Accordion>

              {/* Mechanical Features */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUp sx={{ mr: 1, color: '#FF5722' }} />
                    Mechanical Features
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    {renderSlider('axial_stress', 'Axial Stress', 0, 1)}
                    {renderSlider('radial_stress', 'Radial Stress', 0, 1)}
                    {renderSlider('elastic_strain_energy', 'Elastic Strain Energy', 0, 1)}
                    {renderSlider('brittleness_ratio', 'Brittleness Ratio', 0, 1)}
                    {renderTextField('density', 'Density (g/cm³)', 'number', 1, 5)}
                  </Grid>
                </AccordionDetails>
              </Accordion>

              {/* Geological Features */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircle sx={{ mr: 1, color: '#4CAF50' }} />
                    Geological Features
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    {renderSlider('hour_sin', 'Hour (Sine)', -1, 1)}
                    {renderSlider('hour_cos', 'Hour (Cosine)', -1, 1)}
                    {renderSlider('month_sin', 'Month (Sine)', -1, 1)}
                    {renderSlider('month_cos', 'Month (Cosine)', -1, 1)}
                    {renderSelect('rock_type_sandstone', 'Rock Type', [
                      { value: 1, label: 'Sandstone' },
                      { value: 0, label: 'Other' }
                    ])}
                    {renderSelect('location_mine_a', 'Location', [
                      { value: 1, label: 'Mine A' },
                      { value: 0, label: 'Other' }
                    ])}
                  </Grid>
                </AccordionDetails>
              </Accordion>

              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<Calculate />}
                  onClick={predictIntensity}
                  disabled={loading}
                  size="large"
                >
                  {loading ? 'Predicting...' : 'Predict Intensity'}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  onClick={resetForm}
                  size="large"
                >
                  Reset
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Prediction Results */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Prediction Results
              </Typography>
              
              {loading && (
                <Box sx={{ mb: 2 }}>
                  <LinearProgress />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Analyzing features...
                  </Typography>
                </Box>
              )}

              {prediction && (
                <Box>
                  <Alert 
                    severity={prediction.level <= 1 ? "success" : prediction.level === 2 ? "warning" : "error"}
                    sx={{ mb: 2 }}
                  >
                    <Typography variant="h6">
                      Predicted Intensity: {intensityLevels[prediction.level].name}
                    </Typography>
                    <Typography variant="body2">
                      {intensityLevels[prediction.level].description}
                    </Typography>
                  </Alert>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Confidence Level
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={prediction.confidence} 
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {prediction.confidence.toFixed(1)}% confidence
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle2" gutterBottom>
                    Feature Scores
                  </Typography>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="body2">
                      Seismic Score: {(prediction.scores.seismic * 100).toFixed(1)}%
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={prediction.scores.seismic * 100} 
                      sx={{ height: 4, borderRadius: 2 }}
                    />
                  </Box>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="body2">
                      Mechanical Score: {(prediction.scores.mechanical * 100).toFixed(1)}%
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={prediction.scores.mechanical * 100} 
                      sx={{ height: 4, borderRadius: 2 }}
                    />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2">
                      Total Score: {(prediction.scores.total * 100).toFixed(1)}%
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={prediction.scores.total * 100} 
                      sx={{ height: 4, borderRadius: 2 }}
                    />
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle2" gutterBottom>
                    Risk Assessment
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {intensityLevels.map((level) => (
                      <Chip
                        key={level.level}
                        label={`Level ${level.level}: ${level.name}`}
                        color={prediction.level === level.level ? "primary" : "default"}
                        variant={prediction.level === level.level ? "filled" : "outlined"}
                        sx={{
                          borderColor: level.color,
                          color: prediction.level === level.level ? 'white' : level.color
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {!prediction && !loading && (
                <Alert severity="info">
                  Enter feature values and click "Predict Intensity" to get results.
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Intensity Level Guide */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Intensity Level Guide
          </Typography>
          <Grid container spacing={2}>
            {intensityLevels.map((level) => (
              <Grid item xs={12} sm={6} md={3} key={level.level}>
                <Box sx={{ p: 2, border: `2px solid ${level.color}`, borderRadius: 2 }}>
                  <Typography variant="h6" sx={{ color: level.color }}>
                    Level {level.level}: {level.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {level.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default IntensityPredictor;
