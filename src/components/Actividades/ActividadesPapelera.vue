<script setup lang="ts">
import ActividadesService from '@/services/actividades/ActividadesService'
import { useAuthStore } from '@/stores/auth/authStore'
import type { Actividad } from '@/types/Actividad'
import type { Interes } from '@/types/Interes'
import { onMounted, ref, watch } from 'vue'
import CrearActividad from './CrearActividad.vue'
import InteresesModal from './InteresesModal.vue' // Importar el nuevo componente
import type { TipoActividad } from '@/types/TipoActividad'
import { actividadStore } from '@/stores/Actividades/actividadStore'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import ConfimrRestoreModal from './ConfimrRestoreModal.vue'
const activities = ref<Actividad[]>([])
const authStore = useAuthStore()
const activitiesStore = actividadStore()

// Control del modal de intereses
const isInterestsModalOpen = ref(false)
const selectedInterests = ref<Interes[]>([]) // Almacena los intereses seleccionados para mostrar en el modal
// Activity Types
const activityTypes = ref<TipoActividad[]>([])
const fetchActivities = async () => {
  try {
    await activitiesStore.fetchAllActivities(authStore.getToken || '', false)
    activities.value = activitiesStore.getActivities // Update local ref with store data
    console.log(activities.value)
  } catch (error) {
    console.error('Failed to fetch activities', error)
  }
}
// Abre el modal de intereses y carga los intereses de la actividad seleccionada
const openInterestsModal = (interests: Interes[]) => {
  selectedInterests.value = interests
  isInterestsModalOpen.value = true
}

const closeInterestsModal = () => {
  isInterestsModalOpen.value = false
}

// Método para restaurar una actividad
const restoreActivity = async (id: string) => {
  try {
    const restoredActivity = await ActividadesService.restaurarActividad(authStore.token, id)
    // Actualiza la actividad restaurada en la lista
    //console.log(restoreActivity);
    activities.value = activities.value.filter((activity) => activity.id !== id)

    toast.success('La actividad ha sido restaurada exitosamente.')
  } catch (error) {
    console.error('Failed to restore activity', error)
  }
}

const fetchActivityTypes = async () => {
  try {
    activityTypes.value = await ActividadesService.getAllActivityTypes(authStore.token)
    console.log(activityTypes.value)
  } catch (error) {
    console.error('Error fetching activity types:', error)
  }
}


const getTypeName = (typeId: string) => {
  const type = activityTypes.value.find((t) => t.id === typeId)
  return type ? type.singular_denomination_es.toUpperCase() : 'Unknown'
}

const isDeleteModalOpen = ref(false)
const activityToDelete = ref<string | null>(null)

const openDeleteModal = (id: string) => {
  activityToDelete.value = id
  isDeleteModalOpen.value = true
}

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false
}
const confirmDelete = async () => {
  if (activityToDelete.value) {
    try {
      await ActividadesService.restaurarActividad(authStore.token, activityToDelete.value)
      activities.value = activities.value.filter((activity) => activity.id !== activityToDelete.value)
      toast.success('La actividad ha sido restaurada exitosamente.')
    } catch (error) {
      console.error('Failed to delete activity', error)
      toast.error('Error al restaurar la actividad.')
    } finally {
      closeDeleteModal()
    }
  }
}
// Watch for changes in the store's activities and update local ref
watch(
  () => activitiesStore.getActivities,
  (newActivities) => {
    activities.value = newActivities
  },
  { immediate: true }
)

onMounted(() => {
  fetchActivities()
  fetchActivityTypes()
})
</script>

