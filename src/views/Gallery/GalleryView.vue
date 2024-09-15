<script setup lang="ts">
import { ref } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import CrearVentaView from '../Ventas/CrearVentaView.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Gallery from '@/components/Imagenes/Gallery.vue';
const pageTitle = ref('Galeria')
const showModal = ref(false) // Estado para controlar la visibilidad del modal
</script>

<template>
  <DefaultLayout>
    <!-- Breadcrumb Start -->
    
    <BreadcrumbDefault :pageTitle="pageTitle" /> 
    <!-- Botón para abrir el modal -->
    <button
      @click="showModal = true"
      class="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 flex items-center space-x-2 mb-4"
    >
      <span>Agregar Venta</span>
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
    <Gallery/>
    <CrearVentaView  :show="showModal" title="Crear Venta" @close="showModal = false"/>
  </DefaultLayout>
</template>
