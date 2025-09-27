# Docker Deployment Guide

This document provides instructions for containerizing## 🔍 Troubleshooting Build Failures

### ✅ Recent Fixes:
- **Legacy ENV Format Warnings**: All ENV statements updated to modern `KEY=value` format
- **Build-time Environment Variables**: MongoDB URI now available during build process
- **Security Improvements**: Non-root user execution and secure build options

### Common Build Issues:

1. **Docker Warnings (Now Fixed):**
   ```bash
   # All legacy ENV format warnings have been resolved
   # Dockerfiles now use modern ENV KEY=value format
   
   # Validate Dockerfiles
   validate-docker.bat  # Windows
   ./validate-docker.sh # Linux/Mac
   ```

2. **Webpack/Build Errors:**
   ```bash
   # Use development Dockerfile for better error visibility
   docker build -f Dockerfile.dev -t todo-app-debug .
   
   # Or run build locally first
   npm run build
   ```ng the Todo App with MongoDB integration using Docker.

## 🐳 Docker Setup

### Files Created:
- `Dockerfile` - Multi-stage Docker build configuration (production)
- `Dockerfile.dev` - Development/debugging Dockerfile
- `docker-compose.yml` - Production container orchestration
- `docker-compose.dev.yml` - Development container orchestration
- `.dockerignore` - Excludes unnecessary files from Docker context

## 🚀 Quick Start

### Option 1: Using Build Scripts (Recommended)

**Windows:**
```cmd
# Development build with debugging
build.bat dev

# Production build (default)
build.bat prod

# Secure build with build arguments
build.bat secure

# Test local build first
build.bat test
```

**Linux/Mac:**
```bash
# Make script executable
chmod +x build.sh

# Development build with debugging
./build.sh dev

# Production build (default)
./build.sh prod

# Secure build with build arguments
./build.sh secure

# Test local build first
./build.sh test
```

### Option 2: Development Mode (For Debugging)

```bash
# Build and run in development mode with better error visibility
docker-compose -f docker-compose.dev.yml up --build todo-app-dev
```

### Option 3: Production Mode

```bash
# Build and run the production application
docker-compose up --build todo-app
```

### Option 4: Manual Docker Commands

```bash
# Development build (for debugging)
docker build -f Dockerfile.dev -t todo-app-dev .
docker run -p 3000:3000 todo-app-dev

# Production build
docker build -t todo-app .
docker run -p 3000:3000 \
  -e MONGODB_URI="mongodb+srv://wisakov432:wgueq3w4rlIzLQ3U@cluster0.pustd.mongodb.net/todo-app?retryWrites=true&w=majority" \
  todo-app

# Secure build with build args
docker build -f Dockerfile.secure \
  --build-arg MONGODB_URI="mongodb+srv://wisakov432:wgueq3w4rlIzLQ3U@cluster0.pustd.mongodb.net/todo-app?retryWrites=true&w=majority" \
  -t todo-app-secure .
```

## � Troubleshooting Build Failures

### Common Build Issues:

1. **Webpack/Build Errors:**
   ```bash
   # Use development Dockerfile for better error visibility
   docker build -f Dockerfile.dev -t todo-app-debug .
   
   # Or run build locally first
   npm run build
   ```

2. **Missing Dependencies:**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Delete node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **TypeScript Errors:**
   ```bash
   # Check for TypeScript errors
   npm run type-check
   
   # Run linting
   npm run lint
   ```

4. **Docker Cache Issues:**
   ```bash
   # Clear Docker cache
   docker builder prune
   docker system prune -a
   
   # Build without cache
   docker build --no-cache -t todo-app .
   ```

### Debug Steps:

1. **Test Local Build:**
   ```bash
   npm install
   npm run build
   npm run start
   ```

2. **Use Development Dockerfile:**
   ```bash
   docker build -f Dockerfile.dev -t todo-app-debug .
   docker run -it todo-app-debug sh
   ```

3. **Check Build Logs:**
   ```bash
   docker build -t todo-app . 2>&1 | tee build.log
   ```

