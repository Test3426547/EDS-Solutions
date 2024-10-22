<template>
  <div>
    <HeaderHome />
    <HomeBento />
    <!-- Add more sections/components here as you create them -->
  </div>
</template>

<script setup>
import { useAsyncData } from '#app'
import HeaderHome from '~/components/views/home/HeaderHome.vue'
import HomeBento from '~/components/views/home/HomeBento.vue'
// Fetch any necessary data for the page
const { data: headerContent } = await useAsyncData('headerHome', () => queryContent('views/home/header').findOne())
const { data: bentoContent } = await useAsyncData('homeBento', () => queryContent('views/home/bento').findOne())

// You can add more logic or data fetching here as needed
</script>
