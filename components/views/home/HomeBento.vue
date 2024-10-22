<template>
    <div class="bg-white py-24 sm:py-32" ref="bentoContainer">
      <div class="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 class="text-base/7 font-semibold text-emerald-600">{{ content.subtitle }}</h2>
        <p class="mt-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">{{ content.title }}</p>
        <div class="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          <div v-for="(service, index) in content.services" :key="index" :class="[
            'relative',
            service.span,
            service.roundedClass
          ]" ref="bentoItems">
            <div :class="['absolute inset-px rounded-lg bg-white', service.roundedClass]" />
            <div :class="['relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]', service.roundedClass]">
              <NuxtImg :src="service.image" :alt="service.title" class="h-80 object-cover" :class="service.imageClass" />
              <div class="p-10 pt-4">
                <h3 class="text-sm/4 font-semibold text-emerald-600">{{ service.category }}</h3>
                <p class="mt-2 text-lg/7 font-medium tracking-tight text-gray-950">{{ service.title }}</p>
                <p class="mt-2 max-w-lg text-sm/6 text-gray-600">{{ service.description }}</p>
              </div>
            </div>
            <div :class="['pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5', service.roundedClass]" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useAsyncData } from '#app'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  
  gsap.registerPlugin(ScrollTrigger)
  
  const bentoContainer = ref(null)
  const bentoItems = ref([])
  
  const { data: content } = await useAsyncData('homeBento', () => queryContent('views/home/bento').findOne())
  
  onMounted(() => {
    gsap.from(bentoItems.value, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: bentoContainer.value,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })
  })
  </script>