<template>
  <div class="p-4">
    <div class="mb-4">
      <h3 class="text-xl font-semibold text-black dark:text-white">Agregar Nueva Imagen</h3>
    </div>

    <div v-if="imageData.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <div
        v-for="(image, index) in imageData"
        :key="image.id"
        class="relative w-full h-40 overflow-hidden rounded-lg shadow-md"
      >
        <img :src="image.url" alt="Imagen subida" class="absolute inset-0 w-full h-full object-cover" />
        <!-- Checkbox para seleccionar imagen -->
        <input
          type="checkbox"
          :value="image.id"
          v-model="selectedImages"
          class="absolute top-2 right-2 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded"
        />
      </div>
    </div>
    <div v-else>
      <p class="text-gray-500">No hay imágenes subidas todavía.</p>
    </div>

    <!-- Checkbox para seleccionar/desmarcar todas las imágenes -->
    <div class="mt-4">
      <label class="flex items-center space-x-2">
        <input
          type="checkbox"
          v-model="selectAll"
          @change="toggleAll"
          class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded"
        />
        <span>Seleccionar todas</span>
      </label>

      <!-- Botón para confirmar la adición de imágenes seleccionadas -->
      <button @click="addImagesToActivity" class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mt-2">
        Agregar imágenes a la actividad
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import ImagenService from '@/services/imagenes/ImagenService';
import { useAuthStore } from '@/stores/auth/authStore';
import ActividadesService from '@/services/actividades/ActividadesService';
import type { Image } from '@/types/Image';

interface Props {
  activityId: string,
  images: Image[] // Las imágenes asociadas a la actividad
}
const props = defineProps<Props>()

// Estado que contiene las imágenes (ID y URL)
const imageData = ref<{ id: string, url: string }[]>([]);
const selectedImages = ref<string[]>([]); // Estado para las imágenes seleccionadas
const selectAll = ref(false); // Estado para seleccionar/desmarcar todas las imágenes
const authStore = useAuthStore();

// Cargar imágenes desde el servidor
const loadImages = async () => {
  try {
    const response = await ImagenService.getImages(authStore.getToken);
    imageData.value = response.response.data.map((img: any) => ({
      id: img.id,
      url: img.url
    }));

    // Seleccionar automáticamente las imágenes que ya están asociadas a la actividad
    const selectedIds = props.images.map(image => image.id); // Obtener los IDs de las imágenes asociadas
    selectedImages.value = imageData.value
      .filter(image => selectedIds.includes(image.id)) // Filtrar las imágenes que coinciden con los IDs en props.images
      .map(image => image.id); // Extraer solo los IDs de las imágenes filtradas

    console.log('Imágenes cargadas:', imageData);
    console.log('Imágenes seleccionadas automáticamente:', selectedImages);
  } catch (error) {
    console.error('Error al cargar las imágenes:', error);
  }
};

// Función para agregar imágenes a una actividad
const addImagesToActivity = async () => {
  if (selectedImages.value.length === 0) {
    Swal.fire({
      title: 'Error',
      text: 'Selecciona al menos una imagen para agregar a la actividad.',
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
    return;
  }

  try {
    const imageIds = selectedImages.value; // Enviar los IDs de las imágenes seleccionadas
    console.log('IDs de las imágenes a agregar:', imageIds);
    const response = await ActividadesService.addImagesToActivity(authStore.getToken, props.activityId, imageIds);
    console.log('Respuesta del servidor:', response);

    Swal.fire({
      title: '¡Éxito!',
      text: 'Las imágenes han sido agregadas correctamente a la actividad.',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });

    // Limpiar la selección de imágenes
    selectedImages.value = [];
    selectAll.value = false; // Resetear el estado de "Seleccionar todas"
  } catch (error) {
    console.error('Error al agregar imágenes a la actividad:', error);

    Swal.fire({
      title: 'Error',
      text: 'Hubo un problema al agregar las imágenes a la actividad.',
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
  }
};

// Función para alternar la selección de todas las imágenes
const toggleAll = () => {
  if (selectAll.value) {
    selectedImages.value = imageData.value.map(image => image.id);
  } else {
    selectedImages.value = [];
  }
};

// Cargar las imágenes al montar el componente
onMounted(() => {
  loadImages();
});
</script>

<style scoped>
/* Personaliza los estilos de la galería aquí si es necesario */
</style>
