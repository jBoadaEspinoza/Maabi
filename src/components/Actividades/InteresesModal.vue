<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-slate-600 bg-opacity-75 flex items-center justify-center"
    @click="handleBackgroundClick"

  >
    <div class="bg-white dark:bg-boxdark p-5 rounded-lg w-203 max-h-[60vh] overflow-y-auto"
    @click.stop>
      <h3 class="text-xl font-semibold mb-4 text-black dark:text-white">Intereses</h3>
      <ul>
        <li
          v-for="interest in interests"
          :key="interest.id"
          class="mb-2 flex items-start justify-between"
        >
          <div class="flex-1">
            <p class="text-black dark:text-white">
              <strong>{{ interest.denomination_es }}</strong> / {{ interest.denomination_en }}
            </p>
            <p class="text-sm text-gray-700 dark:text-gray-300">{{ interest.description_es }}</p>
            <p class="text-sm text-gray-700 dark:text-gray-300">{{ interest.description_en }}</p>
            <p
              class="text-sm py-1 px-2 rounded-md inline-block"
              :class="{
                'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-200':
                  interest.active,
                'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-200': !interest.active
              }"
            >
              {{ interest.active ? 'Active' : 'Inactive' }}
            </p>
          </div>
          <div class="ml-4 flex items-center space-x-2">
            <button
              class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              @click="editInterest(interest.id)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <g
                  fill="none"
                  stroke="#ffffff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
                  <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3" />
                </g>
              </svg>
            </button>
            <button
              class="px-3 py-1 bg-red text-white rounded-md hover:bg-red-600"
              @click="deleteInterest(interest.id)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="#ffffff"
                  d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4zm2 2h6V4H9zM6.074 8l.857 12H17.07l.857-12zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1"
                />
              </svg>
            </button>
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
import type { Interes } from '@/types/Interes'

interface Props {
  show: boolean
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
