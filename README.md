# 🏗️ EDUSTECH Enterprise (Equipment Rental Management Platform)

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14.2.15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue?style=for-the-badge&logo=typescript)
![Express.js](https://img.shields.io/badge/Express.js-4.18.2-green?style=for-the-badge&logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12+-blue?style=for-the-badge&logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-6.12.0-black?style=for-the-badge&logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.13-38B2AC?style=for-the-badge&logo=tailwind-css)

**A comprehensive full-stack equipment rental management system with modern architecture, robust security, and intuitive user experience.**

[🚀 Live Demo](#) • [📖 Documentation](#) • [🐛 Report Bug](#) • [💡 Request Feature](#)

</div>

## ✨ Features

### 🔐 **Authentication & Security**
- **JWT-based authentication** with configurable expiration
- **Role-based access control** (User/Admin) with granular permissions
- **Password hashing** using bcrypt with salt rounds 12
- **Rate limiting** on authentication endpoints (5 attempts per 15 minutes)
- **Input validation** and sanitization for all user inputs
- **Helmet.js** security headers and CORS protection

### 🏪 **Equipment Management**
- **CRUD operations** for equipment inventory
- **Real-time availability** tracking
- **Image upload** and management
- **Category-based organization**
- **Pricing management** with daily rates

### 📋 **Rental System**
- **Intuitive rental booking** with date selection
- **Equipment availability** checking
- **Rental history** tracking
- **Return date management**
- **Quantity management** for bulk rentals

### 🛒 **Order Processing**
- **Shopping cart** functionality
- **Order confirmation** system
- **Payment integration** ready
- **Order history** and tracking
- **Email notifications** for order updates

### 👥 **User Management**
- **User registration** and profile management
- **Address management** system
- **Order history** per user
- **Admin dashboard** for user management

### 🎨 **Modern UI/UX**
- **Responsive design** for all devices
- **Dark/Light theme** support
- **Loading states** and skeleton screens
- **Toast notifications** for user feedback
- **Accessible** components with ARIA labels

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Next.js)     │◄──►│   (Express.js)  │◄──►│   (PostgreSQL)  │
│                 │    │                 │    │                 │
│ • TypeScript    │    │ • RESTful API   │    │ • Prisma ORM    │
│ • Tailwind CSS  │    │ • JWT Auth      │    │ • Migrations    │
│ • React Hooks   │    │ • Rate Limiting │    │ • Constraints   │
│ • Server-Side   │    │ • Validation    │    │ • Indexes       │
│   Rendering     │    │ • Security      │    │ • Relations     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

## 🚀 Quick Start

### 📋 Prerequisites

- **Node.js** 18.0.0 or higher
- **PostgreSQL** 12.0 or higher
- **npm** 8.0.0 or higher (or **bun** for faster installs)
- **Git** for version control

### 🗄️ Database Setup

1. **Install PostgreSQL** (if not already installed):
   ```bash
   # Ubuntu/Debian
   sudo apt update && sudo apt install postgresql postgresql-contrib
   
   # macOS (using Homebrew)
   brew install postgresql
   
   # Windows
   # Download from https://www.postgresql.org/download/windows/
   ```

2. **Create Database**:
```sql
CREATE DATABASE rentals_db;
   CREATE USER rental_user WITH PASSWORD 'your_secure_password';
   GRANT ALL PRIVILEGES ON DATABASE rentals_db TO rental_user;
```

3. **Initialize Database Schema**:
   ```bash
   # Using the provided SQL script
psql -d rentals_db -f backend/database.sql
   
   # Or using Prisma (recommended)
   cd frontend
   npx prisma generate
   npx prisma db push
```

### ⚙️ Environment Configuration

#### Backend Environment (`.env`)
Copy `backend/env.example` to `backend/.env` and configure:

```bash
# Database Configuration
DB_USER=rental_user
DB_HOST=localhost
DB_NAME=rentals_db
DB_PASSWORD=your_secure_password_here
DB_PORT=5432

# JWT Configuration (Generate a strong secret!)
JWT_SECRET=your_super_secure_jwt_secret_here_minimum_32_characters_long

# Email Configuration (Optional - for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here

# Server Configuration
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:7777
```

#### Frontend Environment (`.env.local`)
Copy `frontend/env.example` to `frontend/.env.local` and configure:

```bash
# Database Configuration
DATABASE_URL="postgresql://rental_user:your_secure_password_here@localhost:5432/rentals_db"

# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:7777"

# JWT Configuration (Must match backend JWT_SECRET)
JWT_SECRET_KEY=your_super_secure_jwt_secret_here_minimum_32_characters_long

# Optional: Google Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

### 📦 Installation & Setup

1. **Clone the Repository**:
```bash
   git clone https://github.com/yourusername/equipment-rental-platform.git
   cd equipment-rental-platform
   ```

2. **Install Dependencies**:
   ```bash
   # Install all dependencies (root, backend, frontend)
   npm run install:all
   
   # Or install individually:
npm install
   cd backend && npm install
   cd ../frontend && npm install
```

3. **Database Setup**:
   ```bash
   # Generate Prisma client and push schema
   npm run setup:db

   # Or manually:
cd frontend
npx prisma generate
npx prisma db push
```

### 🚀 Running the Application

#### Development Mode (Recommended)
```bash
# Start both backend and frontend concurrently
npm run dev
```

This will start:
- **Backend API** on http://localhost:3000
- **Frontend App** on http://localhost:7777
- **API Documentation** on http://localhost:3000/docs

#### Production Mode
```bash
# Build frontend
npm run build

# Start production servers
npm start
```

#### Individual Services
```bash
# Backend only
npm run dev:backend

# Frontend only  
npm run dev:frontend
```

## 📁 Project Structure

```
equipment-rental-platform/
├── 📁 backend/                    # Express.js API Server
│   ├── 📁 controllers/            # Route controllers & business logic
│   │   ├── authController.js      # Authentication logic
│   │   ├── customersController.js # Customer management
│   │   ├── equipmentController.js # Equipment CRUD operations
│   │   ├── ordersController.js    # Order processing
│   │   └── rentalsController.js   # Rental management
│   ├── 📁 middleware/             # Custom middleware
│   │   ├── adminOnly.js           # Role-based access control
│   │   └── security.js            # Rate limiting & security
│   ├── 📁 routes/                 # API route definitions
│   │   ├── auth.js                # Authentication routes
│   │   ├── customers.js           # Customer routes
│   │   ├── equipment.js           # Equipment routes
│   │   ├── orders.js              # Order routes
│   │   └── rentals.js             # Rental routes
│   ├── database.sql               # Database initialization script
│   ├── db.js                      # Database connection
│   ├── email.js                   # Email service configuration
│   ├── index.js                   # Server entry point
│   ├── swagger.js                 # API documentation setup
│   └── package.json               # Backend dependencies
├── 📁 frontend/                   # Next.js Frontend Application
│   ├── 📁 src/
│   │   ├── 📁 app/                # Next.js App Router
│   │   │   ├── 📁 (store)/        # Main application routes
│   │   │   │   ├── 📁 (routes)/   # Nested route groups
│   │   │   │   │   ├── products/  # Product catalog
│   │   │   │   │   ├── cart/      # Shopping cart
│   │   │   │   │   ├── checkout/  # Checkout process
│   │   │   │   │   ├── profile/   # User profile management
│   │   │   │   │   └── wishlist/  # User wishlist
│   │   │   │   └── layout.tsx     # Store layout
│   │   │   ├── 📁 api/            # API routes (Next.js)
│   │   │   ├── globals.css        # Global styles
│   │   │   ├── layout.tsx         # Root layout
│   │   │   └── page.tsx           # Homepage
│   │   ├── 📁 components/         # Reusable React components
│   │   │   ├── 📁 ui/             # Base UI components
│   │   │   ├── 📁 native/         # Custom components
│   │   │   └── 📁 modals/         # Modal components
│   │   ├── 📁 lib/                # Utility libraries
│   │   │   ├── api.ts             # API client
│   │   │   ├── prisma.ts          # Database client
│   │   │   ├── utils.ts           # Utility functions
│   │   │   └── jwt.ts             # JWT utilities
│   │   ├── 📁 hooks/              # Custom React hooks
│   │   ├── 📁 providers/          # Context providers
│   │   ├── 📁 state/              # State management
│   │   ├── 📁 types/              # TypeScript type definitions
│   │   └── 📁 emails/             # Email templates
│   ├── 📁 prisma/                 # Database schema & migrations
│   │   └── schema.prisma          # Prisma schema definition
│   ├── 📁 public/                 # Static assets
│   │   ├── 📁 fonts/              # Custom fonts
│   │   └── favicon.ico            # Site favicon
│   ├── next.config.js             # Next.js configuration
│   ├── tailwind.config.js         # Tailwind CSS configuration
│   ├── tsconfig.json              # TypeScript configuration
│   └── package.json               # Frontend dependencies
├── .gitignore                     # Git ignore rules
├── package.json                   # Root package.json
├── README.md                      # Project documentation
├── SECURITY.md                    # Security documentation
├── setup.sh                       # Linux/macOS setup script
└── setup.bat                      # Windows setup script
```

## 🔧 API Documentation

The API provides comprehensive endpoints for equipment rental management. All endpoints (except authentication) require JWT authentication.

### 🔐 Authentication Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `POST` | `/auth/register` | Register new user | `{ email, password, name, phone? }` | `{ token, user }` |
| `POST` | `/auth/login` | User login | `{ email, password }` | `{ token, user }` |

**Example Request:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

### 🏗️ Equipment Management (Protected)

| Method | Endpoint | Description | Access | Request Body |
|--------|----------|-------------|--------|--------------|
| `GET` | `/equipment` | Get all equipment | All users | - |
| `POST` | `/equipment` | Create equipment | Admin only | `{ name, description, quantity, dailyRate }` |
| `PATCH` | `/equipment/:id` | Update equipment | Admin only | `{ name?, description?, quantity?, dailyRate? }` |
| `DELETE` | `/equipment/:id` | Delete equipment | Admin only | - |

### 👥 Customer Management (Admin Only)

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/customers` | Get all customers | - |
| `PATCH` | `/customers/:id` | Update customer | `{ name?, email?, phone?, role? }` |
| `DELETE` | `/customers/:id` | Delete customer | - |

### 📋 Rental Management (Protected)

| Method | Endpoint | Description | Access | Request Body |
|--------|----------|-------------|--------|--------------|
| `GET` | `/rentals` | Get rentals | User's rentals / All (Admin) | - |
| `POST` | `/rentals` | Create rental | All users | `{ equipmentId, rentalDate, returnDate, quantity }` |
| `PATCH` | `/rentals/:id` | Close rental | Admin only | `{ returnDate }` |

### 🛒 Order Management (Protected)

| Method | Endpoint | Description | Access | Request Body |
|--------|----------|-------------|--------|--------------|
| `GET` | `/orders` | Get orders | User's orders / All (Admin) | - |
| `POST` | `/orders` | Create order | All users | `{ items: [{ equipmentId, quantity }] }` |
| `GET` | `/orders/:id` | Get order details | Owner / Admin | - |
| `PATCH` | `/orders/:id` | Update order | Admin only | `{ status, items? }` |
| `DELETE` | `/orders/:id` | Delete order | Admin only | - |

### 🔍 Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | API health status |
| `GET` | `/` | API information |
| `GET` | `/docs` | Swagger documentation |

**Example Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "development"
}
```

## 🔐 Authentication & Authorization

### JWT Token Usage
All protected endpoints require a valid JWT token in the Authorization header:

```bash
Authorization: Bearer <your_jwt_token>
```

### Role-Based Access Control
- **User Role**: Can view equipment, create rentals/orders, manage profile
- **Admin Role**: Full access to all endpoints, user management, equipment management

### Token Structure
```json
{
  "id": 1,
  "email": "user@example.com",
  "role": "user",
  "iat": 1642234567,
  "exp": 1642320967
}
```

## 👥 Default Users & Data

After running the database setup, you'll have:

### Default Admin Account
- **Email**: `admin@rentals.com`
- **Password**: `Admin@123!` 
- **Role**: `admin`

⚠️ **SECURITY WARNING**: Change the default admin password immediately after setup!

### Sample Equipment Data
The database includes 5 sample equipment items:
- Excavator (Large)
- Bulldozer (Medium)
- Crane (Heavy)
- Forklift (Small)
- Concrete Mixer (Medium)

## 🛠️ Development Guidelines

### Code Style & Standards
- **Backend**: Follow ESLint configuration for JavaScript
- **Frontend**: Use TypeScript with strict mode enabled
- **Database**: Use Prisma migrations for schema changes
- **Commits**: Use conventional commit messages

### Testing Strategy
```bash
# Run linting
npm run lint

