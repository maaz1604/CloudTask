@echo off
setlocal

REM Docker build script for Todo App (Windows)
set MONGODB_URI=mongodb+srv://wisakov432:wgueq3w4rlIzLQ3U@cluster0.pustd.mongodb.net/todo-app?retryWrites=true^&w=majority

echo 🐳 Docker Build Script for Todo App
echo ==================================

if "%1"=="dev" goto build_dev
if "%1"=="prod" goto build_prod
if "%1"=="secure" goto build_secure
if "%1"=="test" goto test_build
if "%1"=="--help" goto usage
if "%1"=="-h" goto usage
if "%1"=="" goto build_prod

echo ❌ Unknown option: %1
goto usage

:build_dev
echo 🔨 Building development image...
docker build -f Dockerfile.dev -t todo-app-dev . || (
    echo ❌ Development build failed!
    echo Check the build output above for specific errors.
    exit /b 1
)
echo ✅ Development build successful!
echo Run with: docker run -p 3000:3000 todo-app-dev
goto end

:build_prod
echo 🔨 Building production image...
echo (All legacy ENV format warnings have been fixed)
docker build -t todo-app . || (
    echo ❌ Production build failed!
    echo Try running with 'dev' option for better error visibility.
    exit /b 1
)
echo ✅ Production build successful!
echo Run with: docker run -p 3000:3000 -e MONGODB_URI="%MONGODB_URI%" todo-app
goto end

:build_secure
echo 🔒 Building secure image with build args...
docker build -f Dockerfile.secure --build-arg MONGODB_URI="%MONGODB_URI%" -t todo-app-secure . || (
    echo ❌ Secure build failed!
    echo Check that MONGODB_URI build argument is properly passed.
    exit /b 1
)
echo ✅ Secure build successful!
echo Run with: docker run -p 3000:3000 -e MONGODB_URI="%MONGODB_URI%" todo-app-secure
goto end

:test_build
echo 🧪 Testing local build first...
npm run build
if errorlevel 1 (
    echo ❌ Local build failed. Please fix local issues first.
    echo Try: npm install ^&^& npm run build
    exit /b 1
)
echo ✅ Local build successful!
goto build_prod

:usage
echo Usage: %0 [dev^|prod^|secure^|test]
echo.
echo Options:
echo   dev     - Build development image with debugging
echo   prod    - Build production image (default)
echo   secure  - Build using secure Dockerfile with build args
echo   test    - Test local build first, then Docker
echo.
exit /b 1

:end
echo.
echo 🎉 Build completed successfully!
echo.
echo Next steps:
echo 1. Test the image: docker run -p 3000:3000 [IMAGE_NAME]
echo 2. Or use docker-compose: docker-compose up
echo 3. Access the app: http://localhost:3000