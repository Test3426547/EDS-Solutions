<template>
    <nav class="bg-white shadow" ref="navbar">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between items-center">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <NuxtLink to="/" class="flex items-center">
                <NuxtImg :src="navContent.logo" alt="EDS Solutions" class="h-8 w-auto mr-2" />
                <span class="text-lg font-semibold text-gray-900">{{ navContent.companyName }}</span>
              </NuxtLink>
            </div>
            <div class="hidden md:ml-6 md:flex md:space-x-8">
              <div v-for="item in navContent.navigation" :key="item.label" class="relative">
                <Popover v-if="item.dropdown" class="relative">
                  <PopoverButton class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700">
                    <span>{{ item.label }}</span>
                    <ChevronDownIcon class="ml-1 h-4 w-4" aria-hidden="true" />
                  </PopoverButton>
  
                  <transition
                    enter-active-class="transition ease-out duration-200"
                    enter-from-class="opacity-0 translate-y-1"
                    enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="transition ease-in duration-150"
                    leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 translate-y-1"
                  >
                    <PopoverPanel class="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-2 sm:px-0">
                      <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          <NuxtLink
                            v-for="subItem in item.items"
                            :key="subItem.label"
                            :to="subItem.url"
                            class="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                          >
                            <div class="ml-4">
                              <p class="text-base font-medium text-gray-900">{{ subItem.label }}</p>
                              <p class="mt-1 text-sm text-gray-500">{{ subItem.description }}</p>
                            </div>
                          </NuxtLink>
                        </div>
                      </div>
                    </PopoverPanel>
                  </transition>
                </Popover>
                <NuxtLink
                  v-else
                  :to="item.url"
                  class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {{ item.label }}
                </NuxtLink>
              </div>
            </div>
          </div>
          <div class="flex items-center">
            <button
              type="button"
              class="rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
            >
              Enquire Now
            </button>
          </div>
        </div>
      </div>
  
      <!-- Mobile menu, show/hide based on menu state. -->
      <div class="md:hidden" id="mobile-menu" v-show="mobileMenuOpen">
        <div class="space-y-1 pb-3 pt-2">
          <div v-for="item in navContent.navigation" :key="item.label">
            <Disclosure v-if="item.dropdown" v-slot="{ open }">
              <DisclosureButton
                class="flex w-full items-center justify-between px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              >
                <span>{{ item.label }}</span>
                <ChevronDownIcon
                  :class="open ? 'rotate-180 transform' : ''"
                  class="h-5 w-5 text-gray-500"
                />
              </DisclosureButton>
              <DisclosurePanel class="px-4 pt-2 pb-2 text-sm text-gray-500">
                <NuxtLink
                  v-for="subItem in item.items"
                  :key="subItem.label"
                  :to="subItem.url"
                  class="block px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                >
                  {{ subItem.label }}
                </NuxtLink>
              </DisclosurePanel>
            </Disclosure>
            <NuxtLink
              v-else
              :to="item.url"
              class="block px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            >
              {{ item.label }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useAsyncData } from '#app'
  import { gsap } from 'gsap'
  import { Popover, PopoverButton, PopoverPanel, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
  import { ChevronDownIcon } from '@heroicons/vue/20/solid'
  
  const navbar = ref(null)
  const mobileMenuOpen = ref(false)
  
  const { data: navContent } = await useAsyncData('navbar', () => queryContent('layout/navbar').findOne())
  
  onMounted(() => {
    gsap.from(navbar.value, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: 'power2.out'
    })
  })
  </script>