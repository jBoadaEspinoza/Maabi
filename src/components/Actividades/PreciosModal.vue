<template>
    <div
      v-if="show"
      class="fixed inset-0 bg-slate-600 bg-opacity-75 flex items-center justify-center"
      @click="handleBackgroundClick"
    >
      <div class="bg-white dark:bg-boxdark p-5 rounded-lg w-203 max-h-[60vh] overflow-y-auto" @click.stop>
        <h3 class="text-xl font-semibold mb-4 text-black dark:text-white">Precios</h3>
        <ul>
          <li
            v-for="precio in precios"
            :key="precio.id"
            class="mb-2 flex items-start justify-between"
          >
            <div class="flex-1">
              <p class="text-black dark:text-white">
                <strong>{{ precio.amount }} {{ precio.currency }}</strong>
              </p>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                ID del Tipo de Precio: {{ precio.price_type_id }}
              </p>
            </div>
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
  import type { Precio } from '@/types/Precio'
  
  interface Props {
    show: boolean
    precios: Precio[]
  }
  
  const emit = defineEmits(['close'])
  const props = defineProps<Props>()
  
  function handleBackgroundClick() {
    emit('close')
  }
  </script>
  