# Run type checking (frontend)
cd frontend && npx tsc --noEmit

# Run database migrations
cd frontend && npx prisma migrate dev
```

### Environment Management
- Use `.env.example` files as templates
- Never commit `.env` files to version control
- Use different environments for development, staging, and production

### Database Management
```bash
# Generate Prisma client
npx prisma generate

# Push schema changes
npx prisma db push

# Open Prisma Studio
npx prisma studio

# Reset database (development only)
npx prisma db push --force-reset
```

## 🔒 Security Features

This application implements enterprise-grade security measures:

### 🔐 Authentication & Authorization
- **JWT-based authentication** with configurable expiration
- **Role-based access control** with granular permissions
- **Password hashing** using bcrypt with salt rounds 12
- **Rate limiting** on authentication endpoints

### 🛡️ API Security
- **Helmet.js** for security headers
- **CORS configuration** with origin validation
- **Input validation** and sanitization
- **Request size limits** (10MB)
- **SQL injection prevention** with parameterized queries

### 🔒 Environment Security
- **Environment variable validation** on startup
- **No hardcoded secrets** in code
- **Production/development** environment separation

⚠️ **CRITICAL SECURITY REQUIREMENTS:**
- Change default admin password immediately after setup
- Use strong JWT secrets (minimum 32 characters)
- Configure proper CORS origins for production
- Set up HTTPS in production environments
- Regular security audits and dependency updates

For detailed security documentation, see [SECURITY.md](./SECURITY.md).

## 🐛 Troubleshooting

### Common Issues & Solutions

#### 1. Database Connection Errors
**Symptoms**: `ECONNREFUSED`, `password authentication failed`

**Solutions**:
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Verify database exists
psql -l

# Test connection
psql -h localhost -U rental_user -d rentals_db

# Reset database (if needed)
cd frontend && npx prisma db push --force-reset
```

