<template>
  <!-- Uso del ModalLayout -->
  <ModalLayout :show="props.show" title="Horarios" @close="emit('close')">
    <!-- Contenido del modal con el componente HorariosTable -->
    <ActualizarPrecios :priceId="props.priceId" @price-updated="handlePriceUpdated" />
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

const emit = defineEmits(['close', 'price-updated']) // Add 'price-updated' emit
const props = defineProps<Props>()

// State to control the visibility of the NewHorarioModal
const isNewHorarioModalOpen = ref(false)

function handlePriceUpdated() {
  emit('price-updated')
}
</script>
