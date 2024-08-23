// src/services/DepartureService.ts
import type { Horario } from '@/types/Horario';
import axiosInstance from '../axiosInstance';

class HorariosService {
  /**
   * Obtiene la lista de horarios de salida con parámetros opcionales.
   * @param token - Token de autorización Bearer.
   * @param limit - Limita la cantidad de horarios retornados (opcional).
   * @param skip - Número de horarios a saltar (opcional).
   * @param sort - Especifica el orden de los resultados (opcional).
   * @param activityId - ID de la actividad turística (obligatorio).
   * @param active - Estado activo del horario de salida (opcional).
   * @returns - Promesa que se resuelve con la lista de horarios de salida.
   */
  static async getAllDepartures(
    token: string,
    limit?: number,
    skip?: number,
    sort?: 'ASC' | 'DESC',
    activityId?: string,
    active?: boolean
  ): Promise<Horario[]> {
    try {
      const response = await axiosInstance.get('/departures', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        params: {
          limit: limit || 10, // Por defecto, limita a 10 si no se especifica
          skip: skip || 0,    // Por defecto, empieza desde 0 si no se especifica
          sort: sort || 'ASC', // Por defecto, orden ascendente si no se especifica
          a_id: activityId,    // ID de la actividad turística (obligatorio)
          active: active !== undefined ? active : true // Por defecto, activo si no se especifica
        }
      });

      // Extrae los horarios del campo response.data
      const departures = response.data?.response?.data || [];
      return departures as Horario[];
    } catch (error) {
      console.error('Error fetching departures:', error);
      throw error;
    }
  }
}

export default HorariosService;
