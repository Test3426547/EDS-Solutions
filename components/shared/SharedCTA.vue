<template>
    <div class="bg-emerald-50">
      <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
        <div ref="leftContent">
          <h2 class="max-w-2xl text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            {{ content.title }} <br />
            <span class="text-emerald-600">{{ content.subtitle }}</span>
          </h2>
        </div>
        <div ref="rightContent" class="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
          <NuxtLink
            :to="content.cta_primary.link"
            class="rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-colors duration-300"
          >
            {{ content.cta_primary.text }}
          </NuxtLink>
          <NuxtLink
            :to="content.cta_secondary.link"
            class="text-sm font-semibold leading-6 text-gray-900 hover:text-emerald-600 transition-colors duration-300"
          >
            {{ content.cta_secondary.text }} <span aria-hidden="true">→</span>
          </NuxtLink>
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
  
  const { data: content } = await useAsyncData('sharedCTA', () => queryContent('shared/cta').findOne())
  
  const leftContent = ref(null)
  const rightContent = ref(null)
  
  onMounted(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: leftContent.value,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })
  
    tl.from(leftContent.value, {
      opacity: 0,
      x: -50,
      duration: 0.5,
      ease: 'power2.out'
    }).from(rightContent.value, {
      opacity: 0,
      x: 50,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.3') // Slight overlap for smoother animation
  })
  </script>