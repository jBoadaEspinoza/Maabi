<template>
  <!-- Close button (X) in the top-right corner, remains sticky -->

  <div class="flex items-center mb-4">
    <h3 class="text-xl font-semibold text-black dark:text-white">Intereses</h3>

    <button
      class="ml-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 flex items-center space-x-2"
    >
      <span>Nuevo Interés</span>
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
</template>

<script setup lang="ts">
import type { Interes } from '@/types/Interes'

interface Props {
  interests: Interes[]
}
const emit = defineEmits(['close'])

const props = defineProps<Props>()
</script>
