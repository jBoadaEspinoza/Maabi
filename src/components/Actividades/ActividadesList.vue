<script setup lang="ts">
import ActividadesService from '@/services/actividades/ActividadesService';
import { useAuthStore } from '@/stores/auth/authStore';
import type { Actividad } from '@/types/Actividad';
import type { Interes } from '@/types/Interes';
import { onMounted, ref } from 'vue'
import CrearActividad from './CrearActividad.vue';
import InteresesModal from './InteresesModal.vue'; // Importar el nuevo componente

// Modal control
const isModalOpen = ref(false); // Controla la visibilidad del modal de creación de actividades
const actividadData = ref<Actividad | null>(null); // Almacena los datos de la actividad para el modal
const activities = ref<Actividad[]>([]);
const authStore = useAuthStore();

// Control del modal de intereses
const isInterestsModalOpen = ref(false);
const selectedInterests = ref<Interes[]>([]); // Almacena los intereses seleccionados para mostrar en el modal

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

const openModal = () => {
  isModalOpen.value = true;
  // Inicializa actividadData con datos predeterminados o existentes
  actividadData.value = {
    object: 'Activity',
    id: '',
    name_es: '',
    name_en: '',
    description_es: '',
    description_en: '',
    created_utc: Date.now(),
    traditional: true,
    place_id: '',
    type_id: '',
    active: true,
    interests: [],
  };
};

const closeModal = () => {
  isModalOpen.value = false;
};

// Abre el modal de intereses y carga los intereses de la actividad seleccionada
const openInterestsModal = (interests: Interes[]) => {
  selectedInterests.value = interests;
  isInterestsModalOpen.value = true;
};

const closeInterestsModal = () => {
  isInterestsModalOpen.value = false;
};
</script>

<template>
  <div
    class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
  >
    <div class="mb-6 flex items-center justify-between">

      <button
        class="inline-flex items-center justify-center rounded-md bg-primary py-2 px-4 text-sm font-medium text-white hover:bg-opacity-90"
        @click="openModal"
      >
        Crear Actividad
      </button>

      <CrearActividad :show="isModalOpen" :actividad="actividadData" @close="closeModal" />
      <InteresesModal :show="isInterestsModalOpen" :interests="selectedInterests" @close="closeInterestsModal" />

    </div>

    <div class="max-w-full overflow-x-auto">
      <table class="w-full table-auto">
        <thead>
          <tr class="bg-gray-2 text-left dark:bg-meta-4">
            <!-- Índice -->
            <th class="py-4 px-4 font-medium text-black dark:text-white">#</th>
            <th class="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
              Activity Name
            </th>
            <th class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
              Created Date
            </th>
            <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Type</th>
            <th class="py-4 px-4 font-medium text-black dark:text-white">Status</th>
            <th class="py-4 px-4 font-medium text-black dark:text-white">Interests</th>
            <th class="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(activity, index) in activities" :key="activity.id">
            <!-- Índice -->
            <td class="py-5 px-4">
              {{ index + 1 }}
            </td>
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
            <!-- Interests Column -->
            <td class="py-5 px-4">
              <button
                v-if="activity.interests.length > 0"
                class="mt-2 px-3 py-1 bg-primary text-white rounded-md hover:bg-opacity-90"
                @click="openInterestsModal(activity.interests)"
              >
                 Intereses
              </button>
            </td>
            <!-- Actions Column -->
            <td class="py-5 px-4">
              <div class="flex space-x-2">
                <!-- Edit Button -->
                <button
                  class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Edit
                </button>
                <!-- Delete Button -->
                <button
                  class="px-3 py-1 bg-red text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
