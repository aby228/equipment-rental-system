# 🚀 EDUSTECH Equipment Rental - Express.js Backend Deployment Guide

## 📋 **Project Overview**

This guide provides comprehensive instructions for deploying the EDUSTECH Equipment Rental backend API, built with Express.js and Node.js. The backend provides a robust RESTful API for managing construction equipment rentals, user authentication, shopping cart operations, and order processing.

### **Key Features**
✅ **Completely FREE** - No Firebase Blaze plan required  
✅ **RESTful API Design** - Standard HTTP methods and status codes  
✅ **JWT Authentication** - Secure token-based user sessions  
✅ **CORS Configuration** - Cross-origin resource sharing enabled  
✅ **Modular Architecture** - Clean, maintainable code structure  
✅ **Production Ready** - Scalable and deployable to any platform  

## 🚀 **Quick Start (Local Development)**

### **Prerequisites**
- Node.js version 18.0.0 or higher
- npm (Node Package Manager)
- Git (for version control)

### **1. Install Dependencies**
```bash
cd backend-express
npm install
```

### **2. Configure Environment Variables**
Create a `.env` file in the `backend-express` directory:
```bash
JWT_SECRET=your-super-secure-secret-key-here
PORT=3001
```

### **3. Start the Development Server**
```bash
npm run dev
```

The backend server will be running at: `http://localhost:3001`

### **4. Verify API Functionality**
```bash
# Health check endpoint
curl http://localhost:3001/health

# Retrieve all equipment
curl http://localhost:3001/equipment

# Test with authentication (after registering a user)
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:3001/cart
```

## 🌐 **Production Deployment Options**

### **Option 1: Render.com (Recommended - FREE)**
Render.com provides a robust, scalable platform for deploying Node.js applications with zero configuration.

**Deployment Steps:**
1. Navigate to [render.com](https://render.com) and create an account
2. Connect your GitHub repository to Render
3. Create a new **Web Service** from your repository
4. Configure the service:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**: Add `JWT_SECRET` and `PORT`
5. Deploy and obtain your production URL

**Benefits:**
- Automatic HTTPS/SSL certificates
- Custom domain support
- Automatic deployments on Git push
- Built-in monitoring and logging

### **Option 2: Railway.app (FREE)**
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Deploy from GitHub repository
4. Get your live URL

### **Option 3: Heroku (FREE tier available)**
1. Install Heroku CLI
2. Create Heroku app
3. Deploy with Git

## 🔧 **Frontend Configuration**

### **Update Environment File**
Create `frontend/.env.local`:
```bash
# Express Backend URL
NEXT_PUBLIC_API_URL=http://localhost:3001

# For production, use your deployed URL:
# NEXT_PUBLIC_API_URL=https://your-app.onrender.com

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:7777
NEXT_PUBLIC_APP_ENV=development
```

### **Update API Client**
Replace `frontend/src/lib/api.js` with `frontend/src/lib/api-express.js`:
```javascript
import api from './api-express';
export default api;
```

## 📊 **API Endpoints**

### **Equipment**
- `GET /equipment` - Get all equipment
- `GET /equipment/:id` - Get single equipment

### **Cart**
- `GET /cart` - Get user cart
- `POST /cart` - Add item to cart
- `PUT /cart/:equipmentId` - Update cart item
- `DELETE /cart/:equipmentId` - Remove item from cart

### **Orders**
- `GET /orders` - Get user orders
- `POST /orders` - Create order

### **Authentication**
- `POST /auth/register` - Register user
- `POST /auth/login` - Login user

### **Health**
- `GET /health` - Health check

## 🔒 **Security Features**

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt for password security
- **CORS Protection** - Configured for your frontend
- **Input Validation** - Basic validation on all endpoints

## 💰 **Cost Comparison**

| Service | Firebase Functions | Express Backend |
|---------|-------------------|-----------------|
| **Plan Required** | Blaze ($25/month) | Free |
| **Function Calls** | 125K/month free | Unlimited |
| **Deployment** | Firebase only | Anywhere |
| **Database** | Firestore | In-memory (upgrade to DB) |

## 🚀 **Production Deployment**

### **1. Add Environment Variables**
```bash
JWT_SECRET=your-super-secure-secret-key
PORT=3001
```

### **2. Add Database (Optional)**
For production, replace in-memory storage with:
- **MongoDB Atlas** (Free tier)
- **PostgreSQL** (Railway/Render)
- **SQLite** (Simple file-based)

### **3. Deploy**
Choose your platform and deploy!

## 📱 **Testing**

### **Test Registration**
```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "fullName": "Test User",
    "phone": "1234567890"
  }'
```

### **Test Login**
```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## 🎉 **Benefits**

✅ **No Firebase Blaze plan needed**  
✅ **Completely free deployment**  
✅ **Same API endpoints**  
✅ **Easy to customize**  
✅ **Deploy anywhere**  
✅ **Production ready**  

Your Express backend is ready to use! 🚀
