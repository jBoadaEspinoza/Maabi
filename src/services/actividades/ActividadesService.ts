// src/services/ActivityService.ts
import type { Actividad } from '@/types/Actividad';
import axiosInstance from '../axiosInstance';
import type { TipoActividad } from '@/types/TipoActividad';

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

  /**
   * Obtiene la lista de tipos de actividades turísticas.
   * @param token - Token de autorización Bearer.
   * @param limit - Limita la cantidad de tipos de actividades retornados (opcional).
   * @param skip - Número de tipos de actividades a saltar (opcional).
   * @param sort - Especifica el orden de los resultados (opcional).
   * @returns - Promesa que se resuelve con la lista de tipos de actividades.
   */
  static async getAllActivityTypes(
    token: string,
    limit?: number,
    skip?: number,
    sort?: 'ASC' | 'DESC'
  ): Promise<TipoActividad[]> {
    try {
      const response = await axiosInstance.get('/types-activities', {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        params: {
          limit: limit || 10, // Por defecto, limita a 10 si no se especifica
          skip: skip || 0,    // Por defecto, empieza desde 0 si no se especifica
          sort: sort || 'ASC' // Por defecto, orden ascendente si no se especifica
        }
      });
      
      // Extrae los tipos de actividades del campo response.data
      const activityTypes = response.data?.response?.data || [];
      return activityTypes as TipoActividad[];
    } catch (error) {
      console.error('Error fetching activity types:', error);
      throw error;
    }
  }

  static async createActivity(
    token: string,
    activityData: any // Usa `any` para evitar problemas con los tipos
  ): Promise<Actividad> {
    try {
      const response = await axiosInstance.post('/activities', activityData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const activity = response.data?.response?.data || {};
      return activity as Actividad;
    } catch (error) {
      console.error('Error creating activity:', error);
      throw error;
    }
  }

}

export default ActividadesService;
