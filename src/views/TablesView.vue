<script setup lang="ts">
import { ref } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import TableOne from '@/components/Tables/TableOne.vue'
import TableTwo from '@/components/Tables/TableTwo.vue'
import TableThree from '@/components/Tables/TableThree.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ActividadesList from '@/components/Actividades/ActividadesList.vue'
import ActividadesPapelera from '@/components/Actividades/ActividadesPapelera.vue'
import CrearActividad from '@/components/Actividades/CrearActividad.vue'
import type { Actividad } from '@/types/Actividad'


const pageTitle = ref('Actividades')
const isModalOpen = ref(false); // Controla la visibilidad del modal de creación de actividades
const actividadData = ref<Actividad | null>(null); // Almacena los datos de la actividad para el modal
  const showPapelera = ref(false); // Estado para alternar entre ActividadesList y ActividadesPapelera


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

const toggleView = () => {
  showPapelera.value = !showPapelera.value;
};

</script>

<template>
  <DefaultLayout>
    <!-- Breadcrumb Start -->
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <!-- Breadcrumb End -->

    <div class="flex flex-col gap-10">
      <div class="flex space-x-2">
        <!-- Primer botón -->
        <button
          class="inline-flex items-center justify-center rounded-md bg-primary py-2 px-4 text-sm font-medium text-white hover:bg-opacity-90"
          @click="openModal"
        >
          Crear Actividad
        </button>

        <!-- Botón para alternar entre Papelera y Lista de Actividades -->
        <button
    :class="[
      'inline-flex items-center justify-center rounded-md py-2 px-4 text-sm font-medium text-white',
      showPapelera ? 'bg-blue-800 hover:bg-blue-600' : 'bg-red hover:bg-rose-400'
    ]"
    @click="toggleView"
  >
    {{ showPapelera ? 'Mostrar Actividades' : 'Papelera' }}
  </button>
      </div>
      <ActividadesList v-if="!showPapelera" />
      <ActividadesPapelera v-else />
      <CrearActividad :show="isModalOpen" :actividad="actividadData" @close="closeModal" />

    </div>
  </DefaultLayout>
</template>
