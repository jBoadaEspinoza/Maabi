<template>
  <!-- Uso del ModalLayout -->
  <GalleryModalLayout :show="props.show" @close="handleClose">
    <!-- Contenido del modal con el componente ActivityGallery -->
    <ActivityGallery
      :images="props.images"
      :activityId="props.activityId"
      @update-images="emit('update-images')"
      @selected-images="handleSelectedImages"
      @deselected-images="handleDeselectedImages"
    />
  </GalleryModalLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ActivityGallery from '@/components/Imagenes/ActivityGallery.vue'
import GalleryModalLayout from '@/layouts/GalleryModalLayout.vue'
import type { Image } from '@/types/Image'

interface Props {
  show: boolean
  activityId: string
  images: Image[]
}

const emit = defineEmits(['close', 'price-created', 'update-images']) // Definir los eventos que el componente puede emitir
const props = defineProps<Props>()

// Variables reactivas para almacenar las listas de imágenes seleccionadas y no seleccionadas
const selectedImagesList = ref<string[]>([])
const deselectedImagesList = ref<string[]>([])

// Función para manejar el evento de imágenes seleccionadas
function handleSelectedImages(selected: string[]) {
  selectedImagesList.value = selected
  console.log("Imágenes seleccionadas:", selected)
}

// Función para manejar el evento de imágenes no seleccionadas
function handleDeselectedImages(deselected: string[]) {
  deselectedImagesList.value = deselected
  console.log("Imágenes no seleccionadas:", deselected)
}

// Función para manejar el cierre del modal
function handleClose() {
  // Imprimir las listas al cerrar el modal
  console.log("Al cerrar el modal:")
  console.log("Imágenes seleccionadas:", selectedImagesList.value)
  console.log("Imágenes no seleccionadas:", deselectedImagesList.value)
  
  emit('close')  // Emitir el evento de cierre
}

function handlePriceCreated() {
  emit('price-created')
}
</script>
