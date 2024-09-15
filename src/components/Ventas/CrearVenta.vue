<template>
    <div class="p-6 bg-white dark:bg-gray-800 rounded-lg ">
      <h3 class="text-xl font-semibold mb-4 text-black dark:text-white">Detalles de la Venta</h3>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="documentNumber" class="block text-sm font-medium text-black dark:text-white mb-2">Número de Documento</label>
          <input
            type="text"
            id="documentNumber"
            v-model="saleData.documentNumber"
            placeholder="Número de documento"
            class="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            required
          />
        </div>
        
        <div class="mb-4">
          <label for="documentSerieId" class="block text-sm font-medium text-black dark:text-white mb-2">Serie del Documento</label>
          <input
            type="text"
            id="documentSerieId"
            v-model="saleData.documentSerieId"
            placeholder="Serie del documento"
            class="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            required
          />
        </div>
        
        <div class="mb-4">
          <label for="documentFile" class="block text-sm font-medium text-black dark:text-white mb-2">Archivo del Documento</label>
          <input
            type="text"
            id="documentFile"
            v-model="saleData.documentFile"
            placeholder="Archivo del documento"
            class="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            required
          />
        </div>
  
        <div class="mb-4">
          <label for="date_created" class="block text-sm font-medium text-black dark:text-white mb-2">Fecha de Creación</label>
          <input
            type="datetime-local"
            id="date_created"
            v-model="saleData.date_created"
            class="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            required
          />
        </div>
  
        <div class="mb-4">
          <label for="closed" class="block text-sm font-medium text-black dark:text-white mb-2">Cerrado</label>
          <select
            id="closed"
            v-model="saleData.closed"
            class="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            required
          >
            <option :value="false">No</option>
            <option :value="true">Sí</option>
          </select>
        </div>
  
        <button
          type="submit"
          class="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 flex items-center space-x-2"
        >
          <span>Guardar</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path
              d="M17 21H7m10 0h.803c1.118 0 1.677 0 2.104-.218c.377-.192.683-.498.875-.874c.218-.427.218-.987.218-2.105V9.22c0-.45 0-.675-.048-.889a2 2 0 0 0-.209-.545c-.106-.19-.256-.355-.55-.682l-2.755-3.062c-.341-.378-.514-.57-.721-.708a2 2 0 0 0-.61-.271C15.863 3 15.6 3 15.075 3H6.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C3 4.52 3 5.08 3 6.2v11.6c0 1.12 0 1.68.218 2.107c.192.377.497.683.874.875c.427.218.987.218 2.105.218H7m10 0v-3.803c0-1.118 0-1.678-.218-2.105a2 2 0 0 0-.875-.874C15.48 14 14.92 14 13.8 14h-3.6c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C7 15.52 7 16.08 7 17.2V21m8-14H9"
            />
          </svg>
        </button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const saleData = ref({
    documentNumber: '',
    documentSerieId: '',
    documentFile: '',
    date_created: '',
    closed: false
  })
  
  const handleSubmit = () => {
    // Aquí puedes manejar la lógica para guardar o actualizar la venta
    console.log('Datos de la venta:', saleData.value)
  }
  </script>
  
  <style scoped>
  /* Personaliza los estilos de tu formulario aquí si es necesario */
  </style>
  