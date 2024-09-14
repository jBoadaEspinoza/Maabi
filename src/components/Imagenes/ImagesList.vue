<template>
  <div class="flex flex-col items-start mb-4">
    <h3 class="text-xl font-semibold text-black dark:text-white">
      Imágenes - {{ props.activityTitle.toUpperCase() }}
    </h3>
    <!-- Botón que abre el modal -->
    <button
      class="bg-blue-500 mt-2 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center space-x-2"
      @click="openGalleryModal"
    >
      <span>Agregar Imagen</span>

      <!-- Ícono SVG dentro del botón -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="white"
      >
        <g fill-rule="evenodd" clip-rule="evenodd">
          <path
            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12m10-8a8 8 0 1 0 0 16 8 8 0 0 0 0-16"
          />
          <path
            d="M13 7a1 1 0 1 0-2 0v4H7a1 1 0 1 0 0 2h4v4a1 1 0 1 0 2 0v-4h4a1 1 0 1 0 0-2h-4V7z"
          />
        </g>
      </svg>
    </button>
  </div>

  <div class="max-w-full overflow-x-auto bg-gray-2 p-4">
    <!-- Main Image Slider -->
    <Carousel
      id="gallery"
      :items-to-show="1"
      v-model="currentSlide"
      :wrap-around="false"
      class="mb-4"
    >
      <Slide v-for="(image, index) in images2" :key="index">
        <div class="carousel__item relative">
          <!-- Imagen principal -->
          <img
            :src="image.url"
            :alt="'Image ' + index"
            class="w-full h-[200px] object-cover rounded-md"
          />

          <!-- Botón de borrar en la esquina superior derecha -->
          <button
            @click="openDeleteModal(image.id)"
            class="absolute top-2 right-2 bg-red text-white p-1 rounded-lg shadow-md hover:bg-red-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 56 56">
              <path
                fill="#ffffff"
                d="m44.524 48.66l1.617-34.265h2.343c.961 0 1.735-.797 1.735-1.758s-.774-1.782-1.735-1.782H38.242V7.34c0-3.352-2.273-5.531-5.882-5.531h-8.766c-3.61 0-5.86 2.18-5.86 5.53v3.516H7.54c-.937 0-1.758.82-1.758 1.782c0 .96.82 1.758 1.758 1.758h2.344L11.5 48.684c.164 3.375 2.39 5.507 5.766 5.507h21.492c3.351 0 5.601-2.156 5.765-5.53M21.484 7.574c0-1.336.985-2.273 2.391-2.273h8.227c1.43 0 2.414.937 2.414 2.273v3.281H21.484Zm-3.867 43.102c-1.36 0-2.367-1.032-2.437-2.39l-1.64-33.891h28.85l-1.546 33.89c-.07 1.383-1.055 2.39-2.438 2.39Zm17.344-4.125c.773 0 1.36-.633 1.383-1.524l.703-24.75c.023-.89-.586-1.547-1.383-1.547c-.726 0-1.336.68-1.36 1.524l-.702 24.773c-.024.844.562 1.524 1.359 1.524m-13.898 0c.797 0 1.382-.68 1.359-1.524l-.703-24.773c-.024-.844-.656-1.524-1.383-1.524c-.797 0-1.383.657-1.36 1.547l.727 24.75c.024.891.586 1.524 1.36 1.524m8.367-1.524V20.254c0-.844-.633-1.524-1.407-1.524c-.773 0-1.43.68-1.43 1.524v24.773c0 .844.657 1.524 1.43 1.524c.75 0 1.407-.68 1.407-1.524"
              />
            </svg>
          </button>
        </div>
      </Slide>
    </Carousel>

    <!-- Thumbnails Slider -->
    <Carousel
      id="thumbnails"
      :items-to-show="4"
      :wrap-around="true"
      v-model="currentSlide"
      ref="thumbnailCarousel"
    >
      <Slide v-for="(image, index) in images2" :key="index">
        <div class="carousel__item relative" @click="slideTo(index)">
          <img
            :src="image.url"
            :alt="'Thumbnail ' + index"
            class="w-30 h-24 object-cover rounded-md"
          />
        </div>
      </Slide>
    </Carousel>
  </div>


  <!-- Galería de imágenes en formato grid -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
    <div v-for="(image, index) in images2" :key="index" class="grid gap-2">
      <div class="relative">
        <img
          :src="image.url"
          :alt="'Image ' + index"
          class="h-auto w-[200px] max-w-full object-cover"
        />
        <!-- Botón de borrar en la esquina superior derecha -->
        <button
          @click="openDeleteModal(image.id)"
          class="absolute top-2 right-2 bg-red text-white p-1 rounded-lg shadow-md hover:bg-red-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 56 56">
            <path
              fill="#ffffff"
              d="m44.524 48.66l1.617-34.265h2.343c.961 0 1.735-.797 1.735-1.758s-.774-1.782-1.735-1.782H38.242V7.34c0-3.352-2.273-5.531-5.882-5.531h-8.766c-3.61 0-5.86 2.18-5.86 5.53v3.516H7.54c-.937 0-1.758.82-1.758 1.782c0 .96.82 1.758 1.758 1.758h2.344L11.5 48.684c.164 3.375 2.39 5.507 5.766 5.507h21.492c3.351 0 5.601-2.156 5.765-5.53M21.484 7.574c0-1.336.985-2.273 2.391-2.273h8.227c1.43 0 2.414.937 2.414 2.273v3.281H21.484Zm-3.867 43.102c-1.36 0-2.367-1.032-2.437-2.39l-1.64-33.891h28.85l-1.546 33.89c-.07 1.383-1.055 2.39-2.438 2.39Zm17.344-4.125c.773 0 1.36-.633 1.383-1.524l.703-24.75c.023-.89-.586-1.547-1.383-1.547c-.726 0-1.336.68-1.36 1.524l-.702 24.773c-.024.844.562 1.524 1.359 1.524m-13.898 0c.797 0 1.382-.68 1.359-1.524l-.703-24.773c-.024-.844-.656-1.524-1.383-1.524c-.797 0-1.383.657-1.36 1.547l.727 24.75c.024.891.586 1.524 1.36 1.524m8.367-1.524V20.254c0-.844-.633-1.524-1.407-1.524c-.773 0-1.43.68-1.43 1.524v24.773c0 .844.657 1.524 1.43 1.524c.75 0 1.407-.68 1.407-1.524"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>


  <!-- Modal de confirmación para eliminar una actividad -->
  <ConfirmDeleteModal
    :isOpen="isDeleteModalOpen"
    @confirm="confirmDeleteImage"
    @cancel="cancelDeleteImage"
  />

  <ActivityGalleryView
    :images="props.images"
    :activityId="props.activityId"
    :show="isGalleryModalOpen"
    @update-images="loadImages"
    @close="closeGalleryModal"
  />
