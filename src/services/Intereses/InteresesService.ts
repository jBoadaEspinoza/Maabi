// src/services/InterestsService.ts
import type { Interes } from '@/types/Interes';
import axiosInstance from '../axiosInstance';

class IntereseseService {
  /**
   * Obtiene la lista de intereses con parámetros opcionales.
   * @param token - Token de autorización Bearer.
   * @param limit - Limita la cantidad de intereses retornados (opcional).
   * @param skip - Número de intereses a saltar (opcional).
   * @param sort - Especifica el orden de los resultados (opcional).
   * @returns - Promesa que se resuelve con la lista de intereses.
   */
  static async getAllInterests(
    token: string,
    limit?: number,
    skip?: number,
    sort?: 'ASC' | 'DESC'
  ): Promise<Interes[]> {
    try {
      const response = await axiosInstance.get('/interests', {
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
      
      // Extrae los intereses del campo response.data
      const interests = response.data?.response?.data || [];
      return interests as Interes[];
    } catch (error) {
      console.error('Error fetching interests:', error);
      throw error;
    }
  }
}

export default IntereseseService;
