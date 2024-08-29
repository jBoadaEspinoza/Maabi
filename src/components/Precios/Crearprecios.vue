<template>
  <h3 class="text-xl font-semibold mb-4 text-black dark:text-white">Agregar Precio</h3>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label for="amount" class="block text-sm font-medium text-black dark:text-white mb-2"
        >Monto</label
      >
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
      <label for="currency" class="block text-sm font-medium text-black dark:text-white mb-2"
        >Moneda</label
      >
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
      <label for="type_id" class="block text-sm font-medium text-black dark:text-white mb-2"
        >Tipo de Precio</label
      >
      <select
        id="type_id"
        v-model="typeId"
        class="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        required
      >
        <option v-for="type in priceTypes" :key="type.id" :value="type.id">
          {{ type.singular_name_es }}
        </option>
      </select>
    </div>

    <button
      type="submit"
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
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth/authStore'
import PrecioService from '@/services/precios/PrecioService' // Import the service
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

// Access the authentication store
const authStore = useAuthStore()

// Define the props interface
interface Props {
  activityId: string
}

// Define the props and emits
const props = defineProps<Props>()
const emit = defineEmits(['close'])

// Local state for the form inputs
const amount = ref<number | null>(null)
const currency = ref<string>('USD')
const typeId = ref<number>(1) // Single value for the selected price type ID
const priceTypes = ref<Array<{ id: number; singular_name_es: string }>>([]) // Array to store the price types

// Fetch price types when the component is mounted
onMounted(fetchPriceTypes)

// Fetch available price types from the server
async function fetchPriceTypes() {
  try {
    const token = authStore.getToken // Get the token
    priceTypes.value = await PrecioService.getAllPriceTypes(token) // Fetch price types from service

    console.log(priceTypes.value)
  } catch (error) {
    console.error('Error fetching price types:', error)
    toast.error('Error al obtener tipos de precio.')
  }
}

// Handle form submission
async function handleSubmit() {
  if (amount.value !== null && currency.value && typeId.value) {
    try {
      // Retrieve the token from the auth store
      const token = authStore.getToken

      // Call the service method to create a new price
      const newPrice = await PrecioService.createPrice(
        token,
        amount.value,
        props.activityId,
        typeId.value, // Send the selected typeId
        currency.value
      )

      console.log(newPrice)
      // Show success toast
      toast.success('Precio creado exitosamente!')

      // Optionally, you could also emit the new price to the parent component if needed
      // emit('price-created', newPrice)
      console.log(
        amount.value,
        props.activityId,
        typeId.value, // Send the selected typeId
        currency.value
      )
      // Close the modal
      //emit('close')
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
