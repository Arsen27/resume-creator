<template>
  <div class="template"> 
    <div class="template__header">
      <div class="template__header-left">
        <nuxt-link to="/admin">
          <icons-arrow />
        </nuxt-link>

        <span class="template__name">{{ template.name }}</span>
      
        <div class="template__editor-theme">
          <span class="template__theme-label">Dark mode</span>
          <ui-toggle v-model="darkMode" />
        </div>
      </div>

      <div class="template__header-right">
        
      </div>
    </div>
    <div class="template__content">
      <div class="template__editor">
        <client-only>
          <codemirror 
            class="template__codemirror"
            v-model="template.body"
            :options="cmOptions"
          />
        </client-only>
      </div>

      <div class="template__preview">

      </div>
    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters, mapMutations } from 'vuex'
import { mapFields } from 'vuex-map-fields'

import IconsArrow from '@/components/icons/IconsArrow'
import UIToggle from '@/components/ui/UIToggle'

export default {
  components: { IconsArrow, UIToggle, },
  data: () => ({
    darkMode: true,
    cmOptions: {
      mode: 'text/html',
      lineNumbers: true,
      theme: 'ayu-dark',
    },   
  }),
  computed: {
    ...mapFields('admin', ['template']),

    id() {
      return this.$route.params.slug
    },
  },
  watch: {
    darkMode(value) {
      if (value) {
        this.cmOptions.theme = 'ayu-dark'
      } else {
        this.cmOptions.theme = 'default'
      }
    }
  },
  methods: {
    ...mapActions('admin', ['loadTemplate']),
    ...mapMutations('admin', ['setCurrentTemplate'])
  },
  created() {
    const { loadTemplate, id } = this

    loadTemplate(id)
  }
}

</script>

<style lang="sass" scoped>

.template
  display: grid 
  grid-template-rows: 70px 1fr
  height: 100vh

  &__header
    height: 70px
    display: grid
    grid-template-columns: 1fr 1fr

    padding: 0 20px
  
    border-bottom: 1px solid var(--color-border-light)

    &-left 
      display: flex
      align-items: center

  &__theme-label
    font-size: 14px
    margin-right: 10px
  
  &__name
    font-size: 22px
    font-weight: 600
    margin-left: 25px

  &__content
    display: grid
    grid-template-columns: 1fr 1fr

  &__editor
    &-theme
      margin-left: auto
      display: flex
      align-items: center

  &__codemirror
    margin-top: 1px
    height: 100%

</style>

<style lang="sass">

.CodeMirror 
  height: 100%

</style>
