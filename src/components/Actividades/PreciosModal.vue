<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-slate-600 bg-opacity-75 flex items-center justify-center"
    @click="handleBackgroundClick"
  >
    <div class="bg-white dark:bg-boxdark p-5 rounded-lg w-203 max-h-[60vh] overflow-y-auto" @click.stop>
      <h3 class="text-xl font-semibold mb-4 text-black dark:text-white">Precios</h3>
      <div class="overflow-x-auto">
        <table class="w-full table-auto shadow-xl">
          <thead>
            <tr class="bg-gray-2 text-left dark:bg-meta-4">
              <th class="py-4 px-4 font-medium text-black dark:text-white">Monto</th>
              <th class="py-4 px-4 font-medium text-black dark:text-white">Moneda</th>
              <th class="py-4 px-4 font-medium text-black dark:text-white">ID del Tipo de Precio</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="precio in precios" :key="precio.id">
              <td class="py-4 px-4">{{ precio.amount }}</td>
              <td class="py-4 px-4">{{ precio.currency }}</td>
              <td class="py-4 px-4">{{ precio.price_type_id }}</td>
            </tr>
          </tbody>
        </table>
      </div>
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
  activityId: string

}

const emit = defineEmits(['close'])
const props = defineProps<Props>()

function handleBackgroundClick() {
  emit('close')
}
</script>
