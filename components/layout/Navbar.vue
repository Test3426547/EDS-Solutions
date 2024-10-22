<template>
  <Disclosure as="nav" class="bg-white shadow" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500">
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center" ref="logo">
            <NuxtImg :src="navContent.logo" class="h-8 w-auto" :alt="navContent.companyName" />
            <span class="ml-2 text-lg font-semibold text-gray-900">{{ navContent.companyName }}</span>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <a
              v-for="item in navContent.navigation"
              :key="item.name"
              :href="item.href"
              class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-emerald-300 hover:text-gray-700"
              :ref="el => { if (el) navItems.push(el) }"
            >
              {{ item.name }}
            </a>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <ClientOnly>
            <GlowBorder
              ref="enquireButton"
              class="relative overflow-hidden rounded-md"
              :color="['#10B981', '#34D399', '#6EE7B7']"
            >
              <NuxtLink
                to="/contact"
                class="block px-3 py-2 text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors duration-200"
              >
                Enquire Now
              </NuxtLink>
            </GlowBorder>
          </ClientOnly>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 pb-4 pt-2">
        <DisclosureButton
          v-for="item in navContent.navigation"
          :key="item.name"
          as="a"
          :href="item.href"
          class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-emerald-300 hover:bg-gray-50 hover:text-gray-700"
        >
          {{ item.name }}
        </DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAsyncData } from '#app'
import { gsap } from 'gsap'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { GlowBorder } from '~/components/ui/inspira-ui/inspira/ui'

const { data: navContent } = await useAsyncData('navbar', () => queryContent('layout/navbar').findOne())

const logo = ref(null)
const navItems = ref([])
const enquireButton = ref(null)

onMounted(() => {
  const elements = [logo.value, ...navItems.value, enquireButton.value.$el]
  gsap.from(elements, {
    opacity: 0,
    x: -20,
    duration: 0.5,
    stagger: 0.2,
    ease: 'power2.out'
  })
})
</script>