#### 2. Port Conflicts
**Symptoms**: `EADDRINUSE`, `port already in use`

**Solutions**:
```bash
# Find process using port
lsof -i :3000  # Backend
lsof -i :7777  # Frontend

# Kill process
kill -9 <PID>

# Or change ports in .env files
```

#### 3. Prisma/TypeScript Errors
**Symptoms**: `PrismaClient not found`, type errors

**Solutions**:
```bash
# Regenerate Prisma client
cd frontend && npx prisma generate

# Check TypeScript
npx tsc --noEmit

# Clear cache
rm -rf frontend/node_modules/.prisma
npm install
```

#### 4. JWT Authentication Issues
**Symptoms**: `Invalid token`, `Token expired`

**Solutions**:
- Ensure `JWT_SECRET` matches in both backend and frontend
   - Use strong secrets (minimum 32 characters)
- Check token expiration settings

#### 5. Build Errors
**Symptoms**: `Module not found`, build failures

**Solutions**:
```bash
# Clear all caches
rm -rf node_modules package-lock.json
rm -rf frontend/node_modules frontend/package-lock.json
rm -rf backend/node_modules backend/package-lock.json

# Reinstall dependencies
npm run install:all
```

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)

1. **Set Environment Variables**:
   ```bash
   JWT_SECRET=your_production_jwt_secret
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   DB_HOST=your_db_host
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-domain.com
   ```

