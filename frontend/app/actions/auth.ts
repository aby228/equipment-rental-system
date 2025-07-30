// new-rentals/frontend/app/actions/auth.ts
import api from '@/lib/api';
import { cookies } from 'next/headers';

export async function login(email: string, password: string) {
  try {
    const response = await api.post('/auth/login', { email, password });
    const { token } = response.data;
    
    // Store the token in an HTTP-only cookie
    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Invalid credentials' };
  }
}