<template>
  <!-- Modal principal -->
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

  <!-- Modal de confirmación -->
  <ConfirmSaveModal
    :isOpen="showConfirmSaveModal"
    @cancel="handleCancelConfirm"
    @confirm="handleConfirmSave"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ActivityGallery from '@/components/Imagenes/ActivityGallery.vue'
import GalleryModalLayout from '@/layouts/GalleryModalLayout.vue'
import ConfirmSaveModal from '@/components/Imagenes/ConfirmSaveModal.vue'

import type { Image } from '@/types/Image'
import { useAuthStore } from '@/stores/auth/authStore'
import ActividadesService from '@/services/actividades/ActividadesService'

interface Props {
  show: boolean
  activityId: string
  images: Image[]
}

const emit = defineEmits(['close', 'update-images'])
const props = defineProps<Props>()

const showConfirmSaveModal = ref(false)
const selectedImagesList = ref<string[]>([])
const deselectedImagesList = ref<string[]>([])

// Obtén el token del authStore
const authStore = useAuthStore()

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

// Función para manejar el cierre del modal principal
function handleClose() {
  showConfirmSaveModal.value = true
}

// Función para manejar la cancelación en el modal de confirmación
function handleCancelConfirm() {
  showConfirmSaveModal.value = false
  emit('close')

  console.log("Cancelado: El modal de confirmación se cerró")
}

// Función para manejar la confirmación en el modal de confirmación
async function handleConfirmSave() {
  try {
    showConfirmSaveModal.value = false
    console.log("Confirmado: Guardar cambios y cerrar el modal principal")

    const token = authStore.getToken
    const imageIdsToAdd = selectedImagesList.value
    const imageIdsToDelete = deselectedImagesList.value

    // Llamar al servicio para agregar imágenes a la actividad
    const addResponse = await ActividadesService.addImagesToActivity(token, props.activityId, imageIdsToAdd)
    console.log("Respuesta del servicio para agregar imágenes:", addResponse)

    // Llamar al servicio para eliminar imágenes de la actividad
    const deleteResponse = await ActividadesService.deleteImagesFromActivity(token, props.activityId, imageIdsToDelete)
    console.log("Respuesta del servicio para eliminar imágenes:", deleteResponse)

    // Emitir el evento de cierre del modal principal
    emit('update-images')  // Emitir evento para actualizar la lista de imágenes

    emit('close')
  } catch (error) {
    console.error("Error al guardar y eliminar imágenes:", error)
    // Manejar el error si es necesario
  }
}
</script>
