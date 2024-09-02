<script setup lang="ts">
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import { useAuthStore } from '@/stores/auth/authStore'

import { computed, onMounted, ref, watch } from 'vue'
import { actividadStore } from '@/stores/Actividades/actividadStore'

import ConfirmDeleteModal from './ConfirmDeleteModal.vue'
import HorariosView from '@/views/Horarios/HorariosView.vue'
import PreciosView from '@/views/Precios/PreciosView.vue'
import InteresesView from '@/views/Intereses/InteresesView.vue'
import ImagenesView from '@/views/Imagenes/ImagenesView.vue'

import ActividadesService from '@/services/actividades/ActividadesService'
import LugarService from '@/services/lugares/LugarService'

import type { Horario } from '@/types/Horario'
import type { Lugar } from '@/types/Lugar'
import type { Actividad } from '@/types/Actividad'
import type { Interes } from '@/types/Interes'
import type { TipoActividad } from '@/types/TipoActividad'
import type { Precio } from '@/types/Precio'
import PrecioService from '@/services/precios/PrecioService'
import type { Origen } from '@/types/Origen'
import OrigenesService from '@/services/origenes/OrigenesService'
import type { Image } from '@/types/Image'

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



const origins = ref<Origen[]>([]) // Nuevo estado para los orígenes

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

const fetchOrigins = async () => {
  try {
    origins.value = await OrigenesService.getAllOrigins(authStore.token)
  } catch (error) {
    console.error('Error fetching origins:', error)
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

const getTypeName = (typeId: string) => {
  const type = activityTypes.value.find((t) => t.id === typeId)
  return type ? type.singular_denomination_es.toUpperCase() : 'Unknown'
}

const getOriginName = (typeId: string) => {
  const type = origins.value.find((t) => t.id === typeId)
  return type ? type.denomination_long.toUpperCase() : 'Unknown'
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

const selectedActivityId = ref<string | null>(null) // Store the selected activity ID

const handleDepartures = (activityId: string, activityDepartures: any[]) => {
  departures.value = activityDepartures // Store the provided departures
  selectedActivityId.value = activityId // Store the activity ID
  isHorariosModalOpen.value = true // Open the modal
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

const currentPage = ref(1)
const rowsPerPage = ref(10) // Fixed rows per page to 10 for display
const perPageSelected = ref(10) // Number of activities to fetch
const perPageOptions = ref([10, 20, 50, 100]) // Options for total rows to fetch

// Pagination Computed Properties
const totalItems = computed(() => activities.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / rowsPerPage.value))
const startIndex = computed(() => (currentPage.value - 1) * rowsPerPage.value)
const endIndex = computed(() => Math.min(startIndex.value + rowsPerPage.value, totalItems.value))

// Fetch activities based on the selected per page value
const fetchActivities = async () => {
  try {
    await activitiesStore.fetchAllActivities(authStore.getToken || '', true, perPageSelected.value)

    activities.value = activitiesStore.getActivities
  } catch (error) {
    console.error('Failed to fetch activities', error)
  }
}

// Change the number of activities fetched based on user selection
const onRowsPerPageChange = () => {
  currentPage.value = 1 // Reset to the first page
  fetchActivities() // Fetch new activities based on the new per page value
}

// Navigate to the previous page
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchActivities() // Fetch activities for the new page
  }
}

// Navigate to the next page
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    fetchActivities() // Fetch activities for the new page
  }
}

// Watch for changes in perPageSelected and currentPage
watch(perPageSelected, fetchActivities)

// Computed property to get the current page activities
const paginatedActivities = computed(() => {
  return activities.value.slice(startIndex.value, endIndex.value)
})

const isImagesModalOpen = ref(false)
const selectedImages = ref<Image[]>([]) // Almacena los intereses seleccionados para mostrar en el modal


// Abre el modal de intereses y carga los intereses de la actividad seleccionada
const openImagesModal = (images: Image[]) => {
  selectedImages.value = images
  isImagesModalOpen.value = true
}

const closeImagesModal = () => {
  isImagesModalOpen.value = false
}

onMounted(() => {
  fetchActivities()
  fetchActivityTypes()
  fetchPlaces()
  fetchOrigins()
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
    <InteresesView
      :show="isInterestsModalOpen"
      :interests="selectedInterests"
      @close="closeInterestsModal"
    />
    <PreciosView
      :show="isPricesModalOpen"
      :activityId="selectedActivityId"
      @close="isPricesModalOpen = false"
    />

    <HorariosView
      :show="isHorariosModalOpen"
      :activityId="selectedActivityId"
      @close="closeHorariosModal"
    />

    <ImagenesView
      :show="isImagesModalOpen"
      :activityId="selectedActivityId"
      :images="selectedImages"
      @close="closeImagesModal"
    />

    <!-- Modal de confirmación para eliminar una actividad -->
    <ConfirmDeleteModal
      :isOpen="isDeleteModalOpen"
      @cancel="closeDeleteModal"
      @confirm="confirmDelete"
    />

    <!-- Pagination Controls -->
    <div class="flex justify-between items-center mt-4 mb-4">
      <div class="flex items-center">
        <label for="rowsPerPage" class="mr-2">Filas por página :</label>
        <select
          id="rowsPerPage"
          v-model="perPageSelected"
          @change="onRowsPerPageChange"
          class="border rounded-md px-2 py-1"
        >
          <option v-for="option in perPageOptions" :key="option" :value="option">
            {{ option }}
          </option>
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

    <div class="max-w-full overflow-x-auto">
      <table class="w-full table-auto">
        <thead>
          <tr class="bg-gray-2 text-left dark:bg-meta-4">
            <!-- Índice -->
            <th class="py-4 px-4 font-medium text-black dark:text-white">#</th>
            <th class="py-4 px-4 font-medium text-black dark:text-white">Origen</th>

            <th class="py-4 px-4 font-medium text-black dark:text-white">Destino</th>
            <th class="py-4 px-4 font-medium text-black dark:text-white">Tipo</th>

            <th class="min-w-[300px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
              Nombre
            </th>
            <th class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
              Fecha de Creacion
            </th>
            <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
              Tradicional
            </th>
            <th class="py-4 px-4 font-medium text-black dark:text-white">Imagenes</th>

            <th class="py-4 px-4 font-medium text-black dark:text-white">Precios</th>
            <th class="py-4 px-4 font-medium text-black dark:text-white">Horarios</th>

            <th class="py-4 px-4 font-medium text-black dark:text-white">Intereses</th>
            <th class="py-4 px-4 font-medium text-black dark:text-white">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(activity, index) in paginatedActivities" :key="activity.id">
            <!-- Índice -->
            <td class="py-5 px-4">
              {{ startIndex + index + 1 }}
            </td>

            <!-- Lugar Column -->
            <td class="py-5 px-4">
              <p class="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium">
                {{ getOriginName(activity.origin_id) }}
              </p>
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
            <!-- Imagenes Column -->

            <td class="py-5 px-4">
              <button
                @click="openImagesModal(activity.images)"
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

            <!-- Precios Column -->

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
