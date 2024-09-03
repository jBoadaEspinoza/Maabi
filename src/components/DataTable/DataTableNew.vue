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

    <!-- Pagination -->
    <div class="flex justify-between items-center mt-4 mb-4">
      <div class="flex items-center">
        <label for="rowsPerPage" class="mr-2">Rows per page:</label>
        <select
          id="rowsPerPage"
          v-model="selectedRowsPerPage"
          @change="onRowsPerPageChange"
          class="border rounded-md px-2 py-1"
        >
          <option v-for="option in perPageOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
      <div>
        <span>{{ startIndex + 1 }}–{{ endIndex }} de {{ filteredData.length }}</span>
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="mx-2 px-3 py-1 bg-gray-200 rounded-md"
        >
          Anterior
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage >= totalPages"
          class="px-3 py-1 bg-gray-200 rounded-md"
        >
          Siguiente
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="max-w-full overflow-x-auto">
      <table class="w-full table-auto shadow-xl">
        <thead>
          <tr class="bg-gray-2 text-left dark:bg-meta-4">
            <!-- Add header for index column -->
            <th class="py-2 px-4">#</th>
            <slot name="header" :sortTable="sortTable" :sortKey="sortKey" :sortDesc="sortDesc"></slot>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedData" :key="item.id">
            <!-- Add index cell -->
            <td class="py-5 px-4">{{ startIndex + index + 1 }}</td>
            <slot name="row" :item="item"></slot>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps<{
  data: any[]
  totalItems: number
  sortKey: string
  sortDesc: boolean
  perPageOptions: number[]
  rowsPerPage: number
}>()

const emit = defineEmits(['edit', 'delete', 'updatePagination'])

const searchQuery = ref<string>('')
const sortKey = ref(props.sortKey)
const sortDesc = ref(props.sortDesc)
const rowsPerPage = ref(props.rowsPerPage)
const selectedRowsPerPage = ref(rowsPerPage.value) // For the select input
const currentPage = ref(1)
const perPageOptions = props.perPageOptions

// Computed property for filtered and sorted data
const filteredData = computed(() => {
  let filtered = [...props.data]

  // Filter by search query
  if (searchQuery.value) {
    filtered = filtered.filter((item) =>
      Object.values(item).some((value) =>
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

// Pagination logic
const totalPages = computed(() => Math.ceil(filteredData.value.length / rowsPerPage.value))
const startIndex = computed(() => (currentPage.value - 1) * rowsPerPage.value)
const endIndex = computed(() =>
  Math.min(startIndex.value + rowsPerPage.value, filteredData.value.length)
)
const paginatedData = computed(() => filteredData.value.slice(startIndex.value, endIndex.value))

// Watch for changes in pagination or sorting from props
watch(
  () => props.sortKey,
  (newValue) => (sortKey.value = newValue)
)
watch(
  () => props.sortDesc,
  (newValue) => (sortDesc.value = newValue)
)

// Watch for changes in selectedRowsPerPage
watch(
  () => selectedRowsPerPage.value,
  () => {
    rowsPerPage.value = selectedRowsPerPage.value // Update rowsPerPage
    currentPage.value = 1 // Reset to the first page when changing rows per page
    updatePagination() // Update pagination with the new settings
  }
)

// Sorting function
function sortTable(key: string) {
  if (sortKey.value === key) {
    sortDesc.value = !sortDesc.value
  } else {
    sortKey.value = key
    sortDesc.value = false
  }
  updatePagination()
}

// Pagination functions
function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1
    updatePagination()
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value -= 1
    updatePagination()
  }
}

function onRowsPerPageChange() {
  selectedRowsPerPage.value = Number(selectedRowsPerPage.value)
  rowsPerPage.value = selectedRowsPerPage.value // Update rowsPerPage
  currentPage.value = 1 // Reset to the first page
  updatePagination() // Update pagination with the new settings
}

function updatePagination() {
  emit('updatePagination', {
    rowsPerPage: rowsPerPage.value,
    currentPage: currentPage.value,
    sortKey: sortKey.value,
    sortDesc: sortDesc.value
  })
}
</script>
