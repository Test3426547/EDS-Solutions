<template>
    <div class="bg-emerald-500 px-6 py-24 sm:py-32 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 ref="title" class="text-5xl font-semibold tracking-tight text-white sm:text-7xl">{{ content.title }}</h2>
        <p ref="description" class="mt-8 text-pretty text-lg font-medium text-emerald-100 sm:text-xl/8">{{ content.description }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useAsyncData } from '#app'
  import { gsap } from 'gsap'
  
  const { data: content } = await useAsyncData('electricalHeader', () => queryContent('views/services/electrical-header').findOne())
  
  const title = ref(null)
  const description = ref(null)
  
  onMounted(() => {
    gsap.from(title.value, {
      opacity: 0,
      x: -50,
      duration: 1,
      ease: 'power3.out'
    })
  
    gsap.from(description.value, {
      opacity: 0,
      x: 50,
      duration: 1,
      ease: 'power3.out',
      delay: 0.3
    })
  })
  </script>