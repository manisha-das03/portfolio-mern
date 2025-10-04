# Portfolio Deployment Script for Windows PowerShell
# This script helps deploy your portfolio to various platforms

Write-Host "🚀 Portfolio Deployment Helper" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan

function Write-Success {
    param($Message)
    Write-Host "✓ $Message" -ForegroundColor Green
}

function Write-Warning {
    param($Message)
    Write-Host "⚠ $Message" -ForegroundColor Yellow
}

function Write-Error {
    param($Message)
    Write-Host "✗ $Message" -ForegroundColor Red
}

function Write-Info {
    param($Message)
    Write-Host "ℹ $Message" -ForegroundColor Blue
}

# Check if required tools are installed
function Test-Requirements {
    Write-Info "Checking requirements..."
    
    try {
        $nodeVersion = node --version
        Write-Success "Node.js is installed: $nodeVersion"
    }
    catch {
        Write-Error "Node.js is not installed. Please install Node.js 18+"
        exit 1
    }
    
    try {
        $npmVersion = npm --version
        Write-Success "npm is installed: $npmVersion"
    }
    catch {
        Write-Error "npm is not installed. Please install npm"
        exit 1
    }
}

# Install dependencies
function Install-Dependencies {
    Write-Info "Installing dependencies..."
    
    # Install root dependencies
    npm install
    
    # Install server dependencies
    Set-Location server
    npm install
    Set-Location ..
    
    # Install client dependencies
    Set-Location client
    npm install
    Set-Location ..
    
    Write-Success "All dependencies installed"
}

# Build for production
function Build-Production {
    Write-Info "Building for production..."
    
    Set-Location client
    npm run build
    Set-Location ..
    
    Write-Success "Production build completed"
}

# Setup environment files
function Setup-Environment {
    Write-Info "Setting up environment files..."
    
    # Create server .env if it doesn't exist
    if (-not (Test-Path "server\.env")) {
        $serverEnv = @"
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_jwt_secret_key_here_change_in_production
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
"@
        $serverEnv | Out-File -FilePath "server\.env" -Encoding UTF8
        Write-Warning "Created server\.env - Please update with your credentials"
    }
    
    # Create client .env if it doesn't exist
    if (-not (Test-Path "client\.env")) {
        $clientEnv = @"
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GA_TRACKING_ID=G-XXXXXXXXXX
"@
        $clientEnv | Out-File -FilePath "client\.env" -Encoding UTF8
        Write-Warning "Created client\.env - Please update with your API URL"
    }
    
    Write-Success "Environment files ready"
}

# Deploy to Vercel
function Deploy-Vercel {
    Write-Info "Setting up Vercel deployment..."
    
    Write-Info "Frontend deployment steps:"
    Write-Host "1. Push your code to GitHub" -ForegroundColor White
    Write-Host "2. Go to https://vercel.com and connect your repo" -ForegroundColor White
    Write-Host "3. Set build settings:" -ForegroundColor White
    Write-Host "   - Framework: Create React App" -ForegroundColor White
    Write-Host "   - Root Directory: client" -ForegroundColor White
    Write-Host "   - Build Command: npm run build" -ForegroundColor White
    Write-Host "   - Output Directory: build" -ForegroundColor White
    Write-Host "4. Add environment variables in Vercel dashboard" -ForegroundColor White
    
    Write-Info "Backend deployment options:"
    Write-Host "• Railway: https://railway.app (Recommended)" -ForegroundColor White
    Write-Host "• Heroku: https://heroku.com" -ForegroundColor White
    Write-Host "• DigitalOcean App Platform" -ForegroundColor White
}

# Deploy to Netlify
function Deploy-Netlify {
    Write-Info "Setting up Netlify deployment..."
    
    Write-Info "Netlify deployment steps:"
    Write-Host "1. Push your code to GitHub" -ForegroundColor White
    Write-Host "2. Go to https://netlify.com and connect your repo" -ForegroundColor White
    Write-Host "3. Build settings (already configured in netlify.toml):" -ForegroundColor White
    Write-Host "   - Base directory: client" -ForegroundColor White
    Write-Host "   - Build command: npm run build" -ForegroundColor White
    Write-Host "   - Publish directory: client/build" -ForegroundColor White
    Write-Host "4. Add environment variables in Netlify dashboard" -ForegroundColor White
}

# Docker deployment
function Deploy-Docker {
    Write-Info "Setting up Docker deployment..."
    
    try {
        docker --version | Out-Null
        Write-Success "Docker is installed"
    }
    catch {
        Write-Error "Docker is not installed. Please install Docker Desktop"
        return
    }
    
    try {
        docker-compose --version | Out-Null
        Write-Success "Docker Compose is available"
    }
    catch {
        Write-Error "Docker Compose is not available"
        return
    }
    
    Write-Info "Starting Docker containers..."
    docker-compose up -d
    
    Write-Success "Docker deployment started"
    Write-Info "Access your portfolio at:"
    Write-Host "Frontend: http://localhost:3000" -ForegroundColor White
    Write-Host "Backend: http://localhost:5000" -ForegroundColor White
    Write-Host "MongoDB: localhost:27017" -ForegroundColor White
}

# Show deployment status
function Show-Status {
    Write-Info "Deployment Status:"
    Write-Host ""
    
    if (Test-Path "server\.env") {
        Write-Success "Server environment configured"
    } else {
        Write-Warning "Server environment not configured"
    }
    
    if (Test-Path "client\.env") {
        Write-Success "Client environment configured"
    } else {
        Write-Warning "Client environment not configured"
    }
    
    if (Test-Path "client\build") {
        Write-Success "Production build exists"
    } else {
        Write-Warning "No production build found"
    }
    
    if (Test-Path "docker-compose.yml") {
        Write-Success "Docker configuration ready"
    }
    
    if (Test-Path "netlify.toml") {
        Write-Success "Netlify configuration ready"
    }
    
    if (Test-Path "vercel.json") {
        Write-Success "Vercel configuration ready"
    }
}

# Show menu
function Show-Menu {
    Write-Host ""
    Write-Host "Choose deployment option:" -ForegroundColor Cyan
    Write-Host "1) Setup environment and install dependencies" -ForegroundColor White
    Write-Host "2) Build for production" -ForegroundColor White
    Write-Host "3) Deploy with Docker (local)" -ForegroundColor White
    Write-Host "4) Setup Vercel deployment" -ForegroundColor White
    Write-Host "5) Setup Netlify deployment" -ForegroundColor White
    Write-Host "6) Show deployment status" -ForegroundColor White
    Write-Host "7) Exit" -ForegroundColor White
    Write-Host ""
}

# Main script
function Main {
    Test-Requirements
    
    while ($true) {
        Show-Menu
        $choice = Read-Host "Enter your choice (1-7)"
        
        switch ($choice) {
            "1" {
                Setup-Environment
                Install-Dependencies
            }
            "2" {
                Build-Production
            }
            "3" {
                Deploy-Docker
            }
            "4" {
                Deploy-Vercel
            }
            "5" {
                Deploy-Netlify
            }
            "6" {
                Show-Status
            }
            "7" {
                Write-Info "Goodbye! 👋"
                exit 0
            }
            default {
                Write-Error "Invalid option. Please choose 1-7."
            }
        }
        
        Write-Host ""
        Read-Host "Press Enter to continue"
    }
}

# Run main function
Main