<template>
    <div
      v-if="show"
      class="fixed inset-0 bg-slate-600 bg-opacity-75 flex items-center justify-center"
      @click="handleBackgroundClick"
    >
      <div
        class="bg-white dark:bg-boxdark p-5 rounded-lg max-w-full max-h-[60vh] overflow-y-auto w-[90%] md:max-w-230 relative"
        @click.stop
      >
        <!-- Close button (X) in the top-right corner -->
        <div class="sticky top-0 flex justify-end">
          <button
            @click="handleClose"
            class="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
  
        <!-- Modal content slot -->
        <div class="modal-content">
          <slot></slot>
        </div>
  
        
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps<{
    show: boolean;
  }>();
  
  const emit = defineEmits(['close']);
  
  function handleClose() {
    emit('close');
  }
  
  function handleBackgroundClick() {
    emit('close');
  }
  </script>
  