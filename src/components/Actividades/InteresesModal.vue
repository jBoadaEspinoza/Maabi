<template>
    <div v-if="show" class="fixed inset-0 bg-slate-600 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white dark:bg-boxdark p-5 rounded-lg  w-203 max-h-[60vh] overflow-y-auto">
        <h3 class="text-xl font-semibold mb-4 text-black dark:text-white">Intereses</h3>
        <ul>
          <li v-for="interest in interests" :key="interest.id" class="mb-2">
            <p class="text-black dark:text-white"><strong>{{ interest.denomination_es }}</strong> / {{ interest.denomination_en }}</p>
            <p class="text-sm text-gray-700 dark:text-gray-300">{{ interest.description_es }}</p>
            <p class="text-sm text-gray-700 dark:text-gray-300">{{ interest.description_en }}</p>
            <p class="text-sm py-1 px-2 rounded-md inline-block"
   :class="{
     'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-200': interest.active,
     'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-200': !interest.active
   }">
   {{ interest.active ? 'Active' : 'Inactive' }}
</p>
          </li>
        </ul>
        <button
          class="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90"
          @click="$emit('close')"
        >
          Cerrar
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { Interes } from '@/types/Interes';
  
  interface Props {
    show: boolean;
    interests: Interes[];
  }
  
  const props = defineProps<Props>();
  </script>
  