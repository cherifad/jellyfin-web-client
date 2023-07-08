// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      appName: "Jellyfin Web",
      appVersion: "10.7.0",
      deviceName: "Web Client",
    },
  },
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-headlessui",
    "nuxt-swiper",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
      },
    ],
    '@vueuse/nuxt',
    [
      '@nuxtjs/i18n',
      {
        locales: ["en-EN", "fr-FR"],
        defaultLocale: "en-EN",
        detectBrowserLanguage: false,
        vueI18n: "./i18n.config.ts",
      },
    ]
  ],
  css: ["~/assets/fonts/HelveticaNowDisplay.css", "~/assets/css/customCSS.css"],
  imports: {
    dirs: ['stores']
  }
});
