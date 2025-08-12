/**
 * EDUSTECH Equipment Rental Backend Server
 * 
 * This Express.js server provides a RESTful API for the EDUSTECH equipment rental platform.
 * It handles user authentication, equipment management, cart operations, and order processing.
 * 
 * Architecture:
 * - RESTful API design with proper HTTP status codes
 * - JWT-based authentication for secure user sessions
 * - In-memory data storage (can be replaced with database for production)
 * - CORS enabled for cross-origin requests from frontend
 * 
 * @author CS Senior Developer
 * @version 1.0.0
 */

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

/**
 * Middleware Configuration
 * - CORS: Enables cross-origin resource sharing for frontend integration
 * - JSON Parser: Parses incoming JSON payloads in request bodies
 */
app.use(cors());
app.use(express.json());

/**
 * In-Memory Data Storage
 * 
 * Note: This is a development implementation. For production deployment,
 * replace with a proper database (PostgreSQL, MongoDB, etc.) for data persistence.
 * 
 * Data Structures:
 * - users: Array of user objects with authentication data
 * - equipment: Array of equipment items available for rental
 * - carts: Object mapping user IDs to their shopping cart data
 * - orders: Array of completed rental orders
 */
let users = [];
let equipment = [
  {
    id: '1',
    name: "Welder Generator",
    description: "Professional welding and power generation equipment for construction sites.",
    price: 45.00,
    category: "Power Generation",
    imageUrl: "/images/equipment/welder generator.jpg",
    inStock: true
  },
  {
    id: '2',
    name: "Heavy-Duty Grout Pump",
    description: "Industrial grout pump for concrete and construction applications.",
    price: 35.00,
    category: "Pumps & Water",
    imageUrl: "/images/equipment/HEAVY-DUTY GROUT PUMP.jpg",
    inStock: true
  },
  {
    id: '3',
    name: "Concrete Mixer",
    description: "Heavy-duty concrete mixer for construction projects.",
    price: 40.00,
    category: "Concrete Equipment",
    imageUrl: "/images/equipment/concrete mixer.jpg",
    inStock: true
  },
  {
    id: '4',
    name: "Excavator",
    description: "Large excavator for heavy digging and construction work.",
    price: 120.00,
    category: "Heavy Machinery",
    imageUrl: "/images/equipment/excavator.jpg",
    inStock: true
  },
  {
    id: '5',
    name: "Bulldozer",
    description: "Heavy-duty bulldozer for earthmoving and grading.",
    price: 150.00,
    category: "Heavy Machinery",
    imageUrl: "/images/equipment/bulldozer.jpg",
    inStock: true
  }
];

let carts = {};
let orders = [];

/**
 * JWT Configuration
 * 
 * The JWT secret is used to sign and verify authentication tokens.
 * In production, this should be a strong, randomly generated secret
 * stored securely in environment variables.
 */
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

/**
 * Authentication Middleware
 * 
 * This middleware validates JWT tokens in the Authorization header.
 * It extracts the token from the "Bearer <token>" format and verifies
 * its authenticity using the JWT secret.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * 
 * @returns {void} Calls next() if authentication succeeds, sends error response otherwise
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

/**
 * Equipment Management Routes
 * 
 * These routes handle CRUD operations for equipment items.
 * Equipment data includes name, description, price, category, and availability status.
 */

/**
 * GET /equipment
 * 
 * Retrieves a list of all available equipment with optional filtering.
 * Supports category-based filtering and text-based search functionality.
 * 
 * Query Parameters:
 * - category: Filter equipment by category (optional)
 * - search: Search equipment by name or description (optional)
 * 
 * @param {Object} req - Express request object with query parameters
 * @param {Object} res - Express response object
 * 
 * @returns {Array} JSON array of equipment items matching the criteria
 */
