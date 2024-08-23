// src/services/ActivityService.ts
import type { Actividad } from '@/types/Actividad'
import axiosInstance from '../axiosInstance'
import type { TipoActividad } from '@/types/TipoActividad'

class ActividadesService {
  static async getAllActivities(
    token: string,
    limit: number = 10,
    skip: number = 0,
    sort: 'ASC' | 'DESC' = 'ASC',
    active?: boolean
  ): Promise<Actividad[]> {
    try {
      // Construye los parámetros de consulta
      const params: Record<string, any> = {
        limit,
        skip,
        sort
      }
      // Si se especifica el estado activo, agrégalo a los parámetros
      if (active !== undefined) {
        params.active = active
      }

      const response = await axiosInstance.get('/activities', {
        headers: { Authorization: `Bearer ${token}` },
        params // Añade los parámetros de consulta
      })

      // Extrae las actividades del campo response.data
      const activities = response.data?.response?.data || []
      return activities as Actividad[]
    } catch (error) {
      console.error('Error fetching activities:', error)
      throw error
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
          skip: skip || 0, // Por defecto, empieza desde 0 si no se especifica
          sort: sort || 'ASC' // Por defecto, orden ascendente si no se especifica
        }
      })

      // Extrae los tipos de actividades del campo response.data
      const activityTypes = response.data?.response?.data || []
      return activityTypes as TipoActividad[]
    } catch (error) {
      console.error('Error fetching activity types:', error)
      throw error
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
      })

      const activity = response.data?.response?.data || {}
      return activity as Actividad
    } catch (error) {
      console.error('Error creating activity:', error)
      throw error
    }
  }

  static async deleteActivity(token: string, id: string): Promise<void> {
    try {
      await axiosInstance.delete(`/activities/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
  
      console.log(`Activity with ID ${id} has been set to inactive.`);
    } catch (error) {
      console.error('Error deleting activity:', error);
      throw error;
    }
  }

  /**
   * Agrega una lista de intereses a una actividad turística.
   * @param token - Token de autorización Bearer.
   * @param id - ID de la actividad turística.
   * @param interests - Lista de IDs de intereses a agregar.
   * @returns - Promesa que se resuelve cuando los intereses han sido agregados.
   */
  static async addInterestsToActivity(
    token: string,
    id: string,
    interests: string[]
  ): Promise<any> {
    try {
      await axiosInstance.patch(
        `/activities/${id}/addInterests`,
        { interests }, // El cuerpo de la petición
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
    } catch (error) {
      console.error('Error adding interests to activity:', error)
      throw error
    }
  }

  /**
   * Restaura una actividad turística enviándola a un estado activo (active = TRUE).
   * @param token - Token de autorización Bearer.
   * @param id - ID de la actividad turística a restaurar.
   * @returns - Promesa que se resuelve con la actividad restaurada.
   */
  static async restaurarActividad(token: string, id: string): Promise<any> {
    try {
      const response = await axiosInstance.patch(
        `/activities/${id}/restore`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      console.log(response);

      // Extrae la actividad restaurada del campo response.data
      const restoredActivity = response.data?.response?.data || {}
      return restoredActivity as Actividad
    } catch (error) {
      console.error('Error restoring activity:', error)
      throw error
    }
  }
}

export default ActividadesService
