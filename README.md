# 🏗️ EDUSTECH Equipment Rental Platform

A full-stack construction equipment rental platform built with modern web technologies. Features real-time inventory management, secure authentication, and responsive design.

## 🚀 Live Demo
- [Frontend](https://edustech-enterprise.vercel.app)
- [Backend API](https://equipment-rental-system.onrender.com)

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Modern icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - RESTful API framework
- **JWT** - Secure authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Deployment
- **Vercel** - Frontend hosting
- **Render** - Backend hosting
- **GitHub** - Version control

## ✨ Key Features

### 🔐 Authentication System
- Secure JWT-based authentication
- User registration with password validation
- Protected routes and middleware
- Session management with HTTP-only cookies

### 🛒 E-commerce Functionality
- Real-time cart management
- Product catalog with categories
- Order processing system
- Inventory tracking

### 🎨 Modern UI/UX
- Responsive design for all devices
- Clean, minimal interface
- Interactive product cards
- User profile management
- Search functionality with autocomplete

### 📱 User Experience
- Profile picture upload
- Order history tracking
- Wishlist functionality
- Contact information management

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js       │    │   Express.js    │    │   Render.com    │
│   Frontend      │◄──►│   Backend API   │◄──►│   Hosting       │
│   (Vercel)      │    │   (Node.js)     │    │   (Free Tier)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend-express
npm install
npm run dev
```

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | User registration |
| `POST` | `/auth/login` | User authentication |
| `GET` | `/equipment` | Fetch equipment catalog |
| `GET` | `/cart` | Get user cart |
| `POST` | `/cart` | Add item to cart |
| `POST` | `/orders` | Create order |

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcryptjs for password security
- **CORS Protection** - Configured for production domains
- **Input Validation** - Server-side validation
- **HTTP-Only Cookies** - Secure session storage

## 🎯 Technical Highlights

- **Full-Stack Development** - Complete frontend and backend implementation
- **Modern Architecture** - Clean separation of concerns
- **Type Safety** - TypeScript throughout the application
- **Responsive Design** - Mobile-first approach
- **Performance Optimized** - Image optimization, lazy loading
- **Production Ready** - Deployed and tested in production environment

## 📈 Performance Metrics

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices)
- **Build Time**: < 2 minutes
- **API Response Time**: < 200ms average
- **Bundle Size**: Optimized with Next.js

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Abraham Yarba** - [GitHub](https://github.com/aby228)

---

⭐ **Star this repository if you found it helpful!** 