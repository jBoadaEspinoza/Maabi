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
        <h3 class="text-xl font-semibold text-black dark:text-white">Precios</h3>
        <button
          class="ml-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          @click="toggleAddPriceModal"
        >
          Nuevo Precio
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

    <!-- Agregar Precio Modal -->
    <Crearprecios
      :show="isAddPriceModalVisible"
      :activityId="props.activityId"
      @close="toggleAddPriceModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Precio } from '@/types/Precio'
import type { TipoPrecio } from '@/types/TipoPrecio'
import PrecioService from '@/services/precios/PrecioService'
import { useAuthStore } from '@/stores/auth/authStore'
import Crearprecios from '../Precios/Crearprecios.vue'
interface Props {
  show: boolean
  precios: Precio[]
  activityId: string
}

const emit = defineEmits(['close'])
const props = defineProps<Props>()

const priceTypes = ref<TipoPrecio[]>([])
const authStore = useAuthStore()
const isAddPriceModalVisible = ref(false) // State for modal visibility

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

function createNewPrice() {
  // Logic to open a modal or navigate to a form to create a new price
}

function handleBackgroundClick() {
  emit('close')
}

onMounted(() => {
  fetchPriceTypes()
})
</script>
