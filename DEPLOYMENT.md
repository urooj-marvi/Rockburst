# 🚀 Rockburst Visualization Dashboard - Deployment Guide

## 📋 Quick Start

### 1. Build the Application
```bash
# Navigate to the project directory
cd rockburst-visualization

# Install dependencies (if not already done)
npm install

# Build for production
npm run build
```

### 2. Test Locally
```bash
# Serve the built files locally
npx serve -s build -l 3000

# Open http://localhost:3000 in your browser
```

## 🌐 Deployment Options

### Option 1: Netlify (Recommended - Free & Easy)

#### Automatic Deployment (GitHub Integration)
1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/rockburst-dashboard.git
   git push -u origin main
   ```

2. **Deploy on Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select your repository
   - Set build command: `npm run build`
   - Set publish directory: `build`
   - Click "Deploy site"

#### Manual Deployment
1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Drag and drop** the `build` folder to [netlify.com](https://netlify.com)

### Option 2: Vercel (Alternative - Free & Fast)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Follow the prompts** and your site will be live!

### Option 3: GitHub Pages

1. **Add homepage to package.json**:
   ```json
   {
     "homepage": "https://yourusername.github.io/rockburst-dashboard"
   }
   ```

2. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add scripts to package.json**:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

### Option 4: AWS S3 + CloudFront

1. **Create S3 bucket**:
   ```bash
   aws s3 mb s3://your-rockburst-dashboard
   ```

2. **Enable static website hosting**:
   ```bash
   aws s3 website s3://your-rockburst-dashboard --index-document index.html --error-document index.html
   ```

3. **Upload files**:
   ```bash
   aws s3 sync build/ s3://your-rockburst-dashboard
   ```

4. **Set bucket policy** (for public access):
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::your-rockburst-dashboard/*"
       }
     ]
   }
   ```

### Option 5: Docker Deployment

1. **Create Dockerfile**:
   ```dockerfile
   FROM node:16-alpine as build
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build

   FROM nginx:alpine
   COPY --from=build /app/build /usr/share/nginx/html
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Build and run**:
   ```bash
   docker build -t rockburst-dashboard .
   docker run -p 80:80 rockburst-dashboard
   ```

## 🔧 Environment Configuration

### Production Environment Variables
Create a `.env.production` file:
```env
REACT_APP_API_URL=https://your-api-endpoint.com
REACT_APP_ENVIRONMENT=production
```

### Custom Domain Setup
1. **Purchase domain** (e.g., from Namecheap, GoDaddy)
2. **Configure DNS**:
   - For Netlify: Add CNAME record pointing to your Netlify URL
   - For Vercel: Add A record pointing to Vercel's IP
3. **Enable HTTPS** (automatic on most platforms)

## 📊 Data Integration

### Using Real Model Data
1. **Export your model results**:
   ```bash
   python export_model_results.py
   ```

2. **Upload to your deployment**:
   - Copy `model_results.json` to `public/data/` folder
   - Or host on a CDN and update the fetch URL

### API Integration
Update the data fetching in your components:
```javascript
// Replace mock data with API calls
const fetchModelResults = async () => {
  const response = await fetch('/api/model-results');
  const data = await response.json();
  return data;
};
```

## 🚀 Performance Optimization

### Build Optimization
```bash
# Analyze bundle size
npm run build -- --analyze

# Optimize images
npm install --save-dev imagemin-webpack-plugin
```

### Caching Strategy
Add to `public/index.html`:
```html
<meta http-equiv="Cache-Control" content="max-age=31536000">
```

### CDN Configuration
- Enable gzip compression
- Set appropriate cache headers
- Use CDN for static assets

## 🔒 Security Considerations

### Content Security Policy
Add to `public/index.html`:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
```

### Environment Variables
- Never commit sensitive data
- Use environment variables for API keys
- Validate all user inputs

## 📱 Mobile Optimization

### Responsive Design
- Test on various screen sizes
- Optimize touch targets
- Ensure readable font sizes

### PWA Features
Add to `public/manifest.json`:
```json
{
  "name": "Rockburst Dashboard",
  "short_name": "Rockburst",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#1976d2",
  "background_color": "#ffffff"
}
```

## 🔄 Continuous Deployment

### GitHub Actions (Netlify/Vercel)
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🐛 Troubleshooting

### Common Issues

1. **Build Fails**:
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Routing Issues**:
   - For SPA routing, configure server to serve `index.html` for all routes
   - Add `basename` to React Router if deploying to subdirectory

3. **API CORS Issues**:
   - Configure CORS on your backend
   - Use proxy in development
   - Set up API gateway in production

4. **Performance Issues**:
   - Enable code splitting
   - Optimize images
   - Use lazy loading for components

### Debug Commands
```bash
# Check bundle size
npm run build -- --analyze

# Test production build locally
npx serve -s build

# Check for unused dependencies
npm install -g depcheck
depcheck
```

## 📞 Support

### Getting Help
- Check the browser console for errors
- Verify all dependencies are installed
- Ensure Node.js version is compatible (16+)

### Useful Tools
- **Lighthouse**: Audit performance, accessibility, SEO
- **WebPageTest**: Detailed performance analysis
- **GTmetrix**: Page speed optimization

## 🎯 Next Steps

After deployment:
1. **Test all features** on the live site
2. **Set up monitoring** (Google Analytics, error tracking)
3. **Configure backups** for your data
4. **Set up alerts** for downtime
5. **Document the deployment** for your team

---

**Happy Deploying! 🚀**

Your rockburst intensity prediction dashboard is now ready for production use!
