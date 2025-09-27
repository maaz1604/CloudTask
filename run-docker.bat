@echo off
echo 🚀 Docker Run Guide for Todo App
echo =================================
echo.

echo Choose your preferred method:
echo 1. Quick Start (Production)
echo 2. Development Mode
echo 3. Secure Build
echo 4. Docker Compose
echo 5. Show running containers
echo 6. Stop all containers
echo.

set /p choice="Enter your choice (1-6): "

if "%choice%"=="1" goto quick_start
if "%choice%"=="2" goto dev_mode  
if "%choice%"=="3" goto secure_build
if "%choice%"=="4" goto compose
if "%choice%"=="5" goto show_containers
if "%choice%"=="6" goto stop_containers

echo Invalid choice. Exiting.
goto end

:quick_start
echo.
echo 🏗️  Building production image...
docker build -t todo-app .
if errorlevel 1 goto build_error

echo.
echo 🚀 Running container on http://localhost:3000
docker run -d -p 3000:3000 --name todo-app ^
  -e MONGODB_URI="mongodb+srv://wisakov432:wgueq3w4rlIzLQ3U@cluster0.pustd.mongodb.net/todo-app?retryWrites=true&w=majority" ^
  todo-app

echo ✅ Container started! Access your app at: http://localhost:3000
echo.
echo Useful commands:
echo - View logs: docker logs todo-app
echo - Stop container: docker stop todo-app
echo - Remove container: docker rm todo-app
goto end

:dev_mode
echo.
echo 🔧 Building development image...
docker build -f Dockerfile.dev -t todo-app-dev .
if errorlevel 1 goto build_error

echo.
echo 🚀 Running development container...
docker run -d -p 3000:3000 --name todo-app-dev todo-app-dev

echo ✅ Development container started! Access at: http://localhost:3000
goto end

:secure_build
echo.
echo 🔒 Building secure image with build args...
docker build -f Dockerfile.secure --build-arg MONGODB_URI="mongodb+srv://wisakov432:wgueq3w4rlIzLQ3U@cluster0.pustd.mongodb.net/todo-app?retryWrites=true&w=majority" -t todo-app-secure .
if errorlevel 1 goto build_error

echo.
echo 🚀 Running secure container...
docker run -d -p 3000:3000 --name todo-app-secure ^
  -e MONGODB_URI="mongodb+srv://wisakov432:wgueq3w4rlIzLQ3U@cluster0.pustd.mongodb.net/todo-app?retryWrites=true&w=majority" ^
  todo-app-secure

echo ✅ Secure container started! Access at: http://localhost:3000
goto end

:compose
echo.
echo 🐳 Using Docker Compose...
echo Choose compose file:
echo 1. Production (docker-compose.yml)
echo 2. Development (docker-compose.dev.yml)
set /p compose_choice="Enter choice (1-2): "

if "%compose_choice%"=="1" (
    docker-compose up -d --build
    echo ✅ Production compose started!
) else if "%compose_choice%"=="2" (
    docker-compose -f docker-compose.dev.yml up -d --build
    echo ✅ Development compose started!
) else (
    echo Invalid choice.
    goto end
)

echo Access your app at: http://localhost:3000
echo Stop with: docker-compose down
goto end

:show_containers
echo.
echo 📊 Current Docker containers:
docker ps -a
echo.
echo 🌐 Container logs (last 10 lines):
for /f "tokens=1" %%i in ('docker ps -q') do (
    echo.
    echo === Logs for container %%i ===
    docker logs --tail 10 %%i
)
goto end

:stop_containers
echo.
echo 🛑 Stopping all Todo app containers...
docker stop todo-app todo-app-dev todo-app-secure 2>nul
docker rm todo-app todo-app-dev todo-app-secure 2>nul
docker-compose down 2>nul
docker-compose -f docker-compose.dev.yml down 2>nul
echo ✅ All containers stopped and removed!
goto end

:build_error
echo.
echo ❌ Build failed! 
echo Try these troubleshooting steps:
echo 1. Check if you're in the correct directory
echo 2. Run: validate-docker.bat
echo 3. Check Docker is running: docker --version
echo 4. Clear cache: docker builder prune
goto end

:end
echo.
pause