// src/services/axiosInstance.ts
import { useRouter } from 'vue-router'
import axios from 'axios';
import router from '@/router'
import { useAuthStore } from '@/stores/auth/authStore';

const API_URL = 'https://api.maabi.online/v1.0';
const API_URL2 = 'https://fdzqzmxv-8080.brs.devtunnels.ms/v1.0';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(



  (response) => {
     // Verifica si el código de error es "invalid_token" o "token_expired"
     const errorCode = response.data?.response?.code;
     if (response.status === 200 && 
         (errorCode === 'invalid_token' || errorCode === 'token_expired')) {
       
       alert('TOKEN inválido o caducado. Por favor, inicia sesión de nuevo.');
 
       // Redirige al usuario a la página de login
       router.push({ name: 'signin' });
 
       // Rechaza la promesa para detener cualquier procesamiento adicional de este response
       return Promise.reject(new Error('TOKEN inválido o caducado'));
     }
       // Si la respuesta tiene success: true, actualiza el token
    if (response.data?.response?.success) {
      const updatedToken = response.data.response.updated_token;
      if (updatedToken) {
        localStorage.setItem('token', updatedToken);
        //console.log('Token actualizado:', updatedToken);
      }
    }

 
     return response;

  },
  (error) => {
    if (error.response && error.response.status === 401) {
      const errorCode = error.response.data?.response?.code;

      if (errorCode === 'token_missing' || errorCode === 'invalid_token') {
        alert(error.response.data?.response?.message || 'Token no válido o faltante.');
        
        // Redirige al usuario a la página de login
        router.push({ name: 'signin' });
      } else if (errorCode === 'invalid_token' && error.response.data?.response?.message === 'El TOKEN ha caducado') {
        alert('El TOKEN ha caducado. Por favor, inicia sesión de nuevo.');
        
        // Redirige al usuario a la página de login
        router.push({ name: 'signin' });
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
