<script setup lang="ts">
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import DataTable from 'datatables.net-vue3'
import DataTablesLib from 'datatables.net'

import { useAuthStore } from '@/stores/auth/authStore'

import { onMounted, ref, watch } from 'vue'
import { actividadStore } from '@/stores/Actividades/actividadStore'

import ConfirmDeleteModal from './ConfirmDeleteModal.vue'
import InteresesModal from './InteresesModal.vue'
import HorariosModal from './HorariosModal.vue'
import PreciosModal from './PreciosModal.vue'

import HorariosService from '@/services/horarios/HorariosService'
import ActividadesService from '@/services/actividades/ActividadesService'
import LugarService from '@/services/lugares/LugarService'

import type { Horario } from '@/types/Horario'
import type { Lugar } from '@/types/Lugar'
import type { Actividad } from '@/types/Actividad'
import type { Interes } from '@/types/Interes'
import type { TipoActividad } from '@/types/TipoActividad'
import type { Precio } from '@/types/Precio'
import PrecioService from '@/services/precios/PrecioService'

DataTable.use(DataTablesLib)

const activities = ref<Actividad[]>([])
const authStore = useAuthStore()
const activitiesStore = actividadStore()

// Activity Types
const activityTypes = ref<TipoActividad[]>([])

const places = ref<Lugar[]>([])

// Control del modal de intereses
const isInterestsModalOpen = ref(false)
const selectedInterests = ref<Interes[]>([]) // Almacena los intereses seleccionados para mostrar en el modal

// Reactive state for modal and departures
const isHorariosModalOpen = ref(false)
const departures = ref<Horario[]>([])

const precios = ref<Precio[]>([])
const isPricesModalOpen = ref(false)

