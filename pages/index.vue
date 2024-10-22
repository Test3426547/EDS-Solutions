<template>
  <div>
    <HomeHeader />
    <HomeBento />
    <HomeFeature />
    <HomeStats />
    <SharedCTA />
    <SharedContactForm />
    <SharedFAQ />
    <!-- Add more sections/components here as you create them -->
  </div>
</template>

<script setup>
import { useAsyncData } from '#app'
import HomeHeader from '~/components/views/home/HomeHeader.vue'
import HomeBento from '~/components/views/home/HomeBento.vue'
import HomeFeature from '~/components/views/home/HomeFeature.vue'
import HomeStats from '~/components/views/home/HomeStats.vue'
import SharedCTA from '~/components/shared/SharedCTA.vue'
import SharedContactForm from '~/components/shared/SharedContactForm.vue'
import SharedFAQ from '~/components/shared/SharedFAQ.vue'
// Fetch any necessary data for the page
const { data: headerContent } = await useAsyncData('homeHeader', () => queryContent('views/home/header').findOne())
const { data: bentoContent } = await useAsyncData('homeBento', () => queryContent('views/home/bento').findOne())
const { data: featureContent } = await useAsyncData('homeFeature', () => queryContent('views/home/feature').findOne())
const { data: statsContent } = await useAsyncData('homeStats', () => queryContent('views/home/stats').findOne())
const { data: ctaContent } = await useAsyncData('sharedCTA', () => queryContent('shared/cta').findOne())
const { data: contactFormContent } = await useAsyncData('sharedContactForm', () => queryContent('shared/contact-form').findOne())
const { data: faqContent } = await useAsyncData('sharedFAQ', () => queryContent('shared/faq').findOne())
// You can add more logic or data fetching here as needed
</script>
