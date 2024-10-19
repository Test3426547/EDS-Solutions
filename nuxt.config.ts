import Aura from '@primevue/themes/aura';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@supabase/supabase-js',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@primevue/nuxt-module'
  ],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  tailwindcss: {
    config: {
      plugins: [require('tailwindcss-primeui')]
    }
  },
  primevue: {
    options: {
      theme: {
        preset: Aura
      }
    }
  },
  css: ['~/assets/css/tailwind.css'],
})
