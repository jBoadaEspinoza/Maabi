<template>
  <div>
    <!-- Search bar -->
    <div class="flex items-center mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Buscar..."
        class="border px-4 py-2 rounded-md"
      />
    </div>
    <!-- Table -->
    <div class="max-w-full overflow-x-auto">
      <table class="w-full table-auto shadow-xl">
        <thead>
          <tr class="bg-gray-2 text-left dark:bg-meta-4">
            <th v-for="(column, index) in columns" :key="index" class="py-4 px-4 font-medium text-black dark:text-white" :class="{ 'cursor-pointer': column.sortable }" @click="column.sortable ? sortTable(column.key) : null">
              {{ column.label }}
              <span v-if="sortKey === column.key && !sortDesc">⬆️</span>
              <span v-if="sortKey === column.key && sortDesc">⬇️</span>
            </th>
            <th class="py-4 px-4 font-medium text-black dark:text-white">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredData" :key="item.id">
            <td v-for="(column, colIndex) in columns" :key="colIndex" class="py-5 px-4">
              {{ item[column.key] }}
            </td>
            <td class="py-4 px-4 flex space-x-2">
              <button 
                @click="emitEdit(item)" 
                class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Editar
              </button>
              <button 
                @click="emitDelete(item.id)" 
                class="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Pagination -->
    <div class="flex justify-between items-center mt-4">
      <div class="flex items-center">
        <label for="rowsPerPage" class="mr-2">Rows per page:</label>
        <select id="rowsPerPage" v-model="rowsPerPage" @change="onRowsPerPageChange" class="border rounded-md px-2 py-1">
          <option v-for="option in perPageOptions" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>
      <div>
        <span>{{ startIndex + 1 }}–{{ endIndex }} of {{ totalItems }}</span>
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="mx-2 px-3 py-1 bg-gray-200 rounded-md"
        >
          Anterior
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 bg-gray-200 rounded-md"
        >
          Siguiente
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps<{
  data: any[]
  totalItems: number
  rowsPerPage: number
  currentPage: number
  sortKey: string
  sortDesc: boolean
  perPageOptions: number[]
  columns: { key: string, label: string, sortable?: boolean }[] // New prop for column configuration
}>()

const emit = defineEmits(['edit', 'delete', 'updatePagination'])

const searchQuery = ref<string>('')
const sortKey = ref(props.sortKey)
const sortDesc = ref(props.sortDesc)
const rowsPerPage = ref(props.rowsPerPage)
const currentPage = ref(props.currentPage)
const perPageOptions = props.perPageOptions

// Watch for changes in pagination or sorting from props
watch(() => props.rowsPerPage, (newValue) => rowsPerPage.value = newValue)
watch(() => props.currentPage, (newValue) => currentPage.value = newValue)
watch(() => props.sortKey, (newValue) => sortKey.value = newValue)
watch(() => props.sortDesc, (newValue) => sortDesc.value = newValue)

// Computed property for filtered and sorted data
const filteredData = computed(() => {
  let filtered = [...props.data]

  // Filter by search query
  if (searchQuery.value) {
    filtered = filtered.filter(item =>
      Object.values(item).some(value =>
        value.toString().toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    )
  }

  // Sort the data
  filtered.sort((a, b) => {
    let modifier = sortDesc.value ? -1 : 1
    if (a[sortKey.value] < b[sortKey.value]) return -1 * modifier
    if (a[sortKey.value] > b[sortKey.value]) return 1 * modifier
    return 0
  })

  return filtered
})

const totalPages = computed(() => Math.ceil(props.totalItems / rowsPerPage.value))

const startIndex = computed(() => (currentPage.value - 1) * rowsPerPage.value)

const endIndex = computed(() => Math.min(startIndex.value + rowsPerPage.value, props.totalItems))

function sortTable(key: string) {
  if (sortKey.value === key) {
    sortDesc.value = !sortDesc.value
  } else {
    sortKey.value = key
    sortDesc.value = false
  }
  emit('updatePagination', { rowsPerPage: rowsPerPage.value, currentPage: currentPage.value, sortKey: sortKey.value, sortDesc: sortDesc.value })
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1
    emit('updatePagination', { rowsPerPage: rowsPerPage.value, currentPage: currentPage.value, sortKey: sortKey.value, sortDesc: sortDesc.value })
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value -= 1
    emit('updatePagination', { rowsPerPage: rowsPerPage.value, currentPage: currentPage.value, sortKey: sortKey.value, sortDesc: sortDesc.value })
  }
}

function onRowsPerPageChange() {
  emit('updatePagination', { rowsPerPage: rowsPerPage.value, currentPage: currentPage.value, sortKey: sortKey.value, sortDesc: sortDesc.value })
}

// Emit events
function emitEdit(item: any) {
  emit('edit', item)
}

function emitDelete(itemId: number) {
  emit('delete', itemId)
}
</script>
