<template>
  <h3 class="text-xl font-semibold mb-4 text-black dark:text-white">Agregar Horario</h3>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label for="time" class="block text-sm font-medium text-black dark:text-white mb-2"
        >Hora (HH:MM:SS)</label
      >
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
      :disabled="!isValidTime"
      class="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 flex items-center space-x-2"
    >
      <span>Guardar</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      >
        <path
          d="M17 21H7m10 0h.803c1.118 0 1.677 0 2.104-.218c.377-.192.683-.498.875-.874c.218-.427.218-.987.218-2.105V9.22c0-.45 0-.675-.048-.889a2 2 0 0 0-.209-.545c-.106-.19-.256-.355-.55-.682l-2.755-3.062c-.341-.378-.514-.57-.721-.708a2 2 0 0 0-.61-.271C15.863 3 15.6 3 15.075 3H6.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C3 4.52 3 5.08 3 6.2v11.6c0 1.12 0 1.68.218 2.107c.192.377.497.683.874.875c.427.218.987.218 2.105.218H7m10 0v-3.803c0-1.118 0-1.678-.218-2.105a2 2 0 0 0-.875-.874C15.48 14 14.92 14 13.8 14h-3.6c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C7 15.52 7 16.08 7 17.2V21m8-14H9"
        />
      </svg>
    </button>
  </form>
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
  activityId: string
}

// Define the props and emits
const props = defineProps<Props>()
const emit = defineEmits(['departure-created']); // Definir los eventos que el componente puede emitir

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

      emit('departure-created');
    } catch (error) {
      console.error('Error saving new horario:', error)
      // Show error toast
      toast.error('Error al crear el horario.')
    }
  }
}


</script>
