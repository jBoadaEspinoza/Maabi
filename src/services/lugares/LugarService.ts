// src/services/LugarService.ts
import type { Lugar } from '@/types/Lugar';
import axiosInstance from '../axiosInstance';

class LugarService {
  /**
   * Obtiene la lista de lugares turísticos con parámetros opcionales.
   * @param token - Token de autorización Bearer.
   * @param limit - Limita la cantidad de lugares turísticos retornados (opcional).
   * @param skip - Número de lugares turísticos a saltar (opcional).
   * @param sort - Especifica el orden de los resultados (opcional).
   * @returns - Promesa que se resuelve con la lista de lugares turísticos.
   */
  static async getAllPlaces(
    token: string,
    limit?: number,
    skip?: number,
    sort?: 'ASC' | 'DESC'
  ): Promise<Lugar[]> {
    try {
      const response = await axiosInstance.get('/places', {
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

      // Extrae los lugares turísticos del campo response.data
      const places = response.data?.response?.data || [];
      return places as Lugar[];
    } catch (error) {
      console.error('Error fetching places:', error);
      throw error;
    }
  }
}

export default LugarService;
