#!/bin/bash

# Docker validation script to check for warnings and best practices

echo "🔍 Docker Validation Script"
echo "=========================="

echo ""
echo "📋 Checking Dockerfile format and warnings..."

# Function to check a Dockerfile
check_dockerfile() {
    local dockerfile=$1
    echo ""
    echo "Checking $dockerfile..."
    
    if [ -f "$dockerfile" ]; then
        # Use docker buildx to check for warnings without actually building
        echo "Running lint check..."
        docker buildx build --dry-run -f "$dockerfile" . 2>&1 | grep -i warning || echo "✅ No warnings found"
        
        echo ""
        echo "🔍 Manual checks for $dockerfile:"
        
        # Check for legacy ENV format
        if grep -n "^ENV [A-Z_]* [^=]" "$dockerfile" 2>/dev/null; then
            echo "⚠️  Legacy ENV format found (should use ENV KEY=value)"
        else
            echo "✅ ENV format is correct"
        fi
        
        # Check for EXPOSE format
        if grep -n "^EXPOSE [0-9]*$" "$dockerfile" 2>/dev/null; then
            echo "✅ EXPOSE format is correct"
        fi
        
        # Check for proper USER usage
        if grep -n "^USER " "$dockerfile" 2>/dev/null; then
            echo "✅ USER directive found (good security practice)"
        else
            echo "⚠️  No USER directive found (consider adding for security)"
        fi
        
        echo ""
    else
        echo "❌ $dockerfile not found"
    fi
}

# Check all Dockerfiles
check_dockerfile "Dockerfile"
check_dockerfile "Dockerfile.dev" 
check_dockerfile "Dockerfile.secure"

echo ""
echo "🎯 Docker Best Practices Summary:"
echo "================================="
echo "✅ Use ENV KEY=value format (not ENV KEY value)"
echo "✅ Use non-root USER for security"
echo "✅ Use .dockerignore to reduce build context"
echo "✅ Use multi-stage builds for smaller images"
echo "✅ Use specific base image versions"
echo "✅ Clean up package cache in single RUN layer"

echo ""
echo "🏗️  To build without warnings:"
echo "docker build -t todo-app ."
echo ""
echo "🔧 To see detailed build info:"
echo "docker build --progress=plain -t todo-app ."