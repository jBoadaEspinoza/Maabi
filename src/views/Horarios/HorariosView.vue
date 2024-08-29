<template>
    <!-- Uso del ModalLayout -->
    <ModalLayout
      :show="props.show"
      title="Horarios"
      @close="emit('close')"
    >
      
      <!-- Contenido del modal con el componente HorariosTable -->
      <HorariosTable :activityId="props.activityId" />
  

    </ModalLayout>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import type { Horario } from '@/types/Horario';
  import HorariosTable from '@/components/Horarios/HorariosTable.vue';
  import ModalLayout from '@/layouts/ModalLayout.vue';
  interface Props {
    show: boolean;
    activityId: string;
  }
  
  const emit = defineEmits(['close']);
  const props = defineProps<Props>();
  
  // State to control the visibility of the NewHorarioModal
  const isNewHorarioModalOpen = ref(false);
  
  // Function to open the new horario modal
  function openNewHorarioModal() {
    isNewHorarioModalOpen.value = true;
  }
  
  function editHorario(id: string) {
    console.log('Edit horario with id:', id);
  }
  
  function deleteHorario(id: string) {
    console.log('Delete horario with id:', id);
  }
  </script>
  