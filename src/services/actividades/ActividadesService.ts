// src/services/ActivityService.ts
import type { Actividad } from '@/types/Actividad';
import axiosInstance from '../axiosInstance';

class ActividadesService {
  static async getAllActivities(token: string): Promise<Actividad[]> {
    try {
      const response = await axiosInstance.get('/activities', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Extrae las actividades del campo response.data
      const activities = response.data?.response?.data || [];
      return activities as Actividad[];
    } catch (error) {
      console.error('Error fetching activities:', error);
      throw error;
    }
  }
}

export default ActividadesService;
