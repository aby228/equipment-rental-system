const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const bcrypt = require('bcrypt');

// Rate limiting for authentication endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many authentication attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// General API rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Input validation middleware
const validateEquipment = (req, res, next) => {
  const { name, quantity, daily_rate } = req.body;
  
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ error: 'Valid equipment name is required (min 2 characters)' });
  }
  
  if (!quantity || !Number.isInteger(Number(quantity)) || Number(quantity) < 0) {
    return res.status(400).json({ error: 'Valid quantity (non-negative integer) is required' });
  }
  
  if (!daily_rate || isNaN(Number(daily_rate)) || Number(daily_rate) < 0) {
    return res.status(400).json({ error: 'Valid daily rate (non-negative number) is required' });
  }
  
  next();
};

const validateUser = (req, res, next) => {
  const { name, email, password } = req.body;
  
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ error: 'Valid name is required (min 2 characters)' });
  }
  
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email address is required' });
  }
  
  if (!password || typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long' });
  }
  
  next();
};

// Password strength validation
const validatePasswordStrength = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
};

// Enhanced password validation middleware
const validatePassword = (req, res, next) => {
  const { password } = req.body;
  
  if (!validatePasswordStrength(password)) {
    return res.status(400).json({ 
      error: 'Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character' 
    });
  }
  
  next();
};

module.exports = {
  authLimiter,
  apiLimiter,
  validateEquipment,
  validateUser,
  validatePassword,
  validatePasswordStrength
}; 