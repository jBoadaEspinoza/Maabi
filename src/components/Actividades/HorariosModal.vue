<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-slate-600 bg-opacity-75 flex items-center justify-center"
    @click="handleBackgroundClick"
  >
    <div
      class="bg-white dark:bg-boxdark p-5 rounded-lg w-203 max-h-[60vh] overflow-y-auto"
      @click.stop
    >
      <div class="flex items-center mb-4">
        <h3 class="text-xl font-semibold text-black dark:text-white">Horarios</h3>
        <button class="ml-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        
        @click="openNewHorarioModal"

        >
          Nuevo Horario
        </button>
      </div>
      <div class="max-w-full overflow-x-auto">
        <table class="w-full table-auto shadow-xl">
          <thead>
            <tr class="bg-gray-2 text-left dark:bg-meta-4">
              <th class="py-4 px-4 font-medium text-black dark:text-white">#</th>
              <th class="py-4 px-4 font-medium text-black dark:text-white">Tiempo</th>
              <th class="py-4 px-4 font-medium text-black dark:text-white">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(horario, index) in horarios" :key="horario.id">
              <td class="py-5 px-4">{{ index + 1 }}</td>
              <td class="py-5 px-4 text-black dark:text-white">{{ horario.time }}</td>
              <td class="py-5 px-4">
                <span
                  class="text-sm py-1 px-2 rounded-md inline-block"
                  :class="{
                    'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-200':
                      horario.active,
                    'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-200': !horario.active
                  }"
                >
                  {{ horario.active ? 'Active' : 'Inactive' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        class="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90"
        @click="$emit('close')"
      >
        Cerrar
      </button>
    </div>

     <!-- NewHorarioModal -->
     <CrearHorarios
      :show="isNewHorarioModalOpen"
      :activityId="props.activityId"
      @close="isNewHorarioModalOpen = false"
    />

  </div>
</template>

<script setup lang="ts">
import type { Horario } from '@/types/Horario'
import CrearHorarios from '../Horarios/CrearHorarios.vue';
import { ref } from 'vue';
interface Props {
  show: boolean
  horarios: Horario[]
  activityId: string
}

const emit = defineEmits(['close'])
const props = defineProps<Props>()

// State to control the visibility of the NewHorarioModal
const isNewHorarioModalOpen = ref(false)

// Function to open the new horario modal
function openNewHorarioModal() {
  isNewHorarioModalOpen.value = true
}


console.log(props.activityId)


function editHorario(id: string) {
  console.log('Edit horario with id:', id)
}

function deleteHorario(id: string) {
  console.log('Delete horario with id:', id)
}

function handleBackgroundClick() {
  emit('close')
}
</script>
