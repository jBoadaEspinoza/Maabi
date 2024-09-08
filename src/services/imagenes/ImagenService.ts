import axiosInstance from '../axiosInstance'

class ImagenService {
  /**
   * Inserta una imagen en la galería asociada a un establecimiento.
   * @param token - Token de autorización Bearer.
   * @param imageUrl - URL de la imagen (Requerido).
   * @param caption - Texto breve asignado a la imagen (opcional).
   * @returns - Promesa que se resuelve con la respuesta del servidor.
   */
  static async addImageToGallery(
    token: string,
    imageUrl: string,
    caption?: string
  ): Promise<any> {
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
}

export default ImagenService
