// src/services/authService.ts
import axios from 'axios';

class AuthService {
  private apiUrl = 'https://api.maabi.online/v1.0/auth/login';

  async login(username: string, password: string) {
    const response = await axios.post(this.apiUrl, {
      username,
      password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  }
}

export default new AuthService();
