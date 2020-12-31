<template>
  <div class="template"> 
    <div class="template__header">
      <div class="template__header-left">
        <nuxt-link to="/admin">
          <icons-arrow />
        </nuxt-link>

        <ui-editable-text 
          class="template__name"
          v-model="template.name"
        >
          {{ template.name }}
        </ui-editable-text>

        <div class="template__image"> 
          <input 
            class="template__image-input"
            type="file" 
            id="image" 
            ref="image" 
            @change="imageChange()"
          />

          <span>
            {{ image ? image.name : 'Icon is not specified' }}
          </span>

          <label
            class="template__image-label" 
            for="image"
          >
            <font-awesome-icon 
              class="template__image-icon" 
              icon="image" 
            />
          </label>
        </div>
      </div>

      <div class="template__header-right">
        <button 
          class="template__save-button"
          @click="createTemplate"
        >
          Save
        </button>
      </div>
    </div>
    <div class="template__content">
      <div class="template__editor">
        <client-only>
          <codemirror 
            class="template__codemirror"
            v-model="template.body"
            :options="cmOptionsCode"
          />
        </client-only>
      </div>

      <div class="template__preview">
        <client-only>
          <codemirror 
            class="template__codemirror"
            v-model="template.style"
            :options="cmOptionsStyle"
          />
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters, mapMutations } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import { adminApi } from '@/api'

import IconsArrow from '@/components/icons/IconsArrow'
import UIToggle from '@/components/ui/UIToggle'
import UIEditableTest from '@/components/ui/UIEditableText'
import formData from '@/mixins/forms/formData.mixin'

export default {
  mixins: [ formData ],
  components: { IconsArrow, UIToggle, },
  data: () => ({
    template: {},
    image: null,
    cmOptionsCode: {
      mode: 'text/html',
      lineNumbers: true,
      theme: 'ayu-dark',
    },   
    cmOptionsStyle: {
      mode: 'css',
      lineNumbers: true,
      theme: 'default',
    }, 
  }),
  methods: {
    createTemplate() {
      const { name, body, style } = this.template
      const icon = this.image

      const formData = this.jsonToFormData({
        icon,
        name,
        body, 
        style,
      })

      adminApi.createTemplate(formData)
        .then(res => {
          console.log(res)
        
          this.$router.push('/admin')
        })
        .catch(err => console.log(err))
    },
    imageChange() {
      this.image = this.$refs.image.files[0]
      console.log(this.image)
    },
  },
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

    &-right
      display: flex
      align-items: center
      justify-content: flex-end

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

  &__save-button
    padding: 12px 17px

    color: var(--color-text-contrast)
    border-radius: 100px
    border: 0
    background: var(--color-accent-blue)

    cursor: pointer

  &__image
    display: flex
    align-items: center

    font-size: 14px
    font-weight: 600
    
    margin-left: auto

    &-icon
      font-size: 22px
      margin-left: 10px
      cursor: pointer

    &-input
      display: none

</style>

<style lang="sass">

.CodeMirror 
  height: 100%

</style>
