<template>
    <div
      v-if="isOpen"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      @click="handleBackgroundClick"
    >
      <div class="bg-white rounded-lg p-6 max-w-sm w-full" @click.stop>
        <h2 class="text-xl font-bold mb-4">Confirmar Guardado</h2>
        <p>¿Estás seguro de que deseas guardar los cambios?</p>
        <div class="mt-6 flex justify-end space-x-4">
          <button
            class="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-600"
            @click="$emit('cancel')"
          >
            No
          </button>
          <button
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            @click="$emit('confirm')"
          >
            Sí
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps<{
    isOpen: boolean
  }>();
  
  const emit = defineEmits(['cancel', 'confirm']);
  
  const handleBackgroundClick = () => {
    emit('cancel');
  };
  </script>
  