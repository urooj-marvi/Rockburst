import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Divider,
  Chip
} from '@mui/material';
import {
  AccountTree,
  Hub,
  Layers,
  Merge
} from '@mui/icons-material';

const ModelArchitecture = () => {
  const architecture = {
    seismic: {
      name: 'Seismic Branch',
      features: 20,
      layers: [
        { type: 'Dense', units: 16, activation: 'ReLU' },
        { type: 'BatchNorm', units: '-' },
        { type: 'Dropout', rate: 0.6 },
        { type: 'Dense', units: 8, activation: 'ReLU' },
        { type: 'BatchNorm', units: '-' },
        { type: 'Dropout', rate: 0.6 }
      ],
      color: '#2196F3'
    },
    mechanical: {
      name: 'Mechanical Branch',
      features: 6,
      layers: [
        { type: 'Dense', units: 8, activation: 'ReLU' },
        { type: 'BatchNorm', units: '-' },
        { type: 'Dropout', rate: 0.6 }
      ],
      color: '#FF5722'
    },
    geological: {
      name: 'Geological Branch',
      features: 37,
      layers: [
        { type: 'Dense', units: 8, activation: 'ReLU' },
        { type: 'BatchNorm', units: '-' },
        { type: 'Dropout', rate: 0.6 }
      ],
      color: '#4CAF50'
    },
    fusion: {
      name: 'Fusion Layer',
      layers: [
        { type: 'Concatenate', units: '-' },
        { type: 'Dense', units: 8, activation: 'ReLU' },
        { type: 'BatchNorm', units: '-' },
        { type: 'Dropout', rate: 0.7 },
        { type: 'Dense', units: 4, activation: 'Softmax' }
      ],
      color: '#9C27B0'
    }
  };

  const renderLayer = (layer, index) => (
    <Box
      key={index}
      sx={{
        p: 1,
        mb: 1,
        borderRadius: 1,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Layers sx={{ mr: 1, fontSize: 16 }} />
        <Typography variant="body2">{layer.type}</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {layer.units !== '-' && (
          <Chip
            label={`${layer.units} units`}
            size="small"
            variant="outlined"
            sx={{ mr: 1 }}
          />
        )}
        {layer.activation && (
          <Chip
            label={layer.activation}
            size="small"
            color="primary"
            variant="outlined"
          />
        )}
        {layer.rate && (
          <Chip
            label={`${layer.rate * 100}%`}
            size="small"
            color="warning"
            variant="outlined"
          />
        )}
      </Box>
    </Box>
  );

  const renderBranch = (branch, key) => (
    <Card
      key={key}
      sx={{
        height: '100%',
        border: `2px solid ${branch.color}`,
        '&:hover': {
          boxShadow: 4,
          transform: 'translateY(-2px)',
          transition: 'all 0.3s ease'
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Hub sx={{ mr: 1, color: branch.color }} />
          <Typography variant="h6" color="primary">
            {branch.name}
          </Typography>
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Chip
            label={`${branch.features} input features`}
            color="info"
            variant="outlined"
            size="small"
          />
        </Box>

        <Divider sx={{ my: 2 }} />
        
        <Typography variant="subtitle2" gutterBottom>
          Layer Architecture:
        </Typography>
        
        {branch.layers.map((layer, index) => renderLayer(layer, index))}
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        <AccountTree sx={{ mr: 1 }} />
        Multi-Branch Neural Network Architecture
      </Typography>
      
      <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
        The model uses a sophisticated multi-branch architecture that processes different types of features separately
        before combining them for final prediction. This approach allows the model to learn specialized representations
        for each feature group.
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          {renderBranch(architecture.seismic, 'seismic')}
        </Grid>
        <Grid item xs={12} md={4}>
          {renderBranch(architecture.mechanical, 'mechanical')}
        </Grid>
        <Grid item xs={12} md={4}>
          {renderBranch(architecture.geological, 'geological')}
        </Grid>
      </Grid>

      {/* Fusion Layer */}
      <Paper
        sx={{
          p: 3,
          border: `2px solid ${architecture.fusion.color}`,
          bgcolor: 'background.paper',
          position: 'relative'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Merge sx={{ mr: 1, color: architecture.fusion.color }} />
          <Typography variant="h6" color="primary">
            {architecture.fusion.name}
          </Typography>
        </Box>
        
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          Combines features from all three branches and produces final intensity predictions
        </Typography>

        <Grid container spacing={2}>
          {architecture.fusion.layers.map((layer, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              {renderLayer(layer, index)}
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Model Summary */}
      <Card sx={{ mt: 3, bgcolor: '#f8f9fa' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Model Summary
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body2" color="textSecondary">
                Total Parameters
              </Typography>
              <Typography variant="h6">
                ~2,500
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body2" color="textSecondary">
                Input Features
              </Typography>
              <Typography variant="h6">
                63
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body2" color="textSecondary">
                Output Classes
              </Typography>
              <Typography variant="h6">
                4
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body2" color="textSecondary">
                Regularization
              </Typography>
              <Typography variant="h6">
                L1/L2 + Dropout
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ModelArchitecture;
