#!/bin/bash

echo "🚀 Setting up Equipment Rental Application..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    print_error "PostgreSQL is not installed. Please install PostgreSQL first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

print_status "Prerequisites check passed"

# Create environment files if they don't exist
if [ ! -f "backend/.env" ]; then
    print_status "Creating backend .env file..."
    cp backend/env.example backend/.env
    print_warning "Please update backend/.env with your database credentials and JWT secret"
fi

if [ ! -f "frontend/.env.local" ]; then
    print_status "Creating frontend .env.local file..."
    cp frontend/env.example frontend/.env.local
    print_warning "Please update frontend/.env.local with your database credentials and JWT secret"
fi

# Install dependencies
print_status "Installing dependencies..."

echo "Installing root dependencies..."
npm install

echo "Installing backend dependencies..."
cd backend
npm install
cd ..

echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

print_status "Dependencies installed successfully"

# Database setup
print_status "Setting up database..."

# Read database credentials from backend .env
if [ -f "backend/.env" ]; then
    source backend/.env
    DB_NAME=${DB_NAME:-rentals_db}
    DB_USER=${DB_USER:-postgres}
    DB_HOST=${DB_HOST:-localhost}
    DB_PORT=${DB_PORT:-5432}
else
    print_warning "backend/.env not found, using defaults"
    DB_NAME=rentals_db
    DB_USER=postgres
    DB_HOST=localhost
    DB_PORT=5432
fi

# Test database connection
print_status "Testing database connection..."
if ! psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d postgres -c "SELECT 1;" > /dev/null 2>&1; then
    print_error "Cannot connect to PostgreSQL. Please check your database credentials and ensure PostgreSQL is running."
    exit 1
fi

# Create database if it doesn't exist
print_status "Creating database '$DB_NAME' if it doesn't exist..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d postgres -c "CREATE DATABASE $DB_NAME;" 2>/dev/null || print_warning "Database might already exist"

# Run database initialization
print_status "Running database initialization..."
if ! psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f backend/database.sql; then
    print_error "Database initialization failed. Please check the database.sql file and your database permissions."
    exit 1
fi

print_status "Database setup completed"

# Generate Prisma client
print_status "Setting up Prisma..."
cd frontend
if ! npx prisma generate; then
    print_error "Prisma client generation failed"
    exit 1
fi

if ! npx prisma db push; then
    print_error "Prisma database push failed"
    exit 1
fi
cd ..

print_status "Prisma setup completed"

# Security check
print_status "Performing security checks..."

# Check if JWT secret is still default
if grep -q "your_super_secure_jwt_secret_here" backend/.env; then
    print_warning "JWT_SECRET is still set to default value. Please change it in backend/.env"
fi

if grep -q "your_secure_password_here" backend/.env; then
    print_warning "Database password is still set to default value. Please change it in backend/.env"
fi

print_status "Setup completed successfully!"

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your database credentials and JWT secret"
echo "2. Update frontend/.env.local with your database credentials and JWT secret"
echo "3. Run 'npm run dev' to start the application"
echo ""
echo "Default admin credentials:"
echo "Email: admin@rentals.com"
echo "Password: Admin@123!"
echo ""
echo "The application will be available at:"
echo "- Frontend: http://localhost:7777"
echo "- Backend API: http://localhost:3000"
echo "- API Documentation: http://localhost:3000/docs"
echo "- Health Check: http://localhost:3000/health"
echo ""
echo "Security notes:"
echo "- Change the default admin password immediately"
echo "- Use strong JWT secrets (minimum 32 characters)"
echo "- Configure proper CORS settings for production"
echo "- Set up proper logging and monitoring" 