app.get('/equipment', (req, res) => {
  const { category, search } = req.query;
  let filteredEquipment = equipment;

  // Apply category filter if specified and not 'all'
  if (category && category !== 'all') {
    filteredEquipment = filteredEquipment.filter(item => item.category === category);
  }

  // Apply text search filter if specified
  if (search) {
    filteredEquipment = filteredEquipment.filter(item => 
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.json(filteredEquipment);
});

/**
 * GET /equipment/:id
 * 
 * Retrieves detailed information about a specific equipment item by its ID.
 * 
 * URL Parameters:
 * - id: The unique identifier of the equipment item
 * 
 * @param {Object} req - Express request object with equipment ID parameter
 * @param {Object} res - Express response object
 * 
 * @returns {Object} JSON object containing equipment details or 404 error
 */
app.get('/equipment/:id', (req, res) => {
  const equipmentItem = equipment.find(item => item.id === req.params.id);
  if (!equipmentItem) {
    return res.status(404).json({ error: 'Equipment not found' });
  }
  res.json(equipmentItem);
});

/**
 * Shopping Cart Management Routes
 * 
 * These routes handle user shopping cart operations including adding items,
 * updating quantities, and removing items. All cart operations require
 * user authentication via JWT tokens.
 */

/**
 * GET /cart
 * 
 * Retrieves the current user's shopping cart contents.
 * Returns an empty cart if no items have been added.
 * 
 * Authentication: Required (JWT token in Authorization header)
 * 
 * @param {Object} req - Express request object with authenticated user
 * @param {Object} res - Express response object
 * 
 * @returns {Object} JSON object containing cart items and total cost
 */
app.get('/cart', authenticateToken, (req, res) => {
  const userCart = carts[req.user.id] || { items: [], total: 0 };
  res.json(userCart);
});

/**
 * POST /cart
 * 
 * Adds an equipment item to the user's shopping cart or updates existing item.
 * Calculates the total cost based on quantity, rental hours, and equipment price.
 * 
 * Authentication: Required (JWT token in Authorization header)
 * 
 * Request Body:
 * - equipmentId: Unique identifier of the equipment item
 * - quantity: Number of units to rent
 * - rentalHours: Number of hours for rental period
 * 
 * @param {Object} req - Express request object with cart item data
 * @param {Object} res - Express response object
 * 
 * @returns {Object} JSON object containing updated cart contents
 */
app.post('/cart', authenticateToken, (req, res) => {
  const { equipmentId, quantity, rentalHours } = req.body;
  const equipmentItem = equipment.find(item => item.id === equipmentId);
  
  if (!equipmentItem) {
    return res.status(404).json({ error: 'Equipment not found' });
  }

  // Calculate cart item with total cost
  const cartItem = {
    equipmentId,
    name: equipmentItem.name,
    imageUrl: equipmentItem.imageUrl,
    price: equipmentItem.price,
    quantity: parseInt(quantity),
    rentalHours: parseInt(rentalHours),
    total: equipmentItem.price * parseInt(quantity) * parseInt(rentalHours)
  };

  // Initialize user cart if it doesn't exist
  if (!carts[req.user.id]) {
    carts[req.user.id] = { items: [], total: 0 };
  }

  // Check if item already exists in cart
  const existingItemIndex = carts[req.user.id].items.findIndex(item => item.equipmentId === equipmentId);
  
  if (existingItemIndex >= 0) {
    // Update existing item
    carts[req.user.id].items[existingItemIndex] = cartItem;
  } else {
    // Add new item to cart
    carts[req.user.id].items.push(cartItem);
  }

  // Recalculate cart total
  carts[req.user.id].total = carts[req.user.id].items.reduce((sum, item) => sum + item.total, 0);
  
  res.json(carts[req.user.id]);
});

app.put('/cart/:equipmentId', authenticateToken, (req, res) => {
  const { quantity, rentalHours } = req.body;
  const equipmentId = req.params.equipmentId;
  
  if (!carts[req.user.id]) {
    return res.status(404).json({ error: 'Cart not found' });
  }

  const itemIndex = carts[req.user.id].items.findIndex(item => item.equipmentId === equipmentId);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found in cart' });
  }

  carts[req.user.id].items[itemIndex].quantity = parseInt(quantity);
  carts[req.user.id].items[itemIndex].rentalHours = parseInt(rentalHours);
  carts[req.user.id].items[itemIndex].total = carts[req.user.id].items[itemIndex].price * parseInt(quantity) * parseInt(rentalHours);
  
  carts[req.user.id].total = carts[req.user.id].items.reduce((sum, item) => sum + item.total, 0);
  
  res.json(carts[req.user.id]);
});

app.delete('/cart/:equipmentId', authenticateToken, (req, res) => {
  const equipmentId = req.params.equipmentId;
  
  if (!carts[req.user.id]) {
    return res.status(404).json({ error: 'Cart not found' });
  }

  carts[req.user.id].items = carts[req.user.id].items.filter(item => item.equipmentId !== equipmentId);
  carts[req.user.id].total = carts[req.user.id].items.reduce((sum, item) => sum + item.total, 0);
  
  res.json(carts[req.user.id]);
});

// Order Routes
app.post('/orders', authenticateToken, (req, res) => {
  const { items, rentalStartDate, rentalEndDate, customerInfo } = req.body;
  
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  
  const order = {
    id: Date.now().toString(),
    userId: req.user.id,
    items,
    subtotal,
    tax,
    total,
    status: 'pending',
    rentalStartDate,
    rentalEndDate,
    customerInfo,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  orders.push(order);
  
  // Clear cart after successful order
  delete carts[req.user.id];
  
  res.json({ orderId: order.id, ...order });
});

app.get('/orders', authenticateToken, (req, res) => {
  const userOrders = orders.filter(order => order.userId === req.user.id);
  res.json(userOrders);
});

// Auth Routes
app.post('/auth/register', async (req, res) => {
  try {
    const { email, password, fullName, phone } = req.body;
    
    // Check if user already exists
    if (users.find(user => user.email === email)) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      fullName,
      phone,
      role: 'customer',
      createdAt: new Date()
    };
    
    users.push(user);
    
    // Generate token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    
    res.json({ 
      success: true, 
      user: { id: user.id, email: user.email, fullName: user.fullName },
      token 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Generate token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    
    res.json({ 
      success: true, 
      user: { id: user.id, email: user.email, fullName: user.fullName },
      token 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * System Health Check Route
 * 
 * Provides system status information for monitoring and debugging purposes.
 * This endpoint is commonly used by load balancers and monitoring services
 * to verify the application is running correctly.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * 
 * @returns {Object} JSON object containing system status and timestamp
 */
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'EDUSTECH Equipment Rental API',
    version: '1.0.0'
  });
});

/**
 * Server Initialization
 * 
 * Starts the Express server on the specified port and logs startup information.
 * The server will handle incoming HTTP requests and route them to appropriate
 * endpoint handlers based on the URL path and HTTP method.
 */
app.listen(PORT, () => {
  console.log(`🚀 EDUSTECH Backend Server initialized successfully`);
  console.log(`📍 Server running on port: ${PORT}`);
  console.log(`📊 Health check endpoint: http://localhost:${PORT}/health`);
  console.log(`🔧 Equipment API endpoint: http://localhost:${PORT}/equipment`);
  console.log(`🛒 Cart API endpoint: http://localhost:${PORT}/cart`);
  console.log(`📋 Orders API endpoint: http://localhost:${PORT}/orders`);
  console.log(`🔐 Auth API endpoint: http://localhost:${PORT}/auth`);
});
