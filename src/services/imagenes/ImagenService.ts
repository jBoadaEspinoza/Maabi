import axiosInstance from '../axiosInstance'
import type { Image } from '@/types/Image'
class ImagenService {
  /**
   * Inserta una imagen en la galería asociada a un establecimiento.
   * @param token - Token de autorización Bearer.
   * @param imageUrl - URL de la imagen (Requerido).
   * @param caption - Texto breve asignado a la imagen (opcional).
   * @returns - Promesa que se resuelve con la respuesta del servidor.
   */
  static async addImageToGallery(token: string, imageUrl: string, caption?: string): Promise<any> {
    try {
      const response = await axiosInstance.post(
        '/images',
        {
          url: imageUrl,
          caption: caption || ''
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      // Retorna la respuesta completa o los datos según lo necesites
      return response.data
    } catch (error) {
      console.error('Error adding image to gallery:', error)
      throw error
    }
  }

  /**
   * Elimina una lista de imágenes asociadas a una actividad turística.
   * @param token - Token de autorización Bearer.
   * @param activityId - ID de la actividad turística a la cual están asociadas las imágenes.
   * @param imageIds - Array con los IDs de las imágenes a eliminar (Requerido).
   * @returns - Promesa que se resuelve con la respuesta del servidor.
   */
  static async deleteImagesFromActivity(
    token: string,
    activityId: string,
    imageIds: string[]
  ): Promise<any> {
    try {
      const response = await axiosInstance.post(
        `/activities/${activityId}/deleteImages`, // URL con el ID de la actividad
        { images: imageIds }, // Payload con el array de IDs de imágenes
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      // Retorna los datos de la respuesta del servidor
      return response.data
    } catch (error) {
      console.error('Error deleting images from activity:', error)
      throw error
    }
  }

/**
 * Obtiene la lista de todas las imágenes disponibles.
 * @param token - Token de autorización Bearer.
 * @param limit - Limita la cantidad de imágenes retornadas (opcional).
 * @param skip - Número de imágenes a saltar (opcional).
 * @param sort - Especifica el orden de los resultados (opcional).
 * @returns - Promesa que se resuelve con la respuesta del servidor, incluyendo la lista de imágenes.
 */
static async getImages(
  token: string,
  limit?: number,
  skip?: number,
  sort?: 'ASC' | 'DESC'
): Promise<any> {
  try {
    const response = await axiosInstance.get('/images', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      params: {
        limit: limit || 50, // Por defecto, limita a 10 si no se especifica
        skip: skip || 0, // Por defecto, empieza desde 0 si no se especifica
        sort: sort || 'ASC' // Por defecto, orden ascendente si no se especifica
      }
    })

    // Retorna la respuesta completa o los datos según lo necesites
    return response.data
  } catch (error) {
    console.error('Error getting images:', error)
    throw error
  }
}

  static async getImagesByActivity(token: string, activityId: string): Promise<Image[]> {
    try {
      const response = await axiosInstance.get(`/images/activity/${activityId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      //console.log(response)
      // Asumimos que el servidor devuelve un array de imágenes que coinciden con la interfaz Image
      return response.data.data as Image[]
    } catch (error) {
      console.error('Error getting images by activity:', error)
      throw error
    }
  }

  /**
   * Elimina una imagen de la galería según su ID.
   * @param token - Token de autorización Bearer.
   * @param imageId - ID de la imagen a eliminar (Requerido).
   * @returns - Promesa que se resuelve con la respuesta del servidor.
   */
  static async eliminarImagenDeGaleria(token: string, imageId: string): Promise<any> {
    try {
      const response = await axiosInstance.post(
        `/images/${imageId}/delete`, // Endpoint con el ID de la imagen
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      // Retorna los datos de la respuesta del servidor
      return response.data
    } catch (error) {
      console.error('Error eliminando la imagen de la galería:', error)
      throw error
    }
  }
}

export default ImagenService
