<template>
    <!-- Uso del ModalLayout -->
    <ModalLayout
      :show="props.show"
      title="Horarios"
      @close="emit('close')"
    >
      
      <!-- Contenido del modal con el componente HorariosTable -->
      <CrearHorarios :activityId="props.activityId" />
  

    </ModalLayout>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import CrearHorarios from '@/components/Horarios/CrearHorarios.vue';
  import ModalLayout from '@/layouts/ModalLayout.vue';
  interface Props {
    show: boolean;
    activityId: string;
  }
  
  const emit = defineEmits(['close']);
  const props = defineProps<Props>();
  

  </script>
  