import Aura from '@primevue/themes/aura';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@primevue/nuxt-module',
    '@nuxt/image',
    '@nuxt/content'
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
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY
    }
  }
})
