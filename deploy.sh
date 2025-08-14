#!/bin/bash

# 🚀 Rockburst Dashboard Deployment Script
# This script automates the build and deployment process

set -e  # Exit on any error

echo "🚀 Starting Rockburst Dashboard Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the rockburst-visualization directory."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    print_error "Node.js version 16 or higher is required. Current version: $(node --version)"
    exit 1
fi

print_success "Node.js version: $(node --version)"

# Install dependencies
print_status "Installing dependencies..."
if npm install; then
    print_success "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Build the application
print_status "Building the application..."
if npm run build; then
    print_success "Build completed successfully"
else
    print_error "Build failed"
    exit 1
fi

# Check if build directory exists
if [ ! -d "build" ]; then
    print_error "Build directory not found. Build may have failed."
    exit 1
fi

print_success "Build directory created: $(du -sh build | cut -f1)"

# Test the build locally
print_status "Testing build locally..."
if command -v npx &> /dev/null; then
    print_status "Starting local server to test build..."
    print_warning "Press Ctrl+C to stop the local server when done testing"
    print_status "Open http://localhost:3000 in your browser"
    npx serve -s build -l 3000
else
    print_warning "npx not found. Install it with: npm install -g npx"
    print_status "You can test the build manually by serving the build directory"
fi

echo ""
print_success "🎉 Build completed successfully!"
echo ""
echo "📋 Next steps for deployment:"
echo "1. Upload the 'build' folder to your hosting provider"
echo "2. Or use one of these deployment options:"
echo ""
echo "🌐 Netlify (Recommended):"
echo "   - Drag and drop the 'build' folder to netlify.com"
echo "   - Or connect your GitHub repository for automatic deployment"
echo ""
echo "⚡ Vercel:"
echo "   - Install: npm install -g vercel"
echo "   - Deploy: vercel"
echo ""
echo "📚 GitHub Pages:"
echo "   - Install: npm install --save-dev gh-pages"
echo "   - Add homepage to package.json"
echo "   - Deploy: npm run deploy"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
echo ""
