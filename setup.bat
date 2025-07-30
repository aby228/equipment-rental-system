@echo off
echo 🚀 Setting up Equipment Rental Application...

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed

REM Create environment files if they don't exist
if not exist "backend\.env" (
    echo 📝 Creating backend .env file...
    copy "backend\env.example" "backend\.env"
    echo ⚠️  Please update backend\.env with your database credentials
)

if not exist "frontend\.env.local" (
    echo 📝 Creating frontend .env.local file...
    copy "frontend\env.example" "frontend\.env.local"
    echo ⚠️  Please update frontend\.env.local with your database credentials
)

REM Install dependencies
echo 📦 Installing dependencies...

echo Installing root dependencies...
call npm install

echo Installing backend dependencies...
cd backend
call npm install
cd ..

echo Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo ✅ Dependencies installed successfully

echo.
echo 🎉 Setup completed successfully!
echo.
echo Next steps:
echo 1. Install PostgreSQL if not already installed
echo 2. Create a database named 'rentals_db'
echo 3. Update backend\.env with your database credentials
echo 4. Update frontend\.env.local with your database credentials
echo 5. Run 'npm run dev' to start the application
echo.
echo Default admin credentials:
echo Email: admin@rentals.com
echo Password: admin123
echo.
echo The application will be available at:
echo - Frontend: http://localhost:7777
echo - Backend API: http://localhost:3000
echo - API Documentation: http://localhost:3000/docs
echo.
pause 