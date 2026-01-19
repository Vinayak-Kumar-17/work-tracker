#!/bin/bash

# Work Tracker - Local Development Script
# This script starts the Spring Boot application with frontend build

echo "🚀 Starting Work Tracker Application..."
echo ""

# Check if Maven is installed
if ! command -v mvn &> /dev/null
then
    echo "❌ Maven is not installed. Please install Maven first."
    echo "   Download from: https://maven.apache.org/download.cgi"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Maven found: $(mvn -version | head -n 1)"
echo "✅ Node.js found: $(node -v)"
echo ""

# Navigate to frontend and install dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

echo "🔨 Building React frontend..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Failed to build frontend"
    exit 1
fi

echo "✅ Frontend build complete!"
echo ""

# Navigate back to root
cd ..

# Start Spring Boot
echo "🚀 Starting Spring Boot application..."
echo "📍 Application will be available at: http://localhost:8080"
echo ""
echo "Press Ctrl+C to stop the application"
echo "---"

mvn spring-boot:run