2. **Deploy**:
   ```bash
   # Heroku
   heroku create your-app-name
   git push heroku main
   
   # Railway
   railway login
   railway init
   railway up
   ```

### Frontend Deployment (Vercel)

1. **Connect Repository** to Vercel
2. **Set Environment Variables**:
   ```bash
   DATABASE_URL=your_production_database_url
   NEXT_PUBLIC_API_URL=https://your-backend-domain.com
   JWT_SECRET_KEY=your_production_jwt_secret
   ```
3. **Deploy** automatically on push

### Production Checklist

- [ ] Change default admin password
- [ ] Set strong JWT secrets
- [ ] Configure production database
- [ ] Set up HTTPS/SSL certificates
- [ ] Configure proper CORS origins
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy
- [ ] Test all functionality in production

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Setup
```bash
# Fork and clone
git clone https://github.com/yourusername/equipment-rental-platform.git
cd equipment-rental-platform

# Install dependencies
npm run install:all

# Set up environment
cp backend/env.example backend/.env
cp frontend/env.example frontend/.env.local

# Start development
npm run dev
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** team for the amazing React framework
- **Prisma** team for the excellent ORM
- **Tailwind CSS** for the utility-first CSS framework
- **Express.js** community for the robust backend framework

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/equipment-rental-platform/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/equipment-rental-platform/discussions)
- **Email**: your.email@example.com

---

<div align="center">

**Made with ❤️ by [Your Name]**

[⬆ Back to top](#-equipment-rental-management-platform)

</div>

## 🚀 Deployment

### Backend (Heroku/ Railway)
1. Set environment variables
2. Deploy with `npm start`

### Frontend (Vercel)
1. Connect repository
2. Set environment variables
3. Deploy automatically

## 📝 License

MIT License 