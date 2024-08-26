<template>
    <div
      v-if="show"
      class="fixed inset-0 bg-slate-600 bg-opacity-75 flex items-center justify-center"
      @click="handleBackgroundClick"
    >
      <div class="bg-white dark:bg-boxdark p-5 rounded-lg w-203 max-h-[60vh] overflow-y-auto" @click.stop>
        <h3 class="text-xl font-semibold mb-4 text-black dark:text-white">Horarios</h3>
        <ul>
          <li
            v-for="horario in horarios"
            :key="horario.id"
            class="mb-2 flex items-start justify-between"
          >
            <div class="flex-1">
              <p class="text-black dark:text-white">
                <strong>{{ horario.time }}</strong>
              </p>
              <p
                class="text-sm py-1 px-2 rounded-md inline-block"
                :class="{
                  'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-200': horario.active,
                  'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-200': !horario.active
                }"
              >
                {{ horario.active ? 'Active' : 'Inactive' }}
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
  import type { Horario } from '@/types/Horario'
  
  interface Props {
    show: boolean
    horarios: Horario[]
  }
  
  const emit = defineEmits(['close'])
  const props = defineProps<Props>()
  
  function editHorario(id: string) {
    console.log('Edit horario with id:', id)
  }
  
  function deleteHorario(id: string) {
    console.log('Delete horario with id:', id)
  }
  
  function handleBackgroundClick() {
    emit('close')
  }
  </script>
  