<template>
  <div class="template"> 
    <ui-modal v-model="pictureModal">
      <div class="picture-modal">
        <picture-input 
          ref="pictureInput"
          width="600" 
          height="300" 
          margin="16" 
          accept="image/jpeg,image/png" 
          :custom-strings="{
            drag: 'Drag your picture'
          }"
          @change="imageChange"
        />
      </div>
    </ui-modal>

    <div class="template__header">
      <div class="template__header-left">
        <nuxt-link to="/templates">
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
        <div @click="deleteTemplate()">
          <icons-delete class="template__delete" />
        </div>

        <button 
          class="template__save-button"
          @click="updateTemplate"
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
import { templatesApi } from '@/api'

import IconsArrow from '@/components/icons/IconsArrow'
import UIToggle from '@/components/ui/UIToggle'
import UIModal from '@/components/ui/UIModal'
import UIEditableTest from '@/components/ui/UIEditableText'
import formData from '@/mixins/forms/formData.mixin'

export default {
  mixins: [ formData ],
  components: { IconsArrow, UIToggle, UIModal },
  data: () => ({
    template: {},
    pictureModal: false,
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
  computed: {
    id() {
      return this.$route.params.slug
    },
  },
  methods: {
    ...mapActions('templates', ['loadTemplate']),

    updateTemplate() {
      const { name, body, style } = this.template
      const icon = this.image

      const formData = this.jsonToFormData({
        icon,
        name,
        body, 
        style,
      })

      templatesApi.updateTemplate(this.id, formData)
        .then(res => {
          console.log(res)
        })
        .catch(err => console.log(err))
    },
    deleteTemplate() {
      templatesApi.deleteTemplate(this.id)
        .then(res => {
          this.$router.push('/admin')
        })
        .catch(err => {
          console.log(err)
        })
    },
    imageChange() {
      this.image = this.$refs.image.files[0]
      console.log(this.image)
    },
  },
  created() {
    const { loadTemplate, id } = this

    loadTemplate(id)

    templatesApi
      .getFullTemplate(id)
      .then(res => {
        this.template = res.data
      })
      .catch(error => {
        console.error(error);
      });
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

  &__delete
    height: 20px
    width: auto

    margin-right: 20px

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

  
.picture-modal
  min-height: 200px
  min-width: 600px

</style>

<style lang="sass">

.CodeMirror 
  height: 100%

</style>
