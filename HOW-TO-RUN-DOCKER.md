# 🚀 How to Run Your Docker Container

This guide shows you exactly how to run your Todo App using Docker.

## Prerequisites

1. **Docker installed** - Download from [docker.com](https://www.docker.com/products/docker-desktop)
2. **Navigate to project directory**:
   ```cmd
   cd "c:\Users\ACER\OneDrive\Documents\Html code"
   ```

## 🎯 Quick Start (Recommended)

### Option 1: Interactive Script
```cmd
# Run the interactive guide
run-docker.bat
```
This script will guide you through all options with a simple menu.

### Option 2: One Command
```cmd
# Build and run in one command
docker-compose up --build
```
Then open: http://localhost:3000

## 📋 Step-by-Step Manual Process

### Step 1: Build Your Image
```cmd
# Choose one of these builds:

# Standard production build
docker build -t todo-app .

# Development build (better for debugging)  
docker build -f Dockerfile.dev -t todo-app-dev .

# Secure build (recommended for production)
docker build -f Dockerfile.secure --build-arg MONGODB_URI="mongodb+srv://wisakov432:wgueq3w4rlIzLQ3U@cluster0.pustd.mongodb.net/todo-app" -t todo-app-secure .
```

### Step 2: Run Your Container
```cmd
# Run production container
docker run -p 3000:3000 -e MONGODB_URI="mongodb+srv://wisakov432:wgueq3w4rlIzLQ3U@cluster0.pustd.mongodb.net/todo-app" todo-app

# Or run in background (detached)
docker run -d -p 3000:3000 --name my-todo-app -e MONGODB_URI="mongodb+srv://wisakov432:wgueq3w4rlIzLQ3U@cluster0.pustd.mongodb.net/todo-app" todo-app
```

### Step 3: Access Your App
Open your browser and go to: **http://localhost:3000**

## 🛠️ Useful Commands

### Container Management
```cmd
# View running containers
docker ps

# View all containers (including stopped)
docker ps -a

# Stop a container
docker stop my-todo-app

# Remove a container
docker rm my-todo-app

# View container logs
docker logs my-todo-app

# Access container shell
docker exec -it my-todo-app sh
```

### Image Management
```cmd
# List all images
docker images

# Remove an image
docker rmi todo-app

# Remove all unused images
docker image prune
```

### Docker Compose Commands
```cmd
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs

# Rebuild and start
docker-compose up --build
```

## 🔧 Troubleshooting

### Container Won't Start?
```cmd
# Check if port 3000 is available
netstat -an | findstr :3000

# If port is busy, use different port:
docker run -p 8080:3000 todo-app
# Then access at: http://localhost:8080
```

### Build Errors?
```cmd
# Validate your Dockerfiles
validate-docker.bat

# Clear Docker cache
docker builder prune

# Check if Docker is running
docker --version
```

### Can't Connect to MongoDB?
```cmd
# Check if environment variable is set correctly
docker run --rm todo-app printenv MONGODB_URI

# Or run container with explicit MongoDB URI
docker run -p 3000:3000 -e MONGODB_URI="your-mongodb-connection-string" todo-app
```

### Container Exits Immediately?
```cmd
# Check container logs for errors
docker logs [container-name]

# Run in interactive mode to see errors
docker run -it todo-app sh
```

## 🌐 Different Ways to Run

### 1. Development Mode (Hot Reload)
```cmd
docker run -p 3000:3000 -v "%cd%:/app" -v "/app/node_modules" todo-app-dev
```

### 2. Production Mode
```cmd
docker run -d -p 3000:3000 --restart unless-stopped --name todo-production todo-app
```

### 3. With Custom Environment
```cmd
# Create .env file and use:
docker run -p 3000:3000 --env-file .env todo-app
```

## ✅ Success Checklist

- [ ] Docker is installed and running
- [ ] You're in the project directory
- [ ] Docker image builds successfully
- [ ] Container starts without errors
- [ ] App accessible at http://localhost:3000
- [ ] You can create, edit, and delete todos
- [ ] Data persists in MongoDB

## 🎉 You're Done!

Your Todo App should now be running in Docker with:
- ✅ MongoDB database connection
- ✅ Full CRUD operations
- ✅ Persistent data storage
- ✅ Professional containerized deployment

Need help? Check the logs with `docker logs [container-name]` or use the interactive script `run-docker.bat`!