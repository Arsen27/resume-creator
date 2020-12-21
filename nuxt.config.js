export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "resume-creator",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    "@fortawesome/fontawesome-svg-core/styles.css",
    "~assets/css/fonts.sass"
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: "~plugins/v-calendar.js", ssr: false },
    { src: "~plugins/vue-picture-input.js", ssr: false },
    { src: "~plugins/vue-editor.js", mode: "client" },
    "~plugins/filters.js",
    "~/plugins/fontawesome.js"
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa"
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
};
