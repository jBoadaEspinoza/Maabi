<template>
  <div class="flex items-center mb-4">
    <h3 class="text-xl font-semibold text-black dark:text-white">Precios</h3>

    <button
    v-if="precios.length < 3"
    class="ml-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 flex items-center space-x-2"
      @click="toggleAddPriceModal"
    >
      <span>Nuevo Precio</span>
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
  </div>

  <div class="overflow-x-auto">
    <table class="w-full table-auto shadow-xl">
      <thead>
        <tr class="bg-gray-2 text-left dark:bg-meta-4">
          <th class="py-4 px-4 font-medium text-black dark:text-white">#</th>

          <th class="py-4 px-4 font-medium text-black dark:text-white">Monto</th>
          <th class="py-4 px-4 font-medium text-black dark:text-white">Moneda</th>
          <th class="py-4 px-4 font-medium text-black dark:text-white">Tipo de Precio</th>
          <th class="py-4 px-4 font-medium text-black dark:text-white">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(precio, index) in precios" :key="precio.id">
          <td class="py-4 px-4">{{ index + 1 }}</td>

          <td class="py-4 px-4">{{ precio.amount }}</td>
          <td class="py-4 px-4">{{ precio.currency }}</td>
          <td class="py-4 px-4">{{ getPriceTypeName(precio.price_type_id) }}</td>
          <td class="py-4 px-4 flex space-x-2">
            <button
              class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              @click="openUpdatePriceModal(precio.id)"
            >
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
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Agregar Precio Modal -->
  <CrearPrecioView
    :show="isAddPriceModalVisible"
    :activityId="props.activityId"
    @close="toggleAddPriceModal"
    @price-created="fetchPrices"

    
  />
  <ActualizarPreciosView
    :show="isUpdatePriceModalVisible"
    :priceId="currentPriceId"
    @close="toggleUpdatePriceModal"
    @price-updated="handlePriceUpdated"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Precio } from '@/types/Precio'
import type { TipoPrecio } from '@/types/TipoPrecio'
import PrecioService from '@/services/precios/PrecioService'
import { useAuthStore } from '@/stores/auth/authStore'
import CrearPrecioView from '@/views/Precios/CrearPrecioView.vue'
import ActualizarPreciosView from '@/views/Precios/ActualizarPreciosView.vue'

interface Props {
  activityId: string
}

const props = defineProps<Props>()

const priceTypes = ref<TipoPrecio[]>([])
const authStore = useAuthStore()
const isAddPriceModalVisible = ref(false) // State for modal visibility
const isUpdatePriceModalVisible = ref(false)
const currentPriceId = ref<string | null>(null)
const precios = ref<Precio[]>([])


// Method to fetch prices
async function fetchPrices() {
  console.log("fetchaprices")
  try {
    const result = await PrecioService.getAllPrices(authStore.getToken, props.activityId)
    precios.value = result // Store fetched prices
    console.log(result) // Print the result to the console
  } catch (err) {
    console.error('Error fetching prices:', err)
  }
}


async function fetchPriceTypes() {
  try {
    const token = authStore.getToken // Replace this with the actual token
    priceTypes.value = await PrecioService.getAllPriceTypes(token)

    console.log(priceTypes)
  } catch (error) {
    console.error('Error fetching price types:', error)
  }
}

function getPriceTypeName(typeId: number): string {
  const priceType = priceTypes.value.find((type) => type.id === typeId)
  return priceType ? priceType.singular_name_es : 'Desconocido'
}

function toggleAddPriceModal() {
  isAddPriceModalVisible.value = !isAddPriceModalVisible.value
}

function toggleUpdatePriceModal() {
  isUpdatePriceModalVisible.value = !isUpdatePriceModalVisible.value
}

function openUpdatePriceModal(priceId: string) {
  currentPriceId.value = priceId
  isUpdatePriceModalVisible.value = true // Open the modal
}

function handlePriceUpdated() {
  console.log('Price updated event received') // Para verificar si el evento se recibe
  fetchPrices()
}

onMounted(() => {
  fetchPrices()
  fetchPriceTypes()

})
</script>
