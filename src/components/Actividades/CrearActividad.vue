<template>
    <!-- Modal Overlay -->
    <div v-if="show" class="fixed inset-0 bg-slate-600 bg-opacity-75 flex items-center justify-center z-50">
      <!-- Modal Content -->
      <div class="bg-white p-6 rounded-lg w-1/2 relative">
        <!-- Modal Title -->
        <h2 class="text-xl font-bold mb-4">Crear Actividad</h2>
  
        <!-- Form Content -->
        <form @submit.prevent="handleSubmit">
          <!-- Name in English -->
          <div class="mb-4">
            <label for="name_en" class="block text-gray-700">Name (English)</label>
            <input
              id="name_en"
              v-model="actividad.name_en"
              type="text"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              readonly
            />
          </div>
  
          <!-- Name in Spanish -->
          <div class="mb-4">
            <label for="name_es" class="block text-gray-700">Name (Spanish)</label>
            <input
              id="name_es"
              v-model="actividad.name_es"
              type="text"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              readonly
            />
          </div>
  
          <!-- Description in English -->
          <div class="mb-4">
            <label for="description_en" class="block text-gray-700">Description (English)</label>
            <textarea
              id="description_en"
              v-model="actividad.description_en"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              readonly
            />
          </div>
  
          <!-- Description in Spanish -->
          <div class="mb-4">
            <label for="description_es" class="block text-gray-700">Description (Spanish)</label>
            <textarea
              id="description_es"
              v-model="actividad.description_es"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              readonly
            />
          </div>
  
          <!-- Interests -->
          <div class="mb-4">
            <div class="mt-1">
              <MultiSelect/>
            </div>
          </div>
  
          <!-- Actions -->
          <div class="flex justify-end">
            <button type="button" @click="closeModal" class="px-4 bg-zinc-700 py-2 bg-gray-500 text-white rounded-md mr-2">
              Close
            </button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import type { Actividad } from '@/types/Actividad';
  import { defineComponent, type PropType } from 'vue';
  import MultiSelect from '../Forms/MultiSelect.vue';

  export default defineComponent({
    components: {
    MultiSelect,
  },
    props: {
      show: {
        type: Boolean,
        required: true,
      },
      actividad: {
        type: Object as PropType<Actividad>,
        required: true,
      },
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      handleSubmit() {
        console.log(this.actividad);
        this.closeModal();
      },
    },
  });
  </script>
  
  <style scoped>
  /* You can add additional styles here if needed */
  </style>
  