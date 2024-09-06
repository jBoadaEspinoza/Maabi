<template>
  <div class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    <div class="p-4">
      <UploadFile @upload-success="loadImages"></UploadFile>

      <div v-if="imageUrls.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <div v-for="url in imageUrls" :key="url" class="relative w-full h-48 overflow-hidden rounded-lg shadow-md">
          <img :src="url" alt="Imagen subida" class="absolute inset-0 w-full h-full object-cover" />
        </div>
      </div>
      <div v-else>
        <p class="text-gray-500">No hay imágenes subidas todavía.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ref as storageRef, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '@/services/firebase/firebase';
import UploadFile from './UploadFile.vue';

const imageUrls = ref<string[]>([]);

const loadImages = async () => {
  const listRef = storageRef(storage, 'uploads/');
  try {
    const res = await listAll(listRef);
    const urls = await Promise.all(res.items.map(item => getDownloadURL(item)));
    imageUrls.value = urls;
  } catch (error) {
    console.error('Error al cargar las imágenes:', error);
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
