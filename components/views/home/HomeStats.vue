<template>
    <div class="bg-white py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <h2 ref="title" class="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">{{ content.mission.title }}</h2>
          <div class="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
            <div class="lg:w-full lg:max-w-2xl lg:flex-auto">
              <p ref="description" class="text-xl leading-8 text-gray-600">{{ content.mission.description }}</p>
              <p ref="details" class="mt-10 max-w-xl text-base leading-7 text-gray-700">{{ content.mission.details }}</p>
            </div>
            <div class="lg:flex lg:flex-auto lg:justify-center">
              <dl class="w-64 space-y-8 xl:w-80">
                <div v-for="(stat, index) in content.stats" :key="stat.label" class="flex flex-col-reverse gap-y-4" :ref="el => { if (el) statElements[index] = el }">
                  <dt class="text-base leading-7 text-gray-600">{{ stat.label }}</dt>
                  <dd class="text-5xl font-semibold tracking-tight text-gray-900">{{ stat.value }}</dd>
                </div>
              </dl>
            </div>
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
  
  const { data: content } = await useAsyncData('homeStats', () => queryContent('views/home/stats').findOne())
  
  const title = ref(null)
  const description = ref(null)
  const details = ref(null)
  const statElements = ref([])
  
  onMounted(() => {
    const elements = [title.value, description.value, details.value, ...statElements.value]
  
    gsap.from(elements, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: elements[0],
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })
  })
  </script>