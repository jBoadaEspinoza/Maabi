import axiosInstance from '../axiosInstance'

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
   * Elimina una imagen de la galería según su ID.
   * @param token - Token de autorización Bearer.
   * @param imageId - ID de la imagen a eliminar (Requerido).
   * @returns - Promesa que se resuelve con la respuesta del servidor.
   */
  static async deleteImageFromGallery(token: string, imageId: string): Promise<any> {
    try {
      const response = await axiosInstance.post(
        `/images/${imageId}/delete`, // URL con el ID de la imagen
        {}, // Sin payload, solo headers
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
      console.error('Error deleting image from gallery:', error)
      throw error
    }
  }
  

  /**
   * Obtiene la lista de todas las imágenes disponibles.
   * @param token - Token de autorización Bearer.
   * @returns - Promesa que se resuelve con la respuesta del servidor, incluyendo la lista de imágenes.
   */
  static async getImages(token: string): Promise<any> {
    try {
      const response = await axiosInstance.get('/images', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      // Retorna la respuesta completa o los datos según lo necesites
      return response.data
    } catch (error) {
      console.error('Error getting images:', error)
      throw error
    }
  }
}

export default ImagenService
