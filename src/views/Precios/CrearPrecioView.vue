<template>
    <!-- Uso del ModalLayout -->
    <ModalLayout :show="props.show" title="Horarios" @close="emit('close')"  >
      <!-- Contenido del modal con el componente HorariosTable -->
      <Crearprecios :activityId="props.activityId" @price-created="handlePriceCreeated"
      />
    </ModalLayout>
  </template>
  
  <script setup lang="ts">
  import ModalLayout from '@/layouts/ModalLayout.vue'
  import Crearprecios from '@/components/Precios/Crearprecios.vue'

  interface Props {
    show: boolean
    activityId: string
  }
  
  const emit = defineEmits(['close', 'price-created']); // Definir los eventos que el componente puede emitir
  const props = defineProps<Props>()
  
  function handlePriceCreeated() {
  emit('price-created')
}
  </script>
  