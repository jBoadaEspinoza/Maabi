<template>
  <div class="flex items-center mb-4"></div>
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
            <!-- restore Button -->
            <button
              class="px-3 py-1 bg-red text-white rounded-md hover:bg-red-600"
              @click="openDeleteModal(horario.id)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="#ffffff"
                  d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89l.07.14L9 12H6a7 7 0 0 1 7-7a7 7 0 0 1 7 7a7 7 0 0 1-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.9 8.9 0 0 0 13 21a9 9 0 0 0 9-9a9 9 0 0 0-9-9"
                />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <ConfirmRestoreHorarioModal
      :isOpen="isModalOpen"
      @cancel="handleModalCancel"
      @confirm="handleModalConfirm"
    />
  </div>
</template>

<script setup lang="ts">
import ConfirmRestoreHorarioModal from './ConfirmRestoreHorarioModal.vue'
import type { Horario } from '@/types/Horario'
import { onMounted, ref } from 'vue'
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
      false
    )
    horarios.value = fetchedHorarios
  } catch (error) {
    console.error('Error fetching horarios:', error)
    toast.error('Error al cargar los horarios.')
  }
}

// Function to handle deleting a horario
async function restoreteHorario(id: string) {
  try {
    // Retrieve the token from the auth store
    const token = useAuthStore().getToken

    // Call the service to delete the horario
    const response = await HorariosService.restoreDeparture(token, id)
    console.log(response)
    // Show success toast
    toast.success('Horario restaurado exitosamente!')
  } catch (error) {
    console.error('Error deleting horario:', error)
    // Show error toast
    toast.error('Error al restaurar el horario.')
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
      const token = useAuthStore().getToken;
      await HorariosService.restoreDeparture(token, horarioToDelete.value);
      toast.success('Horario eliminado exitosamente!');
      fetchHorarios(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting horario:', error);
      toast.error('Error al eliminar el horario.');
    }
    isModalOpen.value = false;
    horarioToDelete.value = null;
  }
}

// Fetch horarios when the component is mounted
onMounted(() => {
  fetchHorarios()
})
console.log(props.activityId)
</script>
