<template>
  <div>
    <h2>Subir Archivo</h2>
    <input type="file" @change="handleFileUpload" />
    <div v-if="downloadURL">
      <h3>Archivo Subido Exitosamente:</h3>
      <a :href="downloadURL" target="_blank">{{ downloadURL }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import Swal from 'sweetalert2';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/services/firebase/firebase';

// Define emit for custom events
const emit = defineEmits(['upload-success']);

const downloadURL = ref<string | null>(null);

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files ? target.files[0] : null;
  
//gallery/dev
//gallery/prod
  if (file) {
    const fileRef = storageRef(storage, `uploads/${file.name}`);

    try {
      const snapshot = await uploadBytes(fileRef, file);
      console.log('Archivo subido exitosamente', snapshot);

      downloadURL.value = await getDownloadURL(snapshot.ref);

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
input[type="file"] {
  margin-bottom: 10px;
}

a {
  color: blue;
  text-decoration: underline;
}
</style>
