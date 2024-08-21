<template>
  <!-- Modal Overlay -->
  <div
    v-if="show"
    class="fixed inset-0 bg-slate-600 bg-opacity-75 flex items-center justify-center z-50"
  >
    <!-- Modal Content -->
    <div class="bg-white p-6 rounded-lg w-203 h-1/2 max-h-[80vh] relative overflow-auto">
      <DefaultCard cardTitle="Crear Actividades">
        <!-- Modal Body -->
        <div class="flex flex-col gap-5.5 p-6.5">
          <!-- Nombre en Español -->
          <div>
            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
              Nombre (Español)
            </label>
            <input
              v-model="actividad.name_es"
              type="text"
              placeholder="Nombre en Español"
              class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          <!-- Nombre en Inglés -->
          <div>
            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
              Nombre (Inglés)
            </label>
            <input
              v-model="actividad.name_en"
              type="text"
              placeholder="Nombre en Inglés"
              class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          <!-- Descripción en Español -->
          <div>
            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
              Descripción (Español)
            </label>
            <textarea
              v-model="actividad.description_es"
              placeholder="Descripción en Español"
              rows="4"
              class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            ></textarea>
          </div>

          <!-- Descripción en Inglés -->
          <div>
            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
              Descripción (Inglés)
            </label>
            <textarea
              v-model="actividad.description_en"
              placeholder="Descripción en Inglés"
              rows="4"
              class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            ></textarea>
          </div>

          <SelectGroup
            :options="places.map((place) => ({ value: place.id, text: place.denomination_short }))"
            v-model="selectedPlaceId"
            label="Lugar"
            @update:modelValue="handlePlaceChange"
          />

          <!-- Activity Types -->
          <SelectGroup
            :options="
              activityTypes.map((type) => ({ value: type.id, text: type.singular_denomination_es }))
            "
            v-model="selectedActivityTypeId"
            label="Tipo de Actividad"
            @update:modelValue="handleActivityTypeChange"
          />

          <!-- Traditional -->
          <div>
            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
              Traditional
            </label>
            <input
              v-model="actividad.traditional"
              type="checkbox"
              class="rounded border-stroke bg-transparent text-primary focus:ring-0 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

       
       
          <!-- Interests -->
          <div>
            <MultiSelect
              :options="interests"
              label="Intereses"
              valueKey="id"
              textKey="denomination_es"
              @update:selected="handleSelectedChange"
            />
          </div>

        </div>
      </DefaultCard>
      <!-- Actions -->
      <div class="flex justify-end mt-4">
        <button
          type="button"
          @click="closeModal"
          class="px-4 bg-zinc-700 py-2 bg-gray-500 text-white rounded-md mr-2"
        >
          Close
        </button>
        <button
          type="submit"
          @click="submitActivity"
          class="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, onMounted, ref } from 'vue'
import type { Actividad } from '@/types/Actividad'
import MultiSelect from '../Forms/MultiSelect.vue'
import DefaultCard from '../Forms/DefaultCard.vue'

import type { Interes } from '@/types/Interes'
import { useAuthStore } from '@/stores/auth/authStore'
import IntereseseService from '@/services/Intereses/InteresesService'
import type { Lugar } from '@/types/Lugar'
import LugarService from '@/services/lugares/LugarService'
import type { TipoActividad } from '@/types/TipoActividad'
import ActividadesService from '@/services/actividades/ActividadesService'
import SelectGroup from '../Forms/SelectGroup.vue'
import { activitySchema } from '@/schemes/ActivitySchema'
import { z } from 'zod'
// Definición de las props
const props = defineProps<{
  show: boolean
}>()

// Estado local para la actividad
const actividad = ref<Actividad>({
  object: '',
  id: '',
  name_es: '',
  name_en: '',
  description_es: '',
  description_en: '',
  created_utc: 0,
  traditional: false,
  place_id: '',
  type_id: '',
  active: false,
  interests: []
})

const authStore = useAuthStore()
const token = authStore.token


// Places
const places = ref<Lugar[]>([])
const selectedPlaceId = ref<string | null>(null)

// Interests
const interests = ref<Interes[]>([])
const selectedInterests = ref<Interes[]>([])
// Activity Types
const activityTypes = ref<TipoActividad[]>([])
const selectedActivityTypeId = ref<string | null>(null)


// Definición de los eventos emitidos
const emit = defineEmits(['close'])

// Métodos
function closeModal() {
  emit('close')
}


const fetchInterests = async () => {
  try {
    interests.value = await IntereseseService.getAllInterests(token)
    console.log(interests)
  } catch (error) {
    console.error('Error fetching interests:', error)
  }
}
// Handle selected interests
const handleSelectedChange = (selectedValues: any[]) => {
  selectedInterests.value = selectedValues
  actividad.value.interests = selectedValues // Assuming `interests` in `actividad` is an array of selected option items
}


const fetchPlaces = async () => {
  try {
    places.value = await LugarService.getAllPlaces(token)
    console.log(places.value)
  } catch (error) {
    console.error('Error fetching places:', error)
  }
}


const fetchActivityTypes = async () => {
  try {
    activityTypes.value = await ActividadesService.getAllActivityTypes(token)
    console.log(activityTypes.value)
  } catch (error) {
    console.error('Error fetching activity types:', error)
  }
}

const handlePlaceChange = (value: string) => {
  selectedPlaceId.value = value
  actividad.value.place_id = value
}

const handleActivityTypeChange = (value: string) => {
  selectedActivityTypeId.value = value;
  actividad.value.type_id = value;
};

const submitActivity = async () => {
  // Prepara los datos para la validación
  const activityData = {
    name_es: actividad.value.name_es,
    name_en: actividad.value.name_en,
    description_es: actividad.value.description_es,
    description_en: actividad.value.description_en,
    place_id: actividad.value.place_id,
    type_id: actividad.value.type_id,
    traditional: actividad.value.traditional ?? true, // Default a true si no está definido
    active: actividad.value.active ?? true, // Default a true si no está definido
  };

  // Validar los datos utilizando el esquema
  try {
    activitySchema.parse(activityData);
    
    // Enviar la solicitud para crear la actividad
    await ActividadesService.createActivity(token, activityData);
    
    // Cerrar el modal y limpiar el estado si es necesario
    closeModal();
    alert('Actividad creada exitosamente');
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Mostrar los errores de validación al usuario
      alert('Errores de validación: ' + error.errors.map(e => e.message).join(', '));
    } else {
      console.error('Error creando actividad:', error);
      // Mostrar un mensaje genérico de error
      alert('Error creando actividad. Por favor, inténtelo de nuevo.');
    }
  }
};
// Obtén los intereses cuando el componente se monta
onMounted(() => {
  fetchInterests()
  fetchPlaces()
  fetchActivityTypes()
})
</script>

<style scoped>
/* You can add additional styles here if needed */
</style>
