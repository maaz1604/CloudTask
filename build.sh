#!/bin/bash

# Docker build script for Todo App
# Handles different build scenarios and provides helpful error messages

set -e

MONGODB_URI="mongodb+srv://wisakov432:wgueq3w4rlIzLQ3U@cluster0.pustd.mongodb.net/todo-app?retryWrites=true&w=majority"

echo "🐳 Docker Build Script for Todo App"
echo "=================================="

# Function to display usage
usage() {
    echo "Usage: $0 [dev|prod|secure|test]"
    echo ""
    echo "Options:"
    echo "  dev     - Build development image with debugging"
    echo "  prod    - Build production image (default)"
    echo "  secure  - Build using secure Dockerfile with build args"
    echo "  test    - Test local build first, then Docker"
    echo ""
    exit 1
}

# Function to test local build
test_local_build() {
    echo "🧪 Testing local build first..."
    
    if npm run build; then
        echo "✅ Local build successful!"
        return 0
    else
        echo "❌ Local build failed. Please fix local issues first."
        echo "Try: npm install && npm run build"
        return 1
    fi
}

# Function to build development image
build_dev() {
    echo "🔨 Building development image..."
    docker build -f Dockerfile.dev -t todo-app-dev . || {
        echo "❌ Development build failed!"
        echo "Check the build output above for specific errors."
        exit 1
    }
    
    echo "✅ Development build successful!"
    echo "Run with: docker run -p 3000:3000 todo-app-dev"
}

# Function to build production image
build_prod() {
    echo "🔨 Building production image..."
    docker build -t todo-app . || {
        echo "❌ Production build failed!"
        echo "Try running with 'dev' option for better error visibility."
        exit 1
    }
    
    echo "✅ Production build successful!"
    echo "Run with: docker run -p 3000:3000 -e MONGODB_URI=\"$MONGODB_URI\" todo-app"
}

# Function to build secure image
build_secure() {
    echo "🔒 Building secure image with build args..."
    docker build -f Dockerfile.secure --build-arg MONGODB_URI="$MONGODB_URI" -t todo-app-secure . || {
        echo "❌ Secure build failed!"
        echo "Check that MONGODB_URI build argument is properly passed."
        exit 1
    }
    
    echo "✅ Secure build successful!"
    echo "Run with: docker run -p 3000:3000 -e MONGODB_URI=\"$MONGODB_URI\" todo-app-secure"
}

# Main script logic
case "${1:-prod}" in
    "dev")
        build_dev
        ;;
    "prod")
        build_prod
        ;;
    "secure")
        build_secure
        ;;
    "test")
        if test_local_build; then
            build_prod
        fi
        ;;
    "--help"|"-h")
        usage
        ;;
    *)
        echo "❌ Unknown option: $1"
        usage
        ;;
esac

echo ""
echo "🎉 Build completed successfully!"
echo ""
echo "Next steps:"
echo "1. Test the image: docker run -p 3000:3000 [IMAGE_NAME]"
echo "2. Or use docker-compose: docker-compose up"
echo "3. Access the app: http://localhost:3000"