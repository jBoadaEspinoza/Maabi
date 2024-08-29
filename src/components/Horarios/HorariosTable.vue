<template>
  <div class="flex items-center mb-4">
    <h3 class="text-xl font-semibold text-black dark:text-white">Horarios</h3>

    <div class="flex space-x-2 ml-4">
      <!-- Primer botón -->
      <button
        v-if="!showPapelera"
        class="inline-flex items-center justify-center rounded-md bg-primary py-2 px-4 text-sm font-medium text-white hover:bg-opacity-90"
        @click="openNewHorarioModal"
      >
        Nueva Horario

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="22.857142857142858"
          viewBox="0 0 896 1024"
          class="ml-2"
        >
          <path
            fill="#ffffff"
            d="M831.973 1024h-767q-27 0-45.5-18.5T.973 960V65q0-26 19-45t45-19h448v352q0 13 9 22.5t23 9.5h351v574q0 27-18.5 45.5t-45.5 18.5zm-255-384h-128V512q0-26-19-44.5t-45.5-18.5t-45 18.5t-18.5 44.5v128h-128q-27 0-45.5 19t-18.5 45t18.5 44.5t45.5 18.5h128v128q0 27 18.5 45.5t45 18.5t45.5-18.5t19-45.5V767h128q26 0 45-18.5t19-44.5t-19-45t-45-19m0-640q21 0 44 19l256 257q19 19 19 46h-319z"
          />
        </svg>
      </button>

      <!-- Botón para alternar entre Papelera y Lista de Actividades -->
      <button
        :class="[
          'inline-flex items-center justify-center rounded-md py-2 px-4 text-sm font-medium text-white',
          showPapelera ? 'bg-blue-800 hover:bg-blue-600' : 'bg-red hover:bg-rose-400'
        ]"
        @click="toggleView"
      >
        <svg
          v-if="showPapelera"
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          class="mr-2"
          viewBox="0 0 256 256"
        >
          <path
            fill="#ffffff"
            d="M128 20a108 108 0 1 0 108 108A108.12 108.12 0 0 0 128 20m0 192a84 84 0 1 1 84-84a84.09 84.09 0 0 1-84 84m52-84a12 12 0 0 1-12 12h-51l11.52 11.51a12 12 0 0 1-17 17l-32-32a12 12 0 0 1 0-17l32-32a12 12 0 0 1 17 17L117 116h51a12 12 0 0 1 12 12"
          />
        </svg>

        {{ showPapelera ? 'Retornar a horarios ' : 'Papelera' }}

        <!-- SVG para "Papelera" (Segundo) -->
        <svg
          v-if="!showPapelera"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          class="ml-2"
        >
          <path
            fill="#ffffff"
            d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4zm2 2h6V4H9zM6.074 8l.857 12H17.07l.857-12zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1"
          />
        </svg>
      </button>
    </div>
  </div>
  <HorariosList :activityId="props.activityId" v-if="!showPapelera" />
  <HorariosPapelera :activityId="props.activityId" v-else />

  <!-- NewHorarioModal -->
  <CrearHorarioView
    :show="isNewHorarioModalOpen"
    :activityId="props.activityId"
    @close="isNewHorarioModalOpen = false"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth/authStore'
import HorariosService from '@/services/horarios/HorariosService'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import HorariosList from './HorariosList.vue'
import HorariosPapelera from './HorariosPapelera.vue'
import type { Horario } from '@/types/Horario'
import CrearHorarioView from '@/views/Horarios/CrearHorarioView.vue'
interface Props {
  activityId: string
}

const props = defineProps<Props>()
const horarios = ref<Horario[]>([])
const showPapelera = ref(false) // Estado para alternar entre ActividadesList y ActividadesPapelera

// State to control the visibility of the NewHorarioModal
const isNewHorarioModalOpen = ref(false)

// Function to open the new horario modal
function openNewHorarioModal() {
  isNewHorarioModalOpen.value = true
}

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
// Function to handle deleting a horario
async function deleteHorario(id: string) {
  try {
    // Retrieve the token from the auth store
    const token = useAuthStore().getToken

    // Call the service to delete the horario
    const response = await HorariosService.deleteDeparture(token, id)
    console.log(response)
    // Remove the deleted horario from the local state
    horarios.value = horarios.value.filter((horario) => horario.id !== id)

    // Show success toast
    toast.success('Horario eliminado exitosamente!')
  } catch (error) {
    console.error('Error deleting horario:', error)
    // Show error toast
    toast.error('Error al eliminar el horario.')
  }
}

const toggleView = () => {
  showPapelera.value = !showPapelera.value
}

console.log(props.activityId)
// Fetch horarios when the component is mounted
onMounted(() => {
  fetchHorarios()
})
</script>
