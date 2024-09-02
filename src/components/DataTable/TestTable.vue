<template>
 <div
    class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
  >
  <DataTableNew
    :data="paginatedData"
    :totalItems="totalItems"
    :rowsPerPage="rowsPerPage"
    :currentPage="currentPage"
    :sortKey="sortKey"
    :sortDesc="sortDesc"
    :perPageOptions="perPageOptions"
    @updatePagination="onUpdatePagination"
  >
    <!-- Encabezado de la tabla con capacidad de ordenación -->
    <template #header>
      <th @click="sortTable('id')" class="py-4 px-4 cursor-pointer">
        ID
        <span v-if="sortKey === 'id'">
          {{ sortDesc ? '⬇️' : '⬆️' }}
        </span>
      </th>
      <th @click="sortTable('name')" class="py-4 px-4 cursor-pointer">
        Name
        <span v-if="sortKey === 'name'">
          {{ sortDesc ? '⬇️' : '⬆️' }}
        </span>
      </th>
      <th @click="sortTable('age')" class="py-4 px-4 cursor-pointer">
        Age
        <span v-if="sortKey === 'age'">
          {{ sortDesc ? '⬇️' : '⬆️' }}
        </span>
      </th>
    </template>

    <!-- Definición de las filas -->
    <template #row="{ item }">
      <td class="py-5 px-4">{{ item.id }}</td>
      <td class="py-5 px-4">{{ item.name }}</td>
      <td class="py-5 px-4">{{ item.age }}</td>
    </template>

  </DataTableNew>
</div>

</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import DataTableNew from './DataTableNew.vue';
const tableData = ref([
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Smith', age: 25 },
  { id: 3, name: 'Sam Johnson', age: 22 },
  // Más datos aquí...
])

const sortKey = ref('name')  // Clave de ordenación por defecto
const sortDesc = ref(false)  // Orden ascendente por defecto
const rowsPerPage = ref(5)
const currentPage = ref(1)
const perPageOptions = ref([5, 10, 20])

const totalItems = computed(() => tableData.value.length)

// Función de ordenación
function sortTable(key: string) {
  if (sortKey.value === key) {
    sortDesc.value = !sortDesc.value
  } else {
    sortKey.value = key
    sortDesc.value = false
  }

  // Ordenar los datos según la clave y el orden
  tableData.value.sort((a, b) => {
    if (a[key] < b[key]) return sortDesc.value ? 1 : -1
    if (a[key] > b[key]) return sortDesc.value ? -1 : 1
    return 0
  })
}

// Datos paginados y ordenados
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value
  const end = start + rowsPerPage.value
  return tableData.value.slice(start, end)
})


const onUpdatePagination = (pagination: any) => {
  rowsPerPage.value = pagination.rowsPerPage
  currentPage.value = pagination.currentPage
}
</script>
