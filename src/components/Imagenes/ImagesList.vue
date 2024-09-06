<template>
  <div class="flex items-center mb-4">
    <h3 class="text-xl font-semibold text-black dark:text-white">Imagenes</h3>
  </div>

  <div class="max-w-full overflow-x-autov bg-gray-2 p-4">
    <!-- Main Image Slider -->
    <Carousel
      id="gallery"
      :items-to-show="1"
      v-model="currentSlide"
      :wrap-around="false"
      class="mb-4"
    >
      <Slide v-for="(image, index) in images" :key="index">
        <div class="carousel__item">
          <img
            :src="image.url"
            :alt="'Image ' + index"
            class="w-full h-[200px] object-cover rounded-md"
          />
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
        <div class="carousel__item" @click="slideTo(index)">
          <img
            :src="image.url"
            :alt="'Thumbnail ' + index"
            class="w-30 h-24 object-cover rounded-md"
          />
        </div>
      </Slide>
    </Carousel>
  </div>
</template>
<script setup lang="ts">
import type { Image } from '@/types/Image'
import { ref, onMounted } from 'vue'
import Galleria from 'primevue/galleria'
import { Carousel, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

interface Props {
  activityId: string
  images: Image[]
}

const props = defineProps<Props>()

// Estado para el carrusel y lightbox
const currentSlide = ref(0)

// Estado para controlar el Lightbox
const isLightboxOpen = ref(false)
const selectedImage = ref<string | null>(null)

const openLightbox = (imageUrl: string) => {
  selectedImage.value = imageUrl
  isLightboxOpen.value = true
}

const editImage = (imageId: string) => {
  console.log('Edit image with ID:', imageId)
}

const openDeleteModal = (imageId: string) => {
  console.log('Open delete modal for image with ID:', imageId)
}
// Función para cambiar de imagen en el carrusel principal
const slideTo = (index: number) => {
  currentSlide.value = index
}

const responsiveOptions = ref([
  {
    breakpoint: '1300px',
    numVisible: 4
  },
  {
    breakpoint: '200px',
    numVisible: 1
  }
])
onMounted(() => {
  // Aquí puedes poner cualquier lógica que quieras que se ejecute al montar el componente
})
</script>
