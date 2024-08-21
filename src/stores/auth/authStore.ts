// src/stores/authStore.ts
import { defineStore } from 'pinia';
import AuthService from '@/services/AuthService';

interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => {
    // Recuperar datos de localStorage
    const token = localStorage.getItem('token');

    // Asegurarse de que los datos sean válidos JSON antes de parsear
 

    return {
      user: null,
      token: token || null,
      loading: false,
      error: null,
    };
  },

  actions: {
    async login(username: string, password: string) {
      this.loading = true;
      this.error = null;

      try {
        const response = await AuthService.login(username, password);
        if (response.response.success) {  // Verifica si `success` es true
          this.user = response.response.user;
          this.token = response.response.token;
          localStorage.setItem('token', this.token || '');
          console.log('Login successful:', response);
        } else {
          this.error = response.message || 'Login failed';
          console.log('Login failed:', response);
        }
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Error during login';
        console.log('Error during login:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchProfile() {
        if (!this.token) {
          console.error('No token available for fetching profile');
          return;
        }
  
        this.loading = true;
        this.error = null;
  
        try {
          const response = await AuthService.fetchProfile(this.token);
          if (response.response.success) {
            this.user = response.response.data;  // Actualiza el perfil del usuario
            this.token = response.response.updated_token;  // Actualiza el token
            localStorage.setItem('token', this.token);  // Guarda el nuevo token en localStorage
            localStorage.setItem('user', JSON.stringify(this.user));  // Guarda el usuario en localStorage
            console.log('Profile fetched successfully:', response);
          } else {
            this.error = response.message || 'Failed to fetch profile';
            console.log('Failed to fetch profile:', response);
          }
        } catch (error: any) {
          this.error = error.response?.data?.message || 'Error fetching profile';
          console.log('Error fetching profile:', error);
        } finally {
          this.loading = false;
        }
      },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },



  },
  getters: {
    isAuthenticated: (state) => !!state.token,
      getToken: (state) => {
      // Devuelve el token desde el estado o el localStorage
      return state.token || localStorage.getItem('token');
    },

  },
});
