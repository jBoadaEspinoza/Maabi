<template>
    <!-- Uso del ModalLayout -->
    <ModalLayout :show="props.show" title="Horarios" @close="emit('close')">
      <!-- Contenido del modal con el componente HorariosTable -->
      <Crearprecios :activityId="props.activityId" />
    </ModalLayout>
  </template>
  
  <script setup lang="ts">
  import ModalLayout from '@/layouts/ModalLayout.vue'
  import Crearprecios from '@/components/Precios/Crearprecios.vue'

  interface Props {
    show: boolean
    activityId: string
  }
  
  const emit = defineEmits(['close'])
  const props = defineProps<Props>()
  
  
  </script>
  