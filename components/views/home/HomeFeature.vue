<template>
    <div class="bg-white py-24 sm:py-32" ref="featureContainer">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center" ref="featureHeader">
          <h2 class="text-base font-semibold leading-7 text-emerald-600">{{ content.subtitle }}</h2>
          <p class="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">{{ content.title }}</p>
          <p class="mt-6 text-lg leading-8 text-gray-600">{{ content.description }}</p>
        </div>
        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div v-for="feature in content.features" :key="feature.name" class="flex flex-col" ref="featureItems">
              <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <component :is="featureIcons[feature.icon]" class="h-5 w-5 flex-none text-emerald-600" aria-hidden="true" />
                {{ feature.name }}
              </dt>
              <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p class="flex-auto">{{ feature.description }}</p>
                <p class="mt-6">
                  <a :href="feature.href" class="text-sm font-semibold leading-6 text-emerald-600">Learn more <span aria-hidden="true">→</span></a>
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useAsyncData } from '#app'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { BoltIcon, SignalIcon, ShieldCheckIcon } from '@heroicons/vue/24/outline'
  
  gsap.registerPlugin(ScrollTrigger)
  
  const featureContainer = ref(null)
  const featureHeader = ref(null)
  const featureItems = ref([])
  
  const { data: content } = await useAsyncData('homeFeature', () => queryContent('views/home/feature').findOne())
  
  const featureIcons = {
    BoltIcon,
    SignalIcon,
    ShieldCheckIcon
  }
  
  onMounted(() => {
    gsap.from(featureHeader.value, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      scrollTrigger: {
        trigger: featureContainer.value,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })
  
    gsap.from(featureItems.value, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: featureContainer.value,
        start: 'top 60%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })
  })
  </script>