<script setup lang="ts">
import { ref } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Gallery from '@/components/Imagenes/Gallery.vue';
const pageTitle = ref('Galeria')

</script>

<template>
  <DefaultLayout>
    <!-- Breadcrumb Start -->
    
    <BreadcrumbDefault :pageTitle="pageTitle" /> 
    <Gallery/>

  </DefaultLayout>
</template>
