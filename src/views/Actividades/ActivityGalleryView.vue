<template>
  <!-- Uso del ModalLayout -->
  <GalleryModalLayout :show="props.show"  @close="emit('close')">
    <!-- Contenido del modal con el componente HorariosTable -->
    <ActivityGallery  :activityId="props.activityId"/>
  </GalleryModalLayout>
</template>

<script setup lang="ts">
import ModalLayout from '@/layouts/ModalLayout.vue'
import ActivityGallery from '@/components/Imagenes/ActivityGallery.vue'
import GalleryModalLayout from '@/layouts/GalleryModalLayout.vue';
interface Props {
  show: boolean,
  activityId: string,
}

const emit = defineEmits(['close', 'price-created']) // Definir los eventos que el componente puede emitir
const props = defineProps<Props>()

function handlePriceCreeated() {
  emit('price-created')
}
</script>
