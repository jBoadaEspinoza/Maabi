<template>
<div
    class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
  >
  <DataTableNew
    :data="ventas"
    :totalItems="totalItems"
    :rowsPerPage="rowsPerPage"
    :sortKey="'date_created'"
    :sortDesc="false"
    :perPageOptions="[5, 10, 20]"
  >
    <!-- Encabezado de la tabla con capacidad de ordenación -->
    <template #header="{ sortTable, sortKey, sortDesc }">
      <th @click="sortTable('date_created')" class="py-4 px-4 cursor-pointer">
        Fecha de Creación
   
      </th>
      <th class="py-4 px-4">Archivo</th>

      <th class="py-4 px-4">Documento</th>
      <th class="py-4 px-4">Cerrado</th>
      <th class="py-4 px-4">Acciones</th>

    </template>

    <!-- Definición de las filas -->
    <template #row="{ item }">
      <td class="py-5 px-4">
        <p class="text-black dark:text-white">
            {{ new Date(item.date_created).toLocaleDateString() }}
        </p>
      </td>

      <td class="py-5 px-4">
        <p class="text-sm">
          {{ item.documentFile }}
        </p>
      </td>

      <td class="py-5 px-4">
        <p class="text-sm">
          {{ item.documentNumber }}
        </p>
      </td>
      <td class="py-5 px-4">
              <p
                class="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium"
                :class="{
                  'bg-success text-success': item.closed,
                  'bg-danger text-danger': !item.closed
                }"
              >
                {{ item.closed? 'Si' : 'No' }}
              </p>
            </td>

    </template>
  </DataTableNew>
</div>

</template>

<script setup lang="ts">
import DataTableNew from '../DataTable/DataTableNew.vue'
import type { Venta } from '@/types/Venta'
import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth/authStore'
import VentasService from '@/services/ventas/VentasService'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const ventas = ref<Venta[]>([])
const isModalOpen = ref(false)
const ventaToDelete = ref<string | null>(null)

const rowsPerPage = ref(5)

const totalItems = computed(() => ventas.value.length)

// Function to fetch ventas
async function fetchVentas() {
  try {
    const token = useAuthStore().getToken
    const fetchedVentas = await VentasService.getAllSales(token, 10, undefined, 'ASC')
    ventas.value = fetchedVentas
    console.log(ventas)
  } catch (error) {
    console.error('Error fetching ventas:', error)
    toast.error('Error al cargar las ventas.')
  }
}

// Open the delete confirmation modal
function openDeleteModal(id: string) {
  ventaToDelete.value = id
  isModalOpen.value = true
}

// Handle modal cancellation
function handleModalCancel() {
  isModalOpen.value = false
  ventaToDelete.value = null
}

// Handle modal confirmation
async function handleModalConfirm() {
  if (ventaToDelete.value) {
    try {
      const token = useAuthStore().getToken
      //await VentasService.deleteSale(token, ventaToDelete.value)
      toast.success('Venta eliminada exitosamente!')
      fetchVentas() // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting venta:', error)
      toast.error('Error al eliminar la venta.')
    }
    isModalOpen.value = false
    ventaToDelete.value = null
  }
}

// Fetch ventas when the component is mounted
onMounted(() => {
  fetchVentas()
})
</script>
