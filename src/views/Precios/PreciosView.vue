<template>
  <!-- Uso del ModalLayout -->
  <ModalLayout :show="props.show" title="Horarios" @close="emit('close')">
    <!-- Contenido del modal con el componente HorariosTable -->
    <PreciosTable :activityId="props.activityId" :actividadTitle="props.actividadTitle"/>
  </ModalLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Horario } from '@/types/Horario'
import ModalLayout from '@/layouts/ModalLayout.vue'
import PreciosTable from '@/components/Precios/PreciosTable.vue'
import type { Precio } from '@/types/Precio'
interface Props {
  show: boolean
  activityId: string
  actividadTitle: string

}

const emit = defineEmits(['close'])
const props = defineProps<Props>()

// State to control the visibility of the NewHorarioModal
const isNewHorarioModalOpen = ref(false)


</script>
