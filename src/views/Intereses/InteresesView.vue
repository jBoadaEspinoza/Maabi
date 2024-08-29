<template>
  <!-- Uso del ModalLayout -->
  <ModalLayout :show="props.show" title="Horarios" @close="emit('close')">
    <!-- Contenido del modal con el componente Intereses -->
    <InteresesTable :interests="props.interests"/>
  </ModalLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ModalLayout from '@/layouts/ModalLayout.vue'
import InteresesTable from '@/components/Intereses/InteresesTable.vue'
import type { Interes } from '@/types/Interes'
interface Props {
  show: boolean;
  interests: Interes[];
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
