<template>
  <h3 class="text-xl font-semibold mb-4 text-black dark:text-white">Actualizar Precio</h3>
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

    <button
      type="submit"
      class="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 flex items-center space-x-2"
    >
      <span>Actualizar</span>
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
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth/authStore'
import PrecioService from '@/services/precios/PrecioService'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import type { Precio } from '@/types/Precio'


interface Props {
  precio: Precio
  priceId: string
}

// Define props and emits
const props = defineProps<Props>()
const emit = defineEmits(['close', 'price-updated'])

// Local state for the form inputs
const amount = ref<number>(props.precio.amount)
const currency = ref<string>(props.precio.currency)

// Handle form submission
async function handleSubmit() {
  if (amount.value !== null && currency.value) {
    try {
      // Retrieve the token from the auth store
      const token = useAuthStore().getToken

      // Call the service to update the price
      const response = await PrecioService.updateAmountAndCurrency(
        token,
        props.priceId,
        amount.value,
        currency.value
      )
      console.log(response)

      // Show success toast
      toast.success('Precio actualizado exitosamente!')

      // Emit an event to notify the parent component
      emit('price-updated')
      emit('close')

    } catch (error) {
      console.error('Error updating price:', error)
      // Show error toast
      toast.error('Error al actualizar el precio.')
    }
  }
}
</script>
