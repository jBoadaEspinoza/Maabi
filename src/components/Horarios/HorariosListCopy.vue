<template>
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
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
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
              @click="openDeleteModal(horario.id)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
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

    <ConfirmDeleteHorarioModal
      :isOpen="isModalOpen"
      @cancel="handleModalCancel"
      @confirm="handleModalConfirm"
    />
  </div>






  





</template>

<script setup lang="ts">
import DataTableNew from '../DataTable/DataTableNew.vue'
import ConfirmDeleteHorarioModal from './ConfirmDeleteHorarioModal.vue'
import type { Horario } from '@/types/Horario'
import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth/authStore'
import HorariosService from '@/services/horarios/HorariosService'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

interface Props {
  activityId: string
}


const props = defineProps<Props>()
const horarios = ref<Horario[]>([])
const isModalOpen = ref(false)
const horarioToDelete = ref<string | null>(null)



const rowsPerPage = ref(5);

const totalItems = computed(() => horarios.value.length);

// Function to fetch horarios
async function fetchHorarios() {
  try {
    const token = useAuthStore().getToken
    const fetchedHorarios = await HorariosService.getAllDepartures(
      token,
      10,
      undefined,
      undefined,
      props.activityId,
      true
    )
    horarios.value = fetchedHorarios
  } catch (error) {
    console.error('Error fetching horarios:', error)
    toast.error('Error al cargar los horarios.')
  }
}

// Open the delete confirmation modal
function openDeleteModal(id: string) {
  horarioToDelete.value = id
  isModalOpen.value = true
}

// Handle modal cancellation
function handleModalCancel() {
  isModalOpen.value = false
  horarioToDelete.value = null
}

// Handle modal confirmation
async function handleModalConfirm() {
  if (horarioToDelete.value) {
    try {
      const token = useAuthStore().getToken
      await HorariosService.deleteDeparture(token, horarioToDelete.value)
      toast.success('Horario eliminado exitosamente!')
      fetchHorarios() // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting horario:', error)
      toast.error('Error al eliminar el horario.')
    }
    isModalOpen.value = false
    horarioToDelete.value = null
  }
}

// Fetch horarios when the component is mounted
onMounted(() => {
  fetchHorarios()
})
console.log(props.activityId)
</script>
