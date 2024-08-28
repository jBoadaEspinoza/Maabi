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
              <th class="py-4 px-4 font-medium text-black dark:text-white">Acciones</th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="(horario, index) in horarios" :key="horario.id">
              <td class="py-5 px-4">{{ index + 1 }}</td>
              <td class="py-5 px-4 text-black dark:text-white">{{ horario.time }}</td>
              <td class="py-4 px-4 flex space-x-2">
                <button class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="#ffffff"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    >
                      <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
                      <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3" />
                    </g>
                  </svg>
                </button>
                <!-- Delete Button -->
                <button
                  class="px-3 py-1 bg-red text-white rounded-md hover:bg-red-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#ffffff"
                      d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4zm2 2h6V4H9zM6.074 8l.857 12H17.07l.857-12zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1"
                    />
                  </svg>
                </button>
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
