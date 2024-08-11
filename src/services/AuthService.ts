// src/services/AuthService.ts
import axiosInstance from './axiosInstance';

class AuthService {
  static async login(username: string, password: string) {
    try {
      const response = await axiosInstance.post('/auth/login', { username, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async fetchProfile(token: string) {
    try {
      const response = await axiosInstance.get('/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
