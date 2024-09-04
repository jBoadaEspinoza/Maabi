<template>
  <div class="flex items-center mb-4">
    <h3 class="text-xl font-semibold text-black dark:text-white">Imagenes</h3>
  </div>
  <div class="card">

  <Galleria :value="props.images" :responsiveOptions="responsiveOptions" :numVisible="5" containerStyle="max-width: 140px">
            <template #item="slotProps">
                <img :src="slotProps.item.url" :alt="slotProps.item.alt" style="width: 100%" />
            </template>
            <template #thumbnail="slotProps">
                <img :src="slotProps.item.url" :alt="slotProps.item.alt" />
            </template>
        </Galleria>
      </div>

  <div class="max-w-full overflow-x-auto">






    <table class="w-full table-auto shadow-xl">
      <thead>
        <tr class="bg-gray-2 text-left dark:bg-meta-4">
          <th class="py-4 px-4 font-medium text-black dark:text-white">#</th>
          <th class="py-4 px-4 font-medium text-black dark:text-white">Image</th>
          <th class="py-4 px-4 font-medium text-black dark:text-white">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(image, index) in props.images" :key="image.id">
          <td class="py-5 px-4">{{ index + 1 }}</td>
          <td class="py-5 px-4">
            <img
              :src="image.url"
              :alt="'Image ' + (index + 1)"
              class="h-20 w-20 object-cover rounded-md shadow-md cursor-pointer"
              @click="openLightbox(image.url)"
            />
          </td>
          <td class="py-4 px-4 flex space-x-2">
            <button
              class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              @click="editImage(image.id)"
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
              class="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              @click="openDeleteModal(image.id)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="#ffffff"
                  d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4zm2 2h6V4H9zM6.074 8l.857 12H17.07l.857-12zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1"
                />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Lightbox Modal -->
  <div v-if="isLightboxOpen" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
    <div class="relative">
      <img :src="selectedImage" alt="Full Size Image" class="max-h-[80vh] max-w-[80vw] object-contain"/>
      <button
        @click="isLightboxOpen = false"
        class="absolute top-2 right-2 text-white text-xl font-bold bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
      >
        &times;
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Image } from '@/types/Image'
import { ref, onMounted } from 'vue'
import Galleria from 'primevue/galleria';

interface Props {
  activityId: string
  images: Image[]
}

const props = defineProps<Props>()

// Estado para controlar el Lightbox
const isLightboxOpen = ref(false)
const selectedImage = ref<string | null>(null)

const openLightbox = (imageUrl: string) => {
  selectedImage.value = imageUrl
  isLightboxOpen.value = true
}

const editImage = (imageId: string) => {
  console.log('Edit image with ID:', imageId)
}

const openDeleteModal = (imageId: string) => {
  console.log('Open delete modal for image with ID:', imageId)
}
const responsiveOptions = ref([
    {
        breakpoint: '1300px',
        numVisible: 4
    },
    {
        breakpoint: '200px',
        numVisible: 1
    }
]);
onMounted(() => {
  // Aquí puedes poner cualquier lógica que quieras que se ejecute al montar el componente
})
</script>
