<script setup lang="ts">
import ActividadesService from '@/services/actividades/ActividadesService';
import { useAuthStore } from '@/stores/auth/authStore';
import type { Actividad } from '@/types/Actividad';
import { onMounted, ref } from 'vue'

const packages = ref([
  { name: 'Free Package', price: '$0.00', invoiceDate: 'Jan 13, 2025', status: 'Paid' },
  { name: 'Standard Package', price: '$59.00', invoiceDate: 'Jan 13, 2025', status: 'Paid' },
  { name: 'Business Package', price: '$99.00', invoiceDate: 'Jan 13, 2025', status: 'Unpaid' },
  { name: 'Standard Package', price: '$59.00', invoiceDate: 'Jan 13, 2025', status: 'Pending' }
])
const activities = ref<Actividad[]>([]);
const authStore = useAuthStore();

const fetchActivities = async () => {
  try {
    const response = await ActividadesService.getAllActivities(authStore.token);
    console.log(response);
    activities.value = response;
  } catch (error) {
    console.error('Failed to fetch activities', error);
  }
}

onMounted(() => {
  fetchActivities();
});


</script>

<template>
    <div
      class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
    >
    <div class="mb-6 flex items-center justify-between">
      <h4 class="text-xl font-semibold text-black dark:text-white">
        Actvidades
      </h4>
      <button
        class="inline-flex items-center justify-center rounded-md bg-primary py-2 px-4 text-sm font-medium text-white hover:bg-opacity-90"
      >
        Crear Actividad
      </button>
    </div>

      <div class="max-w-full overflow-x-auto">
        <table class="w-full table-auto">
          <thead>
            <tr class="bg-gray-2 text-left dark:bg-meta-4">
              <th class="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Activity Name
              </th>
              <th class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Created Date
              </th>
              <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Type</th>
              <th class="py-4 px-4 font-medium text-black dark:text-white">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="activity in activities" :key="activity.id">
              <td class="py-5 px-4 pl-9 xl:pl-11">
                <h5 class="font-medium text-black dark:text-white">{{ activity.name_en }} / {{ activity.name_es }}</h5>
                <p class="text-sm">{{ activity.description_en.substring(0, 100) + '...' }}</p>
              </td>
              <td class="py-5 px-4">
                <p class="text-black dark:text-white">{{ new Date(activity.created_utc).toLocaleDateString() }}</p>
              </td>
              <td class="py-5 px-4">
                <p class="text-black dark:text-white">{{ activity.traditional ? 'Traditional' : 'Non-traditional' }}</p>
              </td>
              <td class="py-5 px-4">
                <p
                  class="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium"
                  :class="{ 'bg-success text-success': activity.active, 'bg-danger text-danger': !activity.active }"
                >
                  {{ activity.active ? 'Active' : 'Inactive' }}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>