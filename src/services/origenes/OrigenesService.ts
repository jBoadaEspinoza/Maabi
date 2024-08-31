// src/services/OrigenesService.ts
import type { Origen } from '@/types/Origen'
import axiosInstance from '../axiosInstance'

class OrigenesService {
  /**
   * Obtiene la lista de lugares de orígenes disponibles con parámetros opcionales.
   * @param token - Token de autorización Bearer.
   * @param limit - Limita la cantidad de lugares de orígenes retornados (opcional).
   * @param skip - Número de lugares de orígenes a saltar (opcional).
   * @param sort - Especifica el orden de los resultados (opcional).
   * @returns - Promesa que se resuelve con la lista de lugares de orígenes.
   */
  static async getAllOrigins(
    token: string,
    limit?: number,
    skip?: number,
    sort?: 'ASC' | 'DESC'
  ): Promise<Origen[]> {
    try {
      const response = await axiosInstance.get('/origins', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        params: {
          limit: limit || 10, // Por defecto, limita a 10 si no se especifica
          skip: skip || 0, // Por defecto, empieza desde 0 si no se especifica
          sort: sort || 'ASC' // Por defecto, orden ascendente si no se especifica
        }
      })

      // Extrae los orígenes del campo response.data
      const origins = response.data?.response?.data || []
      return origins as Origen[]
    } catch (error) {
      console.error('Error fetching origins:', error)
      throw error
    }
  }
}

export default OrigenesService
