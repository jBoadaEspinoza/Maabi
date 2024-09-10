<template>
  <div class="flex items-center mb-4">
    <h3 class="text-xl font-semibold text-black dark:text-white">Imagenes</h3>
    <!-- Botón que abre el modal -->
    <button
      class="bg-blue-500 ml-4 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      @click="openGalleryModal"
    >
      Agregar Imagen
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
      <Slide v-for="(image, index) in images" :key="index">
        <div class="carousel__item relative">
          <!-- Imagen principal -->
          <img
            :src="image.url"
            :alt="'Image ' + index"
            class="w-full h-[200px] object-cover rounded-md"
          />

          <!-- Botón de borrar en la esquina superior derecha -->
       

          <button
            @click="deleteImage(image.id)"
            class="absolute top-2 right-2 bg-red text-white p-1 rounded-lg shadow-md hover:bg-red-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 56 56">
              <path fill="#ffffff" d="m44.524 48.66l1.617-34.265h2.343c.961 0 1.735-.797 1.735-1.758s-.774-1.782-1.735-1.782H38.242V7.34c0-3.352-2.273-5.531-5.882-5.531h-8.766c-3.61 0-5.86 2.18-5.86 5.53v3.516H7.54c-.937 0-1.758.82-1.758 1.782c0 .96.82 1.758 1.758 1.758h2.344L11.5 48.684c.164 3.375 2.39 5.507 5.766 5.507h21.492c3.351 0 5.601-2.156 5.765-5.53M21.484 7.574c0-1.336.985-2.273 2.391-2.273h8.227c1.43 0 2.414.937 2.414 2.273v3.281H21.484Zm-3.867 43.102c-1.36 0-2.367-1.032-2.437-2.39l-1.64-33.891h28.85l-1.546 33.89c-.07 1.383-1.055 2.39-2.438 2.39Zm17.344-4.125c.773 0 1.36-.633 1.383-1.524l.703-24.75c.023-.89-.586-1.547-1.383-1.547c-.726 0-1.336.68-1.36 1.524l-.702 24.773c-.024.844.562 1.524 1.359 1.524m-13.898 0c.797 0 1.382-.68 1.359-1.524l-.703-24.773c-.024-.844-.656-1.524-1.383-1.524c-.797 0-1.383.657-1.36 1.547l.727 24.75c.024.891.586 1.524 1.36 1.524m8.367-1.524V20.254c0-.844-.633-1.524-1.407-1.524c-.773 0-1.43.68-1.43 1.524v24.773c0 .844.657 1.524 1.43 1.524c.75 0 1.407-.68 1.407-1.524"/>
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
      <Slide v-for="(image, index) in images" :key="index">
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

  <!-- Modal de confirmación para eliminar una actividad -->
  <ActivityGalleryView :activityId="props.activityId" :show="isGalleryModalOpen" @close="closeGalleryModal" />
</template>

<script setup lang="ts">
import type { Image } from '@/types/Image'
import { ref, onMounted } from 'vue'
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import ActivityGalleryView from '@/views/Actividades/ActivityGalleryView.vue'

// Props
interface Props {
  activityId: string
  images: Image[]
}
const props = defineProps<Props>()

// Estado para el carrusel y modal
const currentSlide = ref(0)
const isGalleryModalOpen = ref(false) // Estado para abrir/cerrar el modal

// Función para abrir el modal de la galería
const openGalleryModal = () => {
  isGalleryModalOpen.value = true
}

// Función para cerrar el modal
const closeGalleryModal = () => {
  isGalleryModalOpen.value = false
}

// Función para borrar una imagen
const deleteImage = (imageId: string) => {
  console.log('Borrar imagen con ID:', imageId)
  // Lógica para eliminar la imagen del servidor o backend
}

const slideTo = (index: number) => {
  currentSlide.value = index
}

onMounted(() => {
  // Cualquier lógica que necesites al montar el componente
})
</script>

<style scoped>
/* Estilos personalizados */
</style>
