<template>
  <div>
    <HomeHeader />
    <HomeBento />
    <HomeFeature />
    <!-- Add more sections/components here as you create them -->
  </div>
</template>

<script setup>
import { useAsyncData } from '#app'
import HomeHeader from '~/components/views/home/HomeHeader.vue'
import HomeBento from '~/components/views/home/HomeBento.vue'
import HomeFeature from '~/components/views/home/HomeFeature.vue'
// Fetch any necessary data for the page
const { data: headerContent } = await useAsyncData('homeHeader', () => queryContent('views/home/header').findOne())
const { data: bentoContent } = await useAsyncData('homeBento', () => queryContent('views/home/bento').findOne())
const { data: featureContent } = await useAsyncData('homeFeature', () => queryContent('views/home/feature').findOne())
// You can add more logic or data fetching here as needed
</script>
