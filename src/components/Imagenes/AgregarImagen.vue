<template>
    <div class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div class="p-4"> 
        <div v-if="imageData.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div v-for="(image, index) in imageData" :key="image.url" class="relative w-full h-48 overflow-hidden rounded-lg shadow-md">
            <img :src="image.url" alt="Imagen subida" class="absolute inset-0 w-full h-full object-cover" />
            <!-- Botón de borrar -->
            <button
              @click="deleteImage(image.ref)"
              class="absolute top-2 right-2 bg-red text-white p-1 rounded-lg shadow-md hover:bg-red-700"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 56 56"><path fill="#ffffff" d="m44.524 48.66l1.617-34.265h2.343c.961 0 1.735-.797 1.735-1.758s-.774-1.782-1.735-1.782H38.242V7.34c0-3.352-2.273-5.531-5.882-5.531h-8.766c-3.61 0-5.86 2.18-5.86 5.53v3.516H7.54c-.937 0-1.758.82-1.758 1.782c0 .96.82 1.758 1.758 1.758h2.344L11.5 48.684c.164 3.375 2.39 5.507 5.766 5.507h21.492c3.351 0 5.601-2.156 5.765-5.53M21.484 7.574c0-1.336.985-2.273 2.391-2.273h8.227c1.43 0 2.414.937 2.414 2.273v3.281H21.484Zm-3.867 43.102c-1.36 0-2.367-1.032-2.437-2.39l-1.64-33.891h28.85l-1.546 33.89c-.07 1.383-1.055 2.39-2.438 2.39Zm17.344-4.125c.773 0 1.36-.633 1.383-1.524l.703-24.75c.023-.89-.586-1.547-1.383-1.547c-.726 0-1.336.68-1.36 1.524l-.702 24.773c-.024.844.562 1.524 1.359 1.524m-13.898 0c.797 0 1.382-.68 1.359-1.524l-.703-24.773c-.024-.844-.656-1.524-1.383-1.524c-.797 0-1.383.657-1.36 1.547l.727 24.75c.024.891.586 1.524 1.36 1.524m8.367-1.524V20.254c0-.844-.633-1.524-1.407-1.524c-.773 0-1.43.68-1.43 1.524v24.773c0 .844.657 1.524 1.43 1.524c.75 0 1.407-.68 1.407-1.524"/></svg>
            </button>
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
  import { ref as storageRef, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
  import { storage } from '@/services/firebase/firebase';
  import UploadFile from './UploadFile.vue';
  import Swal from 'sweetalert2';
  
  // Arreglo que contiene las URLs de las imágenes y sus referencias
  const imageData = ref<{ url: string, ref: any }[]>([]);
  
  // Cargar las imágenes con sus referencias de Firebase
  const loadImages = async () => {
    const listRef = storageRef(storage, 'uploads/');
    try {
      const res = await listAll(listRef);
      const urls = await Promise.all(
        res.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return { url, ref: item }; // Guardar URL y referencia del archivo
        })
      );
      imageData.value = urls;
    } catch (error) {
      console.error('Error al cargar las imágenes:', error);
    }
  };
  
  // Función para eliminar la imagen usando la referencia en Firebase
  const deleteImage = async (fileRef: any) => {
    try {
      // Eliminar el archivo de Firebase Storage usando su referencia
      await deleteObject(fileRef);
  
      // Actualizar la lista eliminando la imagen correspondiente
      imageData.value = imageData.value.filter(image => image.ref !== fileRef);
  
      // Mostrar alerta de éxito
      Swal.fire({
        title: '¡Éxito!',
        text: 'La imagen ha sido eliminada correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
    } catch (error) {
      console.error('Error al eliminar la imagen:', error);
  
      // Mostrar alerta de error si ocurre un problema
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al eliminar la imagen.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
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
  