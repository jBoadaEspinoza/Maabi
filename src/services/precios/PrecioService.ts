import type { Precio } from '@/types/Precio'
import axiosInstance from '../axiosInstance'
import type { TipoPrecio } from '@/types/TipoPrecio'

class PrecioService {
  /**
   * Obtiene la lista de precios para una actividad turística específica.
   * @param token - Token de autorización Bearer.
   * @param activityId - ID de la actividad turística (obligatorio).
   * @returns - Promesa que se resuelve con la lista de precios.
   */
  static async getAllPrices(token: string, activityId: string): Promise<Precio[]> {
    try {
      const response = await axiosInstance.get('/prices', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        params: {
          a_id: activityId // ID de la actividad turística (obligatorio)
        }
      })

      // Extrae los precios del campo response.data
      const prices = response.data?.response?.data || []
      return prices as Precio[]
    } catch (error) {
      console.error('Error fetching prices:', error)
      throw error
    }
  }

  /**
   * Obtiene la lista de tipos de precios disponibles.
   * @param token - Token de autorización Bearer.
   * @returns - Promesa que se resuelve con la lista de tipos de precios.
   */
  static async getAllPriceTypes(token: string): Promise<TipoPrecio[]> {
    try {
      const response = await axiosInstance.get('/price-types', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      // Extrae los tipos de precios del campo response.data
      const priceTypes = response.data?.response?.data || []
      return priceTypes as TipoPrecio[]
    } catch (error) {
      console.error('Error fetching price types:', error)
      throw error
    }
  }

  /**
   * Crea un nuevo precio para una actividad turística.
   * @param token - Token de autorización Bearer.
   * @param amount - Monto del precio (obligatorio).
   * @param activityId - ID de la actividad turística (obligatorio).
   * @param typeId - Tipo de precio (obligatorio).
   * @param currency - Tipo de moneda (obligatorio, por defecto USD).
   * @returns - Promesa que se resuelve con los datos del precio creado.
   */
  static async createPrice(
    token: string,
    amount: number,
    activityId: string,
    typeId: number = 1,
    currency: string = 'USD'
  ): Promise<any> {
    try {
      const response = await axiosInstance.post(
        '/prices',
        {
          amount,
          activity_id: activityId,
          type_id: typeId,
          currency
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      // Retorna los datos del precio creado
      return response
    } catch (error) {
      console.error('Error creating price:', error)
      throw error
    }
  }

  /**
   * Actualiza el monto y la moneda de un precio.
   * @param token - Token de autorización Bearer.
   * @param id - ID del precio a actualizar (obligatorio).
   * @param amount - Nuevo monto del precio (obligatorio).
   * @param currency - Nueva moneda del precio (obligatorio, por defecto USD).
   * @returns - Promesa que se resuelve con la respuesta del servidor.
   */
  static async updateAmountAndCurrency(
    token: string,
    id: string,
    amount: number,
    currency: string = 'USD'
  ): Promise<any> {
    try {
      const response = await axiosInstance.post(
        `/prices/${id}/updateAmountAndCurrency`,
        {
          amount,
          currency
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      // Retorna la respuesta del servidor
      return response
    } catch (error) {
      console.error('Error updating price amount and currency:', error)
      throw error
    }
  }
}

export default PrecioService
