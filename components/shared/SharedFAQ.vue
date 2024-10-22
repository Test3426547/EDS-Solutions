<template>
    <div class="bg-white">
      <div class="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">{{ content.title }}</h2>
          <p class="mt-6 text-base leading-7 text-gray-600">
            {{ content.description }}
          </p>
        </div>
        <div class="mt-20">
          <dl class="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:gap-x-10">
            <div v-for="faq in content.faqs" :key="faq.id" ref="faqItems">
              <Disclosure v-slot="{ open }" as="div" class="pt-6">
                <dt>
                  <DisclosureButton class="flex w-full items-start justify-between text-left text-gray-900">
                    <span class="text-base font-semibold leading-7">
                      <component :is="getIcon(faq.icon)" class="h-6 w-6 text-emerald-500 mr-2 inline-block" />
                      {{ faq.question }}
                    </span>
                    <span class="ml-6 flex h-7 items-center">
                      <ChevronDownIcon
                        :class="[open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform text-emerald-500']"
                        aria-hidden="true"
                      />
                    </span>
                  </DisclosureButton>
                </dt>
                <DisclosurePanel as="dd" class="mt-2 pr-12">
                  <p class="text-base leading-7 text-gray-600">{{ faq.answer }}</p>
                </DisclosurePanel>
              </Disclosure>
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
  import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
  import { ChevronDownIcon, LightBulbIcon, WifiIcon, ShieldCheckIcon, IdentificationIcon, ClipboardDocumentCheckIcon, HomeModernIcon } from '@heroicons/vue/24/outline'
  
  gsap.registerPlugin(ScrollTrigger)
  
  const { data: content } = await useAsyncData('faq', () => queryContent('shared/faq').findOne())
  
  const faqItems = ref([])
  
  onMounted(() => {
    gsap.from(faqItems.value, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.2,
      scrollTrigger: {
        trigger: faqItems.value[0],
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })
  })
  
  const getIcon = (iconName) => {
    const icons = {
      LightBulbIcon,
      WifiIcon,
      ShieldCheckIcon,
      IdentificationIcon,
      ClipboardDocumentCheckIcon,
      HomeModernIcon
    }
    return icons[iconName] || LightBulbIcon // Default to LightBulbIcon if not found
  }
  </script>
