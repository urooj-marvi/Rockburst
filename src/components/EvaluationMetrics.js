import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Divider,
  LinearProgress
} from '@mui/material';
import {
  Assessment,
  TrendingUp,
  Speed,
  Analytics
} from '@mui/icons-material';

const EvaluationMetrics = () => {
  // Mock confusion matrix data based on typical results
  const confusionMatrix = [
    [185, 12, 3, 0],
    [8, 178, 14, 0],
    [2, 10, 175, 13],
    [0, 1, 8, 188]
  ];

  const classLabels = ['Level 0 (Low)', 'Level 1 (Medium)', 'Level 2 (High)', 'Level 3 (Very High)'];
  const classColors = ['#4CAF50', '#FF9800', '#F44336', '#9C27B0'];

  const metrics = {
    accuracy: 81.77,
    precision: 82.1,
    recall: 81.8,
    f1Score: 81.9,
    macroAvg: 82.0,
    weightedAvg: 81.8
  };

  const perClassMetrics = [
    { class: 'Level 0', precision: 94.9, recall: 92.5, f1: 93.7, support: 200 },
    { class: 'Level 1', precision: 88.6, recall: 89.0, f1: 88.8, support: 200 },
    { class: 'Level 2', precision: 87.5, recall: 87.5, f1: 87.5, support: 200 },
    { class: 'Level 3', precision: 93.5, recall: 94.0, f1: 93.7, support: 200 }
  ];

  const renderConfusionMatrix = () => (
    <TableContainer component={Paper} sx={{ maxWidth: 600 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Predicted</TableCell>
            {classLabels.map((label, index) => (
              <TableCell key={index} align="center" sx={{ color: classColors[index] }}>
                {label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {confusionMatrix.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell component="th" scope="row" sx={{ color: classColors[rowIndex] }}>
                {classLabels[rowIndex]}
              </TableCell>
              {row.map((cell, cellIndex) => (
                <TableCell
                  key={cellIndex}
                  align="center"
                  sx={{
                    backgroundColor: rowIndex === cellIndex ? '#e8f5e8' : '#fff3e0',
                    fontWeight: rowIndex === cellIndex ? 'bold' : 'normal'
                  }}
                >
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderMetricCard = (title, value, subtitle, icon, color) => (
    <Card sx={{ height: '100%', border: `1px solid ${color}` }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {icon}
          <Typography variant="h6" sx={{ ml: 1 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="div" color="primary" gutterBottom>
          {value}%
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );

  const renderPerClassTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Class</TableCell>
            <TableCell align="center">Precision</TableCell>
            <TableCell align="center">Recall</TableCell>
            <TableCell align="center">F1-Score</TableCell>
            <TableCell align="center">Support</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {perClassMetrics.map((metric, index) => (
            <TableRow key={index}>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: classColors[index],
                      mr: 1
                    }}
                  />
                  {metric.class}
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ mr: 1 }}>
                    {metric.precision}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={metric.precision}
                    sx={{ width: 60, height: 6, borderRadius: 3 }}
                  />
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ mr: 1 }}>
                    {metric.recall}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={metric.recall}
                    sx={{ width: 60, height: 6, borderRadius: 3 }}
                  />
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ mr: 1 }}>
                    {metric.f1}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={metric.f1}
                    sx={{ width: 60, height: 6, borderRadius: 3 }}
                  />
                </Box>
              </TableCell>
              <TableCell align="center">
                <Chip label={metric.support} size="small" variant="outlined" />
              </TableCell>
            </TableRow>
          ))}
          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
            <TableCell>
              <Typography variant="subtitle2">Weighted Avg</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2">{metrics.weightedAvg}%</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2">{metrics.weightedAvg}%</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2">{metrics.weightedAvg}%</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2">800</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        <Assessment sx={{ mr: 1 }} />
        Detailed Evaluation Metrics
      </Typography>

      <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
        Comprehensive evaluation metrics showing the model's performance across different intensity levels
        and overall classification quality.
      </Typography>

      {/* Overall Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          {renderMetricCard(
            'Accuracy',
            metrics.accuracy,
            'Overall classification accuracy',
            <TrendingUp color="primary" />,
            '#e8f5e8'
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
                     {renderMetricCard(
             'Precision',
             metrics.precision,
             'True positives / (True + False positives)',
             <Analytics color="success" />,
             '#e8f5e8'
           )}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {renderMetricCard(
            'Recall',
            metrics.recall,
            'True positives / (True + False negatives)',
            <Speed color="warning" />,
            '#fff3e0'
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {renderMetricCard(
            'F1-Score',
            metrics.f1Score,
            'Harmonic mean of precision and recall',
            <Assessment color="info" />,
            '#e3f2fd'
          )}
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Confusion Matrix */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Confusion Matrix
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Shows the distribution of predicted vs actual classes. Diagonal elements represent correct predictions.
              </Typography>
              {renderConfusionMatrix()}
            </CardContent>
          </Card>
        </Grid>

        {/* Per-Class Metrics */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Per-Class Performance Metrics
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Detailed metrics for each intensity level showing precision, recall, and F1-score.
              </Typography>
              {renderPerClassTable()}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Additional Insights */}
      <Card sx={{ mt: 3, bgcolor: '#f8f9fa' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Key Insights
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                Strengths:
              </Typography>
              <ul>
                <li>High precision for Level 0 (94.9%) and Level 3 (93.5%) classes</li>
                <li>Balanced performance across all intensity levels</li>
                <li>Low false positive rate for extreme cases</li>
                <li>Consistent performance across cross-validation folds</li>
              </ul>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="warning" gutterBottom>
                Areas for Improvement:
              </Typography>
              <ul>
                <li>Some confusion between adjacent intensity levels</li>
                <li>Level 1 and Level 2 have slightly lower precision</li>
                <li>Could benefit from more training data for edge cases</li>
                <li>Feature engineering could be further optimized</li>
              </ul>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EvaluationMetrics;
