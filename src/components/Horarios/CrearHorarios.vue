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
      <h3 class="text-xl font-semibold mb-4 text-black dark:text-white">Agregar Horario</h3>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="time" class="block text-sm font-medium text-black dark:text-white mb-2">Hora (HH:MM:SS)</label>
          <input
            type="text"
            id="time"
            v-model="time"
            @input="validateTimeFormat"
            placeholder="HH:MM:SS"
            class="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            required
          />
          <span v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</span>
        </div>
        <button
          type="submit"
          class="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90"
          :disabled="!isValidTime"
        >
          Guardar
        </button>
        <button
          type="button"
          class="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-opacity-90 ml-2"
          @click="$emit('close')"
        >
          Cancelar
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HorariosService from '@/services/horarios/HorariosService'
import { useAuthStore } from '@/stores/auth/authStore'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

// Access the authentication store
const authStore = useAuthStore()

// Define the props interface, including `activityId`
interface Props {
  show: boolean
  activityId: string
}

// Define the props and emits
const props = defineProps<Props>()
const emit = defineEmits(['close'])

// Local state for the time input and error message
const time = ref<string>('')
const errorMessage = ref<string>('')
const isValidTime = ref<boolean>(false)

// Regex pattern to validate the time format HH:MM:SS
const timePattern = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/

// Function to validate the time format
function validateTimeFormat() {
  if (timePattern.test(time.value)) {
    errorMessage.value = ''
    isValidTime.value = true
  } else {
    errorMessage.value = 'Formato de hora no válido. Use HH:MM:SS.'
    isValidTime.value = false
  }
}

// Handle form submission
async function handleSubmit() {
  if (isValidTime.value) {
    try {
      // Call the service method to create a new horario
      await HorariosService.crearHorario(authStore.getToken, time.value, props.activityId)
      // Show success toast
      toast.success('Horario creado exitosamente!')
      
      // Close the modal
      emit('close')
    } catch (error) {
      console.error('Error saving new horario:', error)
      // Show error toast
      toast.error('Error al crear el horario.')
    }
  }
}

// Handle background click to close the modal
function handleBackgroundClick() {
  emit('close')
}
</script>
