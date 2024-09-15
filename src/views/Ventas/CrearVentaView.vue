<template>
    <!-- Uso del ModalLayout -->
    <ModalLayout :show="props.show" title="Horarios" @close="emit('close')">
      <!-- Contenido del modal con el componente HorariosTable -->
      <CrearVenta/>
    </ModalLayout>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import CrearVenta from '@/components/Ventas/CrearVenta.vue';
  import ModalLayout from '@/layouts/ModalLayout.vue'
  interface Props {
    show: boolean
    activityId: string
  }
  
  const emit = defineEmits(['close', 'departure-created'])
  const props = defineProps<Props>()
  
  function handleDepartureCreeated() {
    emit('departure-created')
  }
  </script>
  