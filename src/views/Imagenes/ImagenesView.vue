<template>
  <!-- Uso del ModalLayout -->
  <ModalLayout :show="props.show" title="Imagenes" @close="emit('close')">
    <!-- Contenido del modal con el componente HorariosTable -->
    <ImagesList :activityId="props.activityId" :images="props.images"/>
  </ModalLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ImagesList from '@/components/Imagenes/ImagesList.vue'
import ModalLayout from '@/layouts/ModalLayout.vue'
import type { Image } from '@/types/Image'
interface Props {
  show: boolean
  activityId: string
  images: Image[]
}

const emit = defineEmits(['close'])
const props = defineProps<Props>()

// State to control the visibility of the NewHorarioModal
const isNewHorarioModalOpen = ref(false)

// Function to open the new horario modal
function openNewHorarioModal() {
  isNewHorarioModalOpen.value = true
}

function editHorario(id: string) {
  console.log('Edit horario with id:', id)
}

function deleteHorario(id: string) {
  console.log('Delete horario with id:', id)
}
</script>
