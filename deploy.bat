@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo 🚀 Starting Rockburst Dashboard Deployment...
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo [ERROR] package.json not found. Please run this script from the rockburst-visualization directory.
    pause
    exit /b 1
)

REM Check Node.js version
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [SUCCESS] Node.js version: %NODE_VERSION%

REM Install dependencies
echo [INFO] Installing dependencies...
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)
echo [SUCCESS] Dependencies installed successfully

REM Build the application
echo [INFO] Building the application...
call npm run build
if errorlevel 1 (
    echo [ERROR] Build failed
    pause
    exit /b 1
)
echo [SUCCESS] Build completed successfully

REM Check if build directory exists
if not exist "build" (
    echo [ERROR] Build directory not found. Build may have failed.
    pause
    exit /b 1
)

echo [SUCCESS] Build directory created successfully

REM Test the build locally
echo [INFO] Testing build locally...
echo [WARNING] Press Ctrl+C to stop the local server when done testing
echo [INFO] Open http://localhost:3000 in your browser
echo.
call npx serve -s build -l 3000

echo.
echo 🎉 Build completed successfully!
echo.
echo 📋 Next steps for deployment:
echo 1. Upload the 'build' folder to your hosting provider
echo 2. Or use one of these deployment options:
echo.
echo 🌐 Netlify (Recommended):
echo    - Drag and drop the 'build' folder to netlify.com
echo    - Or connect your GitHub repository for automatic deployment
echo.
echo ⚡ Vercel:
echo    - Install: npm install -g vercel
echo    - Deploy: vercel
echo.
echo 📚 GitHub Pages:
echo    - Install: npm install --save-dev gh-pages
echo    - Add homepage to package.json
echo    - Deploy: npm run deploy
echo.
echo 📖 See DEPLOYMENT.md for detailed instructions
echo.
pause
