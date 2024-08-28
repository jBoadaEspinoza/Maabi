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
        <h3 class="text-xl font-semibold mb-4 text-black dark:text-white">Agregar Precio</h3>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label for="amount" class="block text-sm font-medium text-black dark:text-white mb-2">Monto</label>
            <input
              type="number"
              id="amount"
              v-model="amount"
              placeholder="0.00"
              step="0.01"
              class="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              required
            />
          </div>
          <div class="mb-4">
            <label for="currency" class="block text-sm font-medium text-black dark:text-white mb-2">Moneda</label>
            <select
              id="currency"
              v-model="currency"
              class="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              required
            >
              <option value="USD">USD - Dólar americano</option>
              <option value="PEN">PEN - Soles</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="type_id" class="block text-sm font-medium text-black dark:text-white mb-2">Tipo de Precio</label>
            <select
              id="type_id"
              v-model="typeId"
              class="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              required
            >
              <option value="1">Adultos</option>
              <option value="2">Niños</option>
              <option value="3">Infantes</option>
            </select>
          </div>
          <button
            type="submit"
            class="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90"
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
  import { useAuthStore } from '@/stores/auth/authStore'
  import { toast } from 'vue3-toastify'
  import 'vue3-toastify/dist/index.css'
  
  // Access the authentication store
  const authStore = useAuthStore()
  
  // Define the props interface
  interface Props {
    show: boolean
    activityId: string
  }
  
  // Define the props and emits
  const props = defineProps<Props>()
  const emit = defineEmits(['close'])
  
  // Local state for the form inputs
  const amount = ref<number | null>(null)
  const currency = ref<string>('USD')
  const typeId = ref<number>(1)
  
  // Handle form submission
  async function handleSubmit() {
    if (amount.value !== null && currency.value && typeId.value) {
      try {
        // Call the service method to create a new price
        // Show success toast
        toast.success('Precio creado exitosamente!')
        
        // Close the modal
        emit('close')
      } catch (error) {
        console.error('Error saving new price:', error)
        // Show error toast
        toast.error('Error al crear el precio.')
      }
    }
  }
  
  // Handle background click to close the modal
  function handleBackgroundClick() {
    emit('close')
  }
  </script>
  