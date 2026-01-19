# Work Tracker - Local Development Script (PowerShell)
# This script starts the Spring Boot application with frontend build

Write-Host "🚀 Starting Work Tracker Application..." -ForegroundColor Cyan
Write-Host ""

# Check if Maven is installed
$mavenInstalled = Get-Command mvn -ErrorAction SilentlyContinue
if (-not $mavenInstalled) {
    Write-Host "❌ Maven is not installed. Please install Maven first." -ForegroundColor Red
    Write-Host "   Download from: https://maven.apache.org/download.cgi" -ForegroundColor Yellow
    exit 1
}

# Check if Node.js is installed
$nodeInstalled = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodeInstalled) {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    Write-Host "   Download from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Maven found" -ForegroundColor Green
Write-Host "✅ Node.js found: $(node -v)" -ForegroundColor Green
Write-Host ""

# Navigate to frontend and install dependencies
Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Cyan
Set-Location frontend

npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install frontend dependencies" -ForegroundColor Red
    exit 1
}

Write-Host "🔨 Building React frontend..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to build frontend" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Frontend build complete!" -ForegroundColor Green
Write-Host ""

# Navigate back to root
Set-Location ..

# Start Spring Boot
Write-Host "🚀 Starting Spring Boot application..." -ForegroundColor Cyan
Write-Host "📍 Application will be available at: http://localhost:8080" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Ctrl+C to stop the application" -ForegroundColor Gray
Write-Host "---"

mvn spring-boot:run