</template>

<script setup lang="ts">
import type { Image } from '@/types/Image'
import { ref, onMounted } from 'vue'
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import ActivityGalleryView from '@/views/Actividades/ActivityGalleryView.vue'
import ActividadesService from '@/services/actividades/ActividadesService'
import { useAuthStore } from '@/stores/auth/authStore'
import Swal from 'sweetalert2'
import ImagenService from '@/services/imagenes/ImagenService'
import ConfirmDeleteModal from './ConfirmDeleteModal.vue'
// Props
interface Props {
  activityId: string
  images: Image[]
  activityTitle: string
}
const props = defineProps<Props>()
const authStore = useAuthStore()

// Estado para el carrusel y modal
const currentSlide = ref(0)
const isGalleryModalOpen = ref(false) // Estado para abrir/cerrar el modal
const isDeleteModalOpen = ref(false) // Estado para el modal de confirmación
const imageIdToDelete = ref<string | null>(null) // ID de la imagen a eliminar

// Función para abrir el modal de la galería
const openGalleryModal = () => {
  isGalleryModalOpen.value = true
}

// Función para cerrar el modal
const closeGalleryModal = () => {
  isGalleryModalOpen.value = false
}

// Función para abrir el modal de confirmación de eliminación
const openDeleteModal = (imageId: string) => {
  imageIdToDelete.value = imageId
  isDeleteModalOpen.value = true
}

// Función para cancelar la eliminación
const cancelDeleteImage = () => {
  isDeleteModalOpen.value = false
  imageIdToDelete.value = null
}

// Función para confirmar y eliminar la imagen
const confirmDeleteImage = async () => {
  if (imageIdToDelete.value) {
    await deleteImage([imageIdToDelete.value])
    isDeleteModalOpen.value = false
    imageIdToDelete.value = null
  }
}

// Función para borrar imágenes
const deleteImage = async (imageIds: string[]) => {
  try {
    const token = authStore.getToken
    const response = await ActividadesService.deleteImagesFromActivity(
      token,
      props.activityId,
      imageIds
    )
    console.log('Imágenes eliminadas con éxito:', response)

    Swal.fire({
      title: '¡Éxito!',
      text: 'Las imágenes han sido eliminadas correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    })

    await loadImages() 
    
  } catch (error) {
    console.error('Error al eliminar las imágenes:', error)
    Swal.fire({
      title: 'Error',
      text: 'Hubo un problema al eliminar las imágenes.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    })
  }
}

const slideTo = (index: number) => {
  currentSlide.value = index
}
const images2 = ref<Image[]>([]) // Almacenará las imágenes asociadas a la actividad

// Función para obtener las imágenes de la actividad
const loadImages = async () => {
  try {
    const token = authStore.getToken
    const response = await ImagenService.getImagesByActivity(token, props.activityId)
    images2.value = response // Asignar las imágenes al estado local
    console.log(response)
  } catch (error) {
    console.error('Error al cargar las imágenes:', error)
  }
}

onMounted(() => {
  loadImages() // Cargar imágenes al montar el componente
})


</script>

<style scoped>
/* Estilos personalizados */
</style>
