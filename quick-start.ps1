# Quick Start Script for Portfolio Setup
Write-Host "🚀 Portfolio Quick Start" -ForegroundColor Cyan
Write-Host "========================" -ForegroundColor Cyan

function Write-Success {
    param($Message)
    Write-Host "✓ $Message" -ForegroundColor Green
}

function Write-Info {
    param($Message)
    Write-Host "ℹ $Message" -ForegroundColor Blue
}

function Write-Warning {
    param($Message)
    Write-Host "⚠ $Message" -ForegroundColor Yellow
}

# Step 1: Install all dependencies
Write-Info "Step 1: Installing dependencies..."
try {
    npm install
    Set-Location server
    npm install
    Set-Location ..
    Set-Location client
    npm install
    Set-Location ..
    Write-Success "All dependencies installed"
} catch {
    Write-Error "Failed to install dependencies"
    exit 1
}

# Step 2: Setup environment files
Write-Info "Step 2: Setting up environment files..."

# Server environment
if (-not (Test-Path "server\.env")) {
    Copy-Item "server\.env.example" "server\.env"
    Write-Warning "Created server\.env - Please update with your credentials"
} else {
    Write-Success "Server environment file exists"
}

# Client environment
if (-not (Test-Path "client\.env")) {
    Copy-Item "client\.env.example" "client\.env"
    Write-Warning "Created client\.env - Please update with your API URL"
} else {
    Write-Success "Client environment file exists"
}

# Step 3: Test the setup
Write-Info "Step 3: Testing the setup..."
Write-Host ""
Write-Host "To start development:" -ForegroundColor Yellow
Write-Host "npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "To deploy:" -ForegroundColor Yellow
Write-Host ".\deploy.ps1" -ForegroundColor White
Write-Host ""
Write-Host "Access points:" -ForegroundColor Yellow
Write-Host "• Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "• Backend: http://localhost:5000" -ForegroundColor White
Write-Host "• Admin: http://localhost:3000/admin" -ForegroundColor White
Write-Host ""
Write-Host "Default admin login:" -ForegroundColor Yellow
Write-Host "• Email: admin@portfolio.com" -ForegroundColor White
Write-Host "• Password: admin123" -ForegroundColor White
Write-Host ""

Write-Success "Quick start setup complete!"
Write-Info "Next steps:"
Write-Host "1. Update environment variables in server\.env and client\.env" -ForegroundColor White
Write-Host "2. Run 'npm run dev' to start development" -ForegroundColor White
Write-Host "3. Access admin panel to add your content" -ForegroundColor White
Write-Host "4. Use .\deploy.ps1 when ready to deploy" -ForegroundColor White