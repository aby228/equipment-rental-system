# 🏗️ EDUSTECH Equipment Rental Platform

A modern, full-stack web application for construction equipment rental management. Built with Next.js frontend and Express.js backend, providing a seamless experience for equipment rental operations.

## 📋 **Project Overview**

EDUSTECH Equipment Rental is a comprehensive platform that enables construction companies and contractors to browse, select, and rent construction equipment. The application features user authentication, equipment catalog management, shopping cart functionality, and order processing.

### **Key Features**
- 🔐 **Secure Authentication** - JWT-based user authentication system
- 🛒 **Shopping Cart Management** - Add, update, and remove equipment from cart
- 📋 **Order Processing** - Complete rental order workflow with confirmation
- 🔍 **Equipment Search & Filtering** - Advanced search and category-based filtering
- 📱 **Responsive Design** - Mobile-first approach with modern UI/UX
- 🚀 **RESTful API** - Clean, scalable backend architecture

## 🏗️ **Architecture**

### **Frontend (Next.js)**
- **Framework**: Next.js 13+ with App Router
- **Styling**: Tailwind CSS with custom components
- **State Management**: React Context API
- **Authentication**: JWT token management
- **UI Components**: Custom component library with Radix UI primitives

### **Backend (Express.js)**
- **Runtime**: Node.js 18+
- **Framework**: Express.js with RESTful API design
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt for password hashing, CORS configuration
- **Data Storage**: In-memory storage (production-ready for database integration)

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18.0.0 or higher
- npm or yarn package manager
- Git for version control

### **Frontend Setup**
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
cp env.example .env.local

# Start development server
npm run dev
```

### **Backend Setup**
```bash
# Navigate to backend directory
cd backend-express

# Install dependencies
npm install

# Create environment file
echo "JWT_SECRET=your-super-secure-secret-key-here" > .env
echo "PORT=3001" >> .env

# Start development server
npm run dev
```

### **Environment Configuration**

**Frontend (.env.local)**
```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:7777
NEXT_PUBLIC_APP_ENV=development
```

**Backend (.env)**
```bash
JWT_SECRET=your-super-secure-secret-key-here
PORT=3001
```

## 📊 **API Endpoints**

### **Authentication**
- `POST /auth/register` - User registration
- `POST /auth/login` - User authentication

### **Equipment Management**
- `GET /equipment` - Retrieve all equipment (with optional filtering)
- `GET /equipment/:id` - Get specific equipment details

### **Shopping Cart**
- `GET /cart` - Retrieve user's cart contents
- `POST /cart` - Add item to cart
- `PUT /cart/:equipmentId` - Update cart item
- `DELETE /cart/:equipmentId` - Remove item from cart

### **Order Management**
- `GET /orders` - Retrieve user's order history
- `POST /orders` - Create new rental order

### **System**
- `GET /health` - Health check endpoint

## 🔧 **Development**

### **Code Structure**
```
new-rentals/
├── frontend/                 # Next.js frontend application
│   ├── pages/               # Page components and routing
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── lib/            # Utility functions and API client
│   │   └── config/         # Application configuration
│   └── public/             # Static assets
├── backend-express/         # Express.js backend API
│   ├── server.js           # Main server file
│   └── package.json        # Backend dependencies
└── README.md               # Project documentation
```

### **Available Scripts**

**Frontend**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

**Backend**
```bash
npm run dev          # Start development server with nodemon
npm start           # Start production server
```

## 🚀 **Deployment**

### **Frontend Deployment**
The frontend can be deployed to any platform that supports Next.js:
- **Vercel** (Recommended)
- **Netlify**
- **Railway**
- **Render**

### **Backend Deployment**
The backend can be deployed to any Node.js hosting platform:
- **Render.com** (Recommended - Free)
- **Railway.app**
- **Heroku**
- **DigitalOcean**

For detailed deployment instructions, see [EXPRESS_BACKEND_GUIDE.md](./EXPRESS_BACKEND_GUIDE.md).

## 🔒 **Security Features**

- **JWT Authentication** - Secure token-based user sessions
- **Password Hashing** - bcrypt for secure password storage
- **CORS Protection** - Configured for secure cross-origin requests
- **Input Validation** - Comprehensive validation on all endpoints
- **Error Handling** - Proper error responses without sensitive data exposure

## 🧪 **Testing**

### **API Testing**
```bash
# Health check
curl http://localhost:3001/health

# Equipment listing
curl http://localhost:3001/equipment

# User registration
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "fullName": "Test User",
    "phone": "1234567890"
  }'
```

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 **Author**

**CS Senior Developer**
- GitHub: [@your-username](https://github.com/your-username)
- Email: your.email@example.com

## 🙏 **Acknowledgments**

- Next.js team for the amazing React framework
- Express.js community for the robust backend framework
- Tailwind CSS for the utility-first CSS framework
- Radix UI for accessible component primitives

---

**Built with ❤️ for the construction industry** 