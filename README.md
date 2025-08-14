# 🚀 Rockburst Intensity Prediction Dashboard

A comprehensive React-based web application for visualizing and predicting rockburst intensity levels using machine learning models. This dashboard provides interactive visualizations, detailed model analysis, and real-time intensity prediction capabilities.

## 🌐 **Live Demo**

**Production URL:**https://rockburst.vercel.app/

## 📊 **Features**

### 🎯 **Core Functionality**
- **Model Performance Visualization** - Comprehensive analysis of model accuracy and performance metrics
- **Data Distribution Analysis** - Interactive charts showing feature distributions and correlations
- **Feature Analysis** - Detailed breakdown of feature importance and relationships
- **Cross-Validation Results** - Multi-fold validation performance with statistical analysis
- **Model Architecture Visualization** - Visual representation of the multi-branch neural network
- **Evaluation Metrics** - Detailed confusion matrix and per-class performance metrics
- **Interactive Intensity Predictor** - Real-time prediction tool with feature input

### 🔮 **Interactive Intensity Predictor**
- **Real-time Prediction** - Input feature values and get instant intensity level predictions
- **Confidence Scoring** - Get prediction confidence levels with visual indicators
- **Feature Contribution Analysis** - See how different features influence predictions
- **Risk Assessment** - Color-coded risk levels with actionable insights
- **User-Friendly Interface** - Intuitive sliders, forms, and visual feedback

### 📈 **Visualization Components**
- **Bar Charts** - Model performance across different metrics
- **Line Charts** - Cross-validation results and trends
- **Pie Charts** - Data distribution and class balance
- **Confusion Matrix** - Detailed prediction accuracy visualization
- **Progress Bars** - Confidence levels and feature scores
- **Interactive Tables** - Comprehensive metrics and data tables

## 🛠️ **Technology Stack**

- **Frontend:** React 18, Material-UI (MUI), Recharts
- **Styling:** Material-UI Theme, Responsive Design
- **Charts:** Recharts (BarChart, LineChart, PieChart)
- **Icons:** Material-UI Icons
- **Deployment:** Vercel
- **Version Control:** Git/GitHub

## 🚀 **Quick Start**

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/rockburst-dashboard.git
cd rockburst-dashboard

# Install dependencies
npm install

# Start development server
npm start
```

### Build for Production
```bash
# Build the application
npm run build

# Test production build locally
npx serve -s build -l 3000
```

## 📁 **Project Structure**

```
rockburst-visualization/
├── public/
│   ├── data/
│   │   └── model_results.json    # Model results data
│   └── index.html
├── src/
│   ├── components/
│   │   ├── EvaluationMetrics.js  # Detailed evaluation metrics
│   │   ├── IntensityPredictor.js # Interactive predictor
│   │   └── ModelArchitecture.js  # Model architecture visualization
│   ├── utils/
│   │   └── dataExport.js         # Data export utilities
│   └── App.js                    # Main application component
├── deploy.sh                     # Linux/Mac deployment script
├── deploy.bat                    # Windows deployment script
└── DEPLOYMENT.md                 # Comprehensive deployment guide
```

## 🎯 **Model Information**

### **Model Architecture**
- **Type:** Multi-branch Neural Network
- **Input Features:** 26 features across 3 categories
  - Seismic Features (11 features)
  - Mechanical Features (5 features)
  - Geological Features (10 features)
- **Output:** 4 intensity levels (0-3)
- **Performance:** 81.77% accuracy

### **Feature Categories**
1. **Seismic Features**
   - Signal energy statistics
   - Frequency analysis
   - Event counts and ratios
   - Energy density metrics

2. **Mechanical Features**
   - Stress measurements
   - Strain energy
   - Brittleness ratio
   - Material density

3. **Geological Features**
   - Temporal patterns (hour/month)
   - Rock type classification
   - Location data
   - Environmental factors

## 🌐 **Deployment**

### **Current Deployment**
- **Platform:** Vercel
- **Status:** ✅ Live
- **URL:** https://vercel.com/urooj-marvis-projects/rockburst-intensity-prediction
- **Auto-deploy:** Enabled (pushes to main branch)

### **Deployment Options**
1. **Vercel** (Current) - `vercel --prod`
2. **Netlify** - Drag & drop build folder
3. **GitHub Pages** - `npm run deploy`
4. **AWS S3** - Static website hosting
5. **Docker** - Containerized deployment

## 📊 **Usage Guide**

### **Dashboard Navigation**
1. **Model Performance** - Overall model metrics and performance
2. **Data Distribution** - Feature distributions and correlations
3. **Feature Analysis** - Feature importance and relationships
4. **Cross-Validation** - Multi-fold validation results
5. **Model Architecture** - Visual model structure
6. **Evaluation Metrics** - Detailed performance analysis
7. **Intensity Predictor** - Interactive prediction tool

### **Using the Intensity Predictor**
1. **Input Features** - Adjust sliders and enter values for seismic, mechanical, and geological features
2. **Calculate** - Click "Predict Intensity" to run the prediction algorithm
3. **View Results** - See predicted intensity level, confidence score, and risk assessment
4. **Reset** - Clear all inputs and start over

## 🔧 **Development**

### **Adding New Features**
1. Create new component in `src/components/`
2. Import and add to `App.js` tabs
3. Update data structure if needed
4. Test locally with `npm start`

### **Updating Model Data**
1. Run `python export_model_results.py` to generate new data
2. Replace `public/data/model_results.json`
3. Rebuild and redeploy

### **Customization**
- **Theme:** Modify Material-UI theme in `App.js`
- **Charts:** Update chart configurations in components
- **Data:** Replace mock data with real API calls
- **Styling:** Customize CSS and component styles

## 📈 **Performance**

- **Bundle Size:** ~253KB (gzipped)
- **Load Time:** < 2 seconds
- **Responsive:** Mobile-optimized
- **SEO:** Optimized meta tags and structure

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Material-UI** for the beautiful component library
- **Recharts** for the interactive charting capabilities
- **Vercel** for seamless deployment and hosting
- **React** for the powerful frontend framework

## 📞 **Support**

- **Issues:** Create an issue on GitHub
- **Documentation:** See `DEPLOYMENT.md` for detailed deployment instructions
- **Contact:** Reach out through GitHub discussions

---

**🎉 Happy Predicting!** 

Your rockburst intensity prediction dashboard is now live and ready for production use!
