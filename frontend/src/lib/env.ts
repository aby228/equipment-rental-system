/**
 * Environment variable validation
 * Ensures all required environment variables are present
 */

const requiredEnvVars = {
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
} as const;

/**
 * Validate environment variables
 * @throws Error if any required environment variable is missing
 */
export function validateEnv() {
  const missingVars = Object.entries(requiredEnvVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }
}

/**
 * Get environment variable with validation
 * @param key - Environment variable key
 * @param defaultValue - Default value if not found
 * @returns Environment variable value
 */
export function getEnv(key: keyof typeof requiredEnvVars, defaultValue?: string): string {
  const value = requiredEnvVars[key] || defaultValue;
  
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  
  return value;
}

/**
 * Check if running in production
 */
export const isProduction = process.env.NODE_ENV === 'production';

/**
 * Check if running in development
 */
export const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * JWT Secret for authentication
 */
export const JWT_SECRET_KEY = getEnv('JWT_SECRET_KEY');

/**
 * API URL for frontend
 */
export const NEXT_PUBLIC_API_URL = getEnv('NEXT_PUBLIC_API_URL');

/**
 * App URL for frontend
 */
export const NEXT_PUBLIC_APP_URL = getEnv('NEXT_PUBLIC_APP_URL'); 