## 📋 Dockerfile Features

### Production Dockerfile:
- **Multi-stage build**: deps → builder → runner
- **Node.js 18 Alpine**: Minimal size (~150-200MB)
- **Robust dependency installation**: Handles missing lockfiles
- **Build error handling**: Better error visibility
- **Security**: Non-root user execution

### Development Dockerfile:
- **Single-stage build**: Easier debugging
- **Verbose output**: Better error visibility
- **Development environment**: Hot reload support
- **Error handling**: Fails fast with helpful messages

## 🔧 Environment Variables

The application requires the following environment variable:

```bash
MONGODB_URI=mongodb+srv://wisakov432:wgueq3w4rlIzLQ3U@cluster0.pustd.mongodb.net/todo-app?retryWrites=true&w=majority
```

### Setting Environment Variables:

**For Docker run:**
```bash
docker run -p 3000:3000 -e MONGODB_URI="your-mongodb-uri" todo-app
```

**For Docker Compose:**
Update the `environment` section in `docker-compose.yml`

**Using .env file with Docker Compose:**
```yaml
# In docker-compose.yml
services:
  todo-app:
    env_file:
      - .env.production
```

## 📊 Image Information

### Expected Image Size:
- **Production image**: ~150-200MB (Alpine-based)
- **Development**: Larger due to dev dependencies

### Exposed Ports:
- **3000**: Next.js application port

## 🔄 Development vs Production

### Development:
```bash
# Run in development mode with hot reload
docker-compose -f docker-compose.dev.yml up
```

### Production:
```bash
# Run optimized production build
docker-compose up --build
```

## 🚀 Deployment Options

### 1. Cloud Platforms:
- **Vercel**: `vercel --docker`
- **Heroku**: Use Heroku Container Registry
- **Railway**: Connect GitHub repository
- **AWS ECS/EKS**: Use the Dockerfile
- **Google Cloud Run**: Deploy containerized app

### 2. VPS/Server Deployment:
```bash
# Pull and run on server
docker pull your-registry/todo-app:latest
docker run -d -p 3000:3000 --name todo-app \
  -e MONGODB_URI="your-mongodb-uri" \
  your-registry/todo-app:latest
```

## 🔍 Troubleshooting

### Common Issues:

1. **Build failures:**
   ```bash
   # Clear Docker cache
   docker builder prune
   docker system prune -a
   ```

2. **MongoDB connection issues:**
   - Verify MONGODB_URI environment variable
   - Check network connectivity from container
   - Ensure MongoDB Atlas allows connections from your IP

3. **Port conflicts:**
   ```bash
   # Use different port
   docker run -p 8080:3000 todo-app
   ```

### Debug Container:
```bash
# Access container shell
docker exec -it <container-id> sh

# Check logs
docker logs <container-id>
```

## 📈 Performance Tips

1. **Multi-stage builds** reduce final image size
2. **Layer caching** speeds up subsequent builds
3. **Standalone output** minimizes runtime dependencies
4. **Alpine Linux** provides security and size benefits

## 🔒 Security Considerations

- Uses non-root user for container execution
- Excludes sensitive files via `.dockerignore`
- Minimal base image reduces attack surface
- Environment variables for sensitive data

## 📚 Commands Reference

```bash
# Build image
docker build -t todo-app .

# Run container
docker run -p 3000:3000 todo-app

# Run with environment file
docker run -p 3000:3000 --env-file .env todo-app

# Run in background
docker run -d -p 3000:3000 --name todo-app todo-app

# Stop container
docker stop todo-app

# Remove container
docker rm todo-app

# View logs
docker logs todo-app

# Execute shell in container
docker exec -it todo-app sh
```

## 🎉 Success!

Your Todo App is now fully containerized and ready for deployment! The Docker setup provides:

- ✅ Optimized production builds
- ✅ Multi-stage builds for efficiency
- ✅ Security best practices
- ✅ Easy deployment workflow
- ✅ Environment variable configuration
- ✅ Database connectivity