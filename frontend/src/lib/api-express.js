/**
 * EDUSTECH Equipment Rental API Client
 * 
 * This module provides a centralized interface for making HTTP requests to the
 * EDUSTECH backend API. It handles authentication, request formatting, and
 * error handling in a consistent manner across the frontend application.
 * 
 * Features:
 * - Automatic JWT token inclusion for authenticated requests
 * - Standardized error handling with meaningful error messages
 * - Support for all HTTP methods (GET, POST, PUT, DELETE)
 * - Environment-based API URL configuration
 * 
 * @author CS Senior Developer
 * @version 1.0.0
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * Retrieves the authentication token from browser localStorage.
 * This token is used to authenticate API requests for protected endpoints.
 * 
 * @returns {string|null} JWT token if available, null otherwise
 */
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

/**
 * API Client Object
 * 
 * Provides methods for making HTTP requests to the backend API.
 * All methods automatically include authentication headers when a token is available.
 */
const api = {
  /**
   * Core request method that handles all HTTP requests to the API.
   * 
   * @param {string} endpoint - API endpoint path (e.g., '/equipment', '/cart')
   * @param {Object} options - Fetch API options (method, body, headers, etc.)
   * 
   * @returns {Promise<Object>} Parsed JSON response from the API
   * @throws {Error} Throws error with meaningful message if request fails
   */
  async request(endpoint, options = {}) {
    const token = getAuthToken();
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API Error: ${response.status}`);
    }
    
    return response.json();
  },
  
  /**
   * Performs a GET request to the specified endpoint.
   * 
   * @param {string} endpoint - API endpoint path
   * @returns {Promise<Object>} API response data
   */
  get: (endpoint) => api.request(endpoint),
  
  /**
   * Performs a POST request to the specified endpoint with JSON data.
   * 
   * @param {string} endpoint - API endpoint path
   * @param {Object} data - JSON data to send in request body
   * @returns {Promise<Object>} API response data
   */
  post: (endpoint, data) => api.request(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  /**
   * Performs a PUT request to the specified endpoint with JSON data.
   * 
   * @param {string} endpoint - API endpoint path
   * @param {Object} data - JSON data to send in request body
   * @returns {Promise<Object>} API response data
   */
  put: (endpoint, data) => api.request(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  /**
   * Performs a DELETE request to the specified endpoint.
   * 
   * @param {string} endpoint - API endpoint path
   * @returns {Promise<Object>} API response data
   */
  delete: (endpoint) => api.request(endpoint, { method: 'DELETE' }),
};

export default api;
