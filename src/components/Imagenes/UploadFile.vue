<template>
  <div>
    <!-- Botón para subir archivo -->
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
      @click="triggerFileInput"
    >
      <span>Subir Imagen</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" class="ml-2">
        <path fill="#ffffff" d="M11 16V7.85l-2.6 2.6L7 9l5-5l5 5l-1.4 1.45l-2.6-2.6V16zm-5 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"/>
      </svg>
    </button>

    <!-- Input oculto -->
    <input type="file" ref="fileInput" class="hidden" @change="handleFileUpload" />

    <div v-if="downloadURL" class="mt-4">
      <h3 class="text-lg font-semibold">Archivo Subido Exitosamente:</h3>
      <a :href="downloadURL" target="_blank" class="text-blue-500 underline">{{ downloadURL }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import Swal from 'sweetalert2';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/services/firebase/firebase';
import ImagenService from '@/services/imagenes/ImagenService';
import { useAuthStore } from '@/stores/auth/authStore';

// Define emit for custom events
const emit = defineEmits(['upload-success']);
const authStore = useAuthStore()

const downloadURL = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

// Función para disparar el input file
const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

// Función para formatear la fecha y hora como nombre
const getCurrentTimestamp = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Mes comienza desde 0
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
};

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files ? target.files[0] : null;

  if (file) {
    // Genera un nombre de archivo basado en la fecha y hora
    const timestamp = getCurrentTimestamp();
    const fileExtension = file.name.split('.').pop(); // Obtiene la extensión original del archivo
    const fileName = `image_${timestamp}.${fileExtension}`; // Combina el timestamp con la extensión original

    const fileRef = storageRef(storage, `gestionaFacil/DEV/${fileName}`);

    try {
      const snapshot = await uploadBytes(fileRef, file);
      console.log('Archivo subido exitosamente', snapshot);

      downloadURL.value = await getDownloadURL(snapshot.ref);
      const response = await ImagenService.addImageToGallery(authStore.getToken, downloadURL.value, '');
      console.log(response)
      Swal.fire({
        title: '¡Éxito!',
        text: 'El archivo se ha subido correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });

      // Emit the success event
      emit('upload-success');
    } catch (error) {
      console.error('Error al subir el archivo:', error);

      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al subir el archivo.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  }
};
</script>

<style scoped>
/* Agrega algunos estilos básicos si lo deseas */
</style>
