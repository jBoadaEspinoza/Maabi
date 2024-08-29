<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-slate-600 bg-opacity-75 flex items-center justify-center"
    @click="handleBackgroundClick"
  >
    <div
      class="bg-white dark:bg-boxdark p-5 rounded-lg w-203 max-h-[60vh] overflow-y-auto relative"
      @click.stop
    >
      <!-- Close button (X) in the top-right corner, remains sticky -->
      <button
        @click="$emit('close')"
        class="sticky top-2 right-2 text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
        style="float: right;"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div class="flex items-center mb-4">
        <h3 class="text-xl font-semibold text-black dark:text-white">Intereses</h3>
        <button class="ml-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Nuevo Interés
        </button>
      </div>
      <div class="max-w-full overflow-x-auto">
        <table class="w-full table-auto shadow-xl">
          <thead>
            <tr class="bg-gray-2 text-left dark:bg-meta-4">
              <th class="py-4 px-4 font-medium text-black dark:text-white">#</th>
              <th class="py-4 px-4 font-medium text-black dark:text-white">Nombre (ES/EN)</th>
              <th class="py-4 px-4 font-medium text-black dark:text-white">Descripción (ES/EN)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(interest, index) in interests" :key="interest.id">
              <td class="py-5 px-4">{{ index + 1 }}</td>
              <td class="py-5 px-4">
                <strong>{{ interest.denomination_es }}</strong> / {{ interest.denomination_en }}
              </td>
              <td class="py-5 px-4">
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  {{ interest.description_es }}
                </p>
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  {{ interest.description_en }}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Interes } from '@/types/Interes'

interface Props {
  interests: Interes[]
}
const emit = defineEmits(['close'])

const props = defineProps<Props>()

function editInterest(id: number) {
  console.log('Edit interest with id:', id)
}

function deleteInterest(id: number) {
  console.log('Delete interest with id:', id)
}

function handleBackgroundClick() {
  emit('close')
}
</script>
