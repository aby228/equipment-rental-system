import axios from 'axios';
import type { AxiosInstance } from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
});

// Add a response interceptor for handling auth errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Redirect to login page on auth error
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default api;