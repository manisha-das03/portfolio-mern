#!/bin/bash

# Portfolio Deployment Script
# This script helps deploy your portfolio to various platforms

echo "🚀 Portfolio Deployment Helper"
echo "=============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

# Check if required tools are installed
check_requirements() {
    print_info "Checking requirements..."
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm"
        exit 1
    fi
    
    print_status "Node.js and npm are installed"
}

# Install dependencies
install_dependencies() {
    print_info "Installing dependencies..."
    
    # Install root dependencies
    npm install
    
    # Install server dependencies
    cd server
    npm install
    cd ..
    
    # Install client dependencies
    cd client
    npm install
    cd ..
    
    print_status "All dependencies installed"
}

# Build for production
build_production() {
    print_info "Building for production..."
    
    cd client
    npm run build
    cd ..
    
    print_status "Production build completed"
}

# Setup environment files
setup_environment() {
    print_info "Setting up environment files..."
    
    # Create server .env if it doesn't exist
    if [ ! -f "server/.env" ]; then
        cp server/.env.example server/.env 2>/dev/null || cat > server/.env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_jwt_secret_key_here_change_in_production
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EOF
        print_warning "Created server/.env - Please update with your credentials"
    fi
    
    # Create client .env if it doesn't exist
    if [ ! -f "client/.env" ]; then
        cat > client/.env << EOF
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GA_TRACKING_ID=G-XXXXXXXXXX
EOF
        print_warning "Created client/.env - Please update with your API URL"
    fi
    
    print_status "Environment files ready"
}

# Deploy to Vercel
deploy_vercel() {
    print_info "Deploying to Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        print_warning "Vercel CLI not found. Installing..."
        npm install -g vercel
    fi
    
    print_info "Frontend deployment:"
    print_info "1. Push your code to GitHub"
    print_info "2. Connect your repo to Vercel"
    print_info "3. Set build settings:"
    print_info "   - Framework: Create React App"
    print_info "   - Root Directory: client"
    print_info "   - Build Command: npm run build"
    print_info "   - Output Directory: build"
    
    print_info "Backend deployment (use Railway or Heroku):"
    print_info "Railway: https://railway.app"
    print_info "Heroku: https://heroku.com"
}

# Deploy to Netlify
deploy_netlify() {
    print_info "Deploying to Netlify..."
    
    if ! command -v netlify &> /dev/null; then
        print_warning "Netlify CLI not found. Installing..."
        npm install -g netlify-cli
    fi
    
    build_production
    
    print_info "Netlify deployment steps:"
    print_info "1. Connect your GitHub repo to Netlify"
    print_info "2. Build settings are already configured in netlify.toml"
    print_info "3. Set environment variables in Netlify dashboard"
    
    cd client
    netlify deploy --prod --dir=build
    cd ..
}

# Docker deployment
deploy_docker() {
    print_info "Setting up Docker deployment..."
    
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker"
        return 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose"
        return 1
    fi
    
    print_info "Starting Docker containers..."
    docker-compose up -d
    
    print_status "Docker deployment started"
    print_info "Access your portfolio at:"
    print_info "Frontend: http://localhost:3000"
    print_info "Backend: http://localhost:5000"
    print_info "MongoDB: localhost:27017"
}

# Main menu
show_menu() {
    echo ""
    echo "Choose deployment option:"
    echo "1) Setup environment and install dependencies"
    echo "2) Build for production"
    echo "3) Deploy with Docker (local)"
    echo "4) Setup Vercel deployment"
    echo "5) Setup Netlify deployment"
    echo "6) Show deployment status"
    echo "7) Exit"
    echo ""
}

# Show deployment status
show_status() {
    print_info "Deployment Status:"
    echo ""
    
    if [ -f "server/.env" ]; then
        print_status "Server environment configured"
    else
        print_warning "Server environment not configured"
    fi
    
    if [ -f "client/.env" ]; then
        print_status "Client environment configured"
    else
        print_warning "Client environment not configured"
    fi
    
    if [ -d "client/build" ]; then
        print_status "Production build exists"
    else
        print_warning "No production build found"
    fi
    
    if [ -f "docker-compose.yml" ]; then
        print_status "Docker configuration ready"
    fi
    
    if [ -f "netlify.toml" ]; then
        print_status "Netlify configuration ready"
    fi
    
    if [ -f "vercel.json" ]; then
        print_status "Vercel configuration ready"
    fi
}

# Main script
main() {
    check_requirements
    
    while true; do
        show_menu
        read -p "Enter your choice (1-7): " choice
        
        case $choice in
            1)
                setup_environment
                install_dependencies
                ;;
            2)
                build_production
                ;;
            3)
                deploy_docker
                ;;
            4)
                deploy_vercel
                ;;
            5)
                deploy_netlify
                ;;
            6)
                show_status
                ;;
            7)
                print_info "Goodbye! 👋"
                exit 0
                ;;
            *)
                print_error "Invalid option. Please choose 1-7."
                ;;
        esac
        
        echo ""
        read -p "Press Enter to continue..."
    done
}

# Run main function
main