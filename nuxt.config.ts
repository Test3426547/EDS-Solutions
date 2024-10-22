import Aura from '@primevue/themes/aura';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  plugins: [{ src: "~/plugins/clarity.js", mode: "client" }],

  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@primevue/nuxt-module',
    '@nuxt/image',
    '@nuxt/content',
    'nuxt-gtag',
    '@vueuse/motion/nuxt'
  ],

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  compatibilityDate: '2024-07-06',

  tailwindcss: {
    config: {
      plugins: [
        require('tailwindcss-primeui'),
        require('@tailwindcss/forms')
      ]
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
      supabaseKey: process.env.SUPABASE_KEY,
      NUXT_CLARITY_ID: process.env.NUXT_CLARITY_ID,
    }
  },

  extends: ["shadcn-docs-nuxt"],
})
