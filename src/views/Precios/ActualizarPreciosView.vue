<template>
    <!-- Uso del ModalLayout -->
    <ModalLayout :show="props.show" title="Horarios" @close="emit('close')">
      <!-- Contenido del modal con el componente HorariosTable -->
      <ActualizarPrecios :priceId="props.priceId" />
    </ModalLayout>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import ModalLayout from '@/layouts/ModalLayout.vue'
  import ActualizarPrecios from '@/components/Precios/ActualizarPrecios.vue'
  import type { Precio } from '@/types/Precio'

  interface Props {
    show: boolean
    priceId: string
  }
  
  const emit = defineEmits(['close'])
  const props = defineProps<Props>()
  
  // State to control the visibility of the NewHorarioModal
  const isNewHorarioModalOpen = ref(false)
  
  
  </script>
  