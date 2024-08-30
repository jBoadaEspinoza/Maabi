<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">DataTable con Actividades</h1>

    <div
      class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
    >
      <DataTable
        :data="activities"
        :totalItems="totalItems"
        :rowsPerPage="rowsPerPage"
        :currentPage="currentPage"
        :sortKey="sortKey"
        :sortDesc="sortDesc"
        :perPageOptions="perPageOptions"
        :columns="columns"
        @edit="handleEdit"
        @delete="handleDelete"
        @updatePagination="handleUpdatePagination"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DataTable from './DataTable.vue'
import { actividadStore } from '@/stores/Actividades/actividadStore'
import { useAuthStore } from '@/stores/auth/authStore'
import type { Actividad } from '@/types/Actividad'

const activities = ref<Actividad[]>([])
const totalItems = ref(0)
const rowsPerPage = ref(10)
const currentPage = ref(1)
const sortKey = ref('time')
const sortDesc = ref(false)
const perPageOptions = ref([10, 20, 50])

const authStore = useAuthStore()
const activitiesStore = actividadStore()

// Define columns for DataTable
const columns = ref([
  { key: 'id', label: 'ID' },
  { key: 'name_en', label: 'Tiempo', sortable: true },
  { key: 'description', label: 'Descripción' }
])

// Function to fetch activities
const fetchActivities = async () => {
  try {
    await activitiesStore.fetchAllActivities(authStore.getToken || '')
    activities.value = activitiesStore.getActivities
    totalItems.value = activities.value.length
  } catch (error) {
    console.error('Failed to fetch activities', error)
  }
}

// Fetch data when component is mounted
onMounted(() => {
  fetchActivities()
})

// Handler functions for emitted events
const handleEdit = (item: Actividad) => {
  console.log('Edit:', item)
}

const handleDelete = (itemId: number) => {
  console.log('Delete:', itemId)
}

const handleUpdatePagination = (pagination: {
  rowsPerPage: number,
  currentPage: number,
  sortKey: string,
  sortDesc: boolean
}) => {
  rowsPerPage.value = pagination.rowsPerPage
  currentPage.value = pagination.currentPage
  sortKey.value = pagination.sortKey
  sortDesc.value = pagination.sortDesc

  // Optionally, re-fetch activities if needed
  fetchActivities()
}
</script>
