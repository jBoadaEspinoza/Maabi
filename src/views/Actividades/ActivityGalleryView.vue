<template>
  <!-- Uso del ModalLayout -->
  <GalleryModalLayout :show="props.show" @close="emit('close')">
    <!-- Contenido del modal con el componente HorariosTable -->
    <ActivityGallery :images="props.images" :activityId="props.activityId" @update-images="emit('update-images')"/>
  </GalleryModalLayout>
</template>

<script setup lang="ts">
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

function handlePriceCreeated() {
  emit('price-created')
}
</script>
