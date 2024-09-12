import axiosInstance from '../axiosInstance'
import type { Venta } from '@/types/Venta'
class VentasService {
  /**
   * Obtiene la lista de ventas disponibles con parámetros opcionales.
   * @param token - Token de autorización Bearer.
   * @param limit - Limita la cantidad de ventas retornadas (opcional).
   * @param skip - Número de ventas a saltar (opcional).
   * @param sort - Especifica el orden de los resultados (opcional).
   * @returns - Promesa que se resuelve con la lista de ventas.
   */
  static async getAllSales(
    token: string,
    limit?: number,
    skip?: number,
    sort?: 'ASC' | 'DESC'
  ): Promise<Venta[]> {
    try {
      const response = await axiosInstance.get('/sales', {
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

      // Extrae las ventas del campo response.data
      const sales = response.data?.response?.data || []
      return sales as Venta[]
    } catch (error) {
      console.error('Error fetching sales:', error)
      throw error
    }
  }
}

export default VentasService