const fetchActivities = async () => {
  //console.log(authStore.getToken)
  try {
    await activitiesStore.fetchAllActivities(authStore.getToken || '')
    activities.value = activitiesStore.getActivities // Update local ref with store data
    console.log(activities.value)
  } catch (error) {
    console.error('Failed to fetch activities', error)
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

const fetchPlaces = async () => {
  try {
    places.value = await LugarService.getAllPlaces(authStore.token)
    console.log(places.value)
  } catch (error) {
    console.error('Error fetching places:', error)
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

// Método para eliminar una actividad
const deleteActivity = async (id: string) => {
  try {
    console.log(authStore.getToken)

    const response = await ActividadesService.deleteActivity(authStore.getToken, id)
    console.log(response)
    activities.value = activities.value.filter((activity) => activity.id !== id)

    toast.success('La actividad ha sido eliminada exitosamente.')
  } catch (error) {
    console.error('Failed to delete activity', error)
  }
}

const getTypeName = (typeId: string) => {
  const type = activityTypes.value.find((t) => t.id === typeId)
  return type ? type.singular_denomination_es.toUpperCase() : 'Unknown'
}

const getPlaceName = (placeId: string) => {
  const place = places.value.find((p) => p.id === placeId)
  return place ? place.denomination_long.toUpperCase() : 'Unknown'
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
      await ActividadesService.deleteActivity(authStore.getToken, activityToDelete.value)
      activities.value = activities.value.filter(
        (activity) => activity.id !== activityToDelete.value
      )
      toast.success('La actividad ha sido eliminada exitosamente.')
    } catch (error) {
      console.error('Failed to delete activity', error)
      toast.error('Error al eliminar la actividad.')
    } finally {
      closeDeleteModal()
    }
  }
}
// Close the modal
const closeHorariosModal = () => {
  isHorariosModalOpen.value = false
}

// Method to fetch departures
const fetchDepartures = async (activityId: string) => {
  try {
    const result = await HorariosService.getAllDepartures(
      authStore.getToken,
      undefined,
      undefined,
      'ASC',
      activityId
    )
    departures.value = result // Store fetched departures
    isHorariosModalOpen.value = true // Open the modal
    console.log(result) // Print the result to the console
  } catch (err) {
    console.error('Error fetching departures:', err)
  }
}
const selectedActivityId = ref<string | null>(null) // Store the selected activity ID

const handleDepartures = (activityId: string, activityDepartures: any[]) => {
  if (activityDepartures && activityDepartures.length > 0) {
    departures.value = activityDepartures // Store the provided departures
    selectedActivityId.value = activityId // Store the activity ID
    isHorariosModalOpen.value = true // Open the modal
    console.log('Departures:', activityDepartures, 'Activity ID:', activityId) // Log the data
  } else {
    console.error('No departures available for this activity')
  }
}

// Method to fetch prices
const fetchPrices = async (activityId: string) => {
  try {
    const result = await PrecioService.getAllPrices(authStore.getToken, activityId)
    precios.value = result // Store fetched prices
    selectedActivityId.value = activityId // Store the activity ID
    isPricesModalOpen.value = true // Open the modal
    console.log(result) // Print the result to the console
  } catch (err) {
    console.error('Error fetching prices:', err)
  }
}

onMounted(() => {
  fetchActivities()
  fetchActivityTypes()
  fetchPlaces()
})

// Watch for changes in the store's activities and update local ref
watch(
  () => activitiesStore.getActivities,
  (newActivities) => {
    activities.value = newActivities
  },
  { immediate: true }
)
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
    <PreciosModal
      :show="isPricesModalOpen"
      :activityId="selectedActivityId"
      :precios="precios"
      @close="isPricesModalOpen = false"
    />

    <HorariosModal
      :show="isHorariosModalOpen"
      :horarios="departures"
      :activityId="selectedActivityId"
      @close="closeHorariosModal"
    />
    <!-- Modal de confirmación para eliminar una actividad -->
    <ConfirmDeleteModal
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
            <th class="py-4 px-4 font-medium text-black dark:text-white">Lugar</th>
            <th class="py-4 px-4 font-medium text-black dark:text-white">Tipo</th>

            <th class="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
              Nombre
            </th>
            <th class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
              Fecha de Creacion
            </th>
            <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
              Tradicional
            </th>
         
            <th class="py-4 px-4 font-medium text-black dark:text-white">Precios</th>
            <th class="py-4 px-4 font-medium text-black dark:text-white">Horarios</th>

            <th class="py-4 px-4 font-medium text-black dark:text-white">Intereses</th>
            <th class="py-4 px-4 font-medium text-black dark:text-white">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(activity, index) in activities" :key="activity.id">
            <!-- Índice -->
            <td class="py-5 px-4">
              {{ index + 1 }}
            </td>

            <!-- Lugar Column -->
            <td class="py-5 px-4">
              <p class="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium">
                {{ getPlaceName(activity.place_id) }}
              </p>
            </td>

            <!-- Tipo Column -->

            <td class="py-5 px-4">
              <p class="text-black dark:text-white">{{ getTypeName(activity.type_id) }}</p>
            </td>

            <td class="py-5 px-4 pl-9 xl:pl-11">
              <h5 class="font-bold text-black dark:text-white">
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
              <button
                @click="fetchPrices(activity.id)"
                class="mt-2 px-3 py-1 bg-primary text-white rounded-md hover:bg-opacity-90"
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
            <!-- Horarios Column -->

            <td class="py-5 px-4">
              <button
                v-if="activity.departures && activity.departures.length > 0"
                class="mt-2 px-3 py-1 bg-primary text-white rounded-md hover:bg-opacity-90"
                @click="handleDepartures(activity.id, activity.departures)"
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

            <!-- Actions Column -->
            <td class="py-5 px-4">
              <div class="flex space-x-2">
                <!-- Edit Button -->
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
                <!-- Delete Button -->
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
                      d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4zm2 2h6V4H9zM6.074 8l.857 12H17.07l.857-12zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1"
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