<template>
  <div
    class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
  >
    <InteresesModal
      :show="isInterestsModalOpen"
      :interests="selectedInterests"
      @close="closeInterestsModal"
    />
    <ConfimrRestoreModal
      :isOpen="isDeleteModalOpen"
      @cancel="closeDeleteModal"
      @confirm="confirmDelete"
    />
    <div class="max-w-full overflow-x-auto">
      <table class="w-full table-auto">
        <thead>
          <tr class="bg-gray-2 text-left dark:bg-meta-4">
            <!-- Índice -->
            <th class="py-4 px-4 font-medium text-black dark:text-white">#</th>
            <th class="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
              Nombre
            </th>
            <th class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
              Fecha de Creacion
            </th>
            <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
              Tradicional
            </th>
            <th class="py-4 px-4 font-medium text-black dark:text-white">Estado</th>
            <th class="py-4 px-4 font-medium text-black dark:text-white">Intereses</th>
            <th class="py-4 px-4 font-medium text-black dark:text-white">Tipos</th>

            <th class="py-4 px-4 font-medium text-black dark:text-white">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(activity, index) in activities" :key="activity.id">
            <!-- Índice -->
            <td class="py-5 px-4">
              {{ index + 1 }}
            </td>
            <td class="py-5 px-4 pl-9 xl:pl-11">
              <h5 class="font-medium text-black dark:text-white">
                {{ activity.name_en.toUpperCase() }} / {{ activity.name_es.toUpperCase() }}
              </h5>
              <!-- Descripción en Inglés y Español -->
              <p class="text-sm">
                <span class="font-semibold">EN:</span>
                {{ activity.description_en.substring(0, 100) + '...' }}
              </p>
              <p class="text-sm">
                <span class="font-semibold">ES:</span>
                {{ activity.description_es.substring(0, 100) + '...' }}
              </p>
            </td>
            <td class="py-5 px-4">
              <p class="text-black dark:text-white">
                {{ new Date(activity.created_utc).toLocaleDateString() }}
              </p>
            </td>
            <!-- Tradicional Column -->
            <td class="py-5 px-4">
              <p
                class="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium"
                :class="{
                  'bg-success text-success': activity.traditional,
                  'bg-danger text-danger': !activity.traditional
                }"
              >
                {{ activity.traditional ? 'Si' : 'No' }}
              </p>
            </td>
            <td class="py-5 px-4">
              <p
                class="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium"
                :class="{
                  'bg-success text-success': activity.active,
                  'bg-danger text-danger': !activity.active
                }"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 256 256"
                >
                  <path
                    fill="#ffffff"
                    d="M247.31 124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57 61.26 162.88 48 128 48S61.43 61.26 36.34 86.35C17.51 105.18 9 124 8.69 124.76a8 8 0 0 0 0 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208s66.57-13.26 91.66-38.34c18.83-18.83 27.3-37.61 27.65-38.4a8 8 0 0 0 0-6.5M128 192c-30.78 0-57.67-11.19-79.93-33.25A133.5 133.5 0 0 1 25 128a133.3 133.3 0 0 1 23.07-30.75C70.33 75.19 97.22 64 128 64s57.67 11.19 79.93 33.25A133.5 133.5 0 0 1 231.05 128c-7.21 13.46-38.62 64-103.05 64m0-112a48 48 0 1 0 48 48a48.05 48.05 0 0 0-48-48m0 80a32 32 0 1 1 32-32a32 32 0 0 1-32 32"
                  />
                </svg>
              </button>
            </td>

            <!-- Types Column -->

            <td class="py-5 px-4">
              <p class="text-black dark:text-white">{{ getTypeName(activity.type_id) }}</p>
            </td>

            <!-- Actions Column -->
            <td class="py-5 px-4">
              <div class="flex space-x-2">
               
                <!-- Restaurar Button -->
                <button
                @click="openDeleteModal(activity.id)"
                  class="px-3 py-1 bg-red text-white rounded-md hover:bg-red-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#ffffff"
                      d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89l.07.14L9 12H6a7 7 0 0 1 7-7a7 7 0 0 1 7 7a7 7 0 0 1-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.9 8.9 0 0 0 13 21a9 9 0 0 0 9-9a9 9 0 0 0-9-9"
                    />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
