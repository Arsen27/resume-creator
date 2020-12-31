<template>
  <div class="select">
    <div 
      class="template"
      v-for="template in templates" :key="template._id"
      :class="{ 'template_selected': currentId === template._id }"
      @click="$emit('change', template._id)"
    >
      <div class="template__image-wrapper">
        <img
          class="template__image" 
          :src="apiUrl + template.icon" 
          alt="template icon"
        >
      </div>

      <div class="template__content">
        <span class="template__name">
          {{ template.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { API_URL } from '@/api'

export default {
  name: 'editor-template-select',
  model: {
    prop: 'currentId',
    event: 'change',
  },
  props: {
    currentId: {
      type: [Number, String],
    },
    templates: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    apiUrl: API_URL,
  }),
  computed: {
    ...mapGetters('admin', ['loading']),
  },
}

</script>

<style lang="sass" scoped>

.select
  display: grid
  grid-template-columns: repeat(4, 1fr)
  grid-gap: 25px


.template
  min-width: 150px

  border: 1px solid var(--color-border-light)
  border-radius: 10px

  cursor: pointer
  overflow: hidden

  &_selected
    border: 1px solid var(--color-accent-blue)

    .template__image-wrapper
      border-bottom: 1px solid var(--color-accent-blue)

  &__image
    max-height: 80%
    max-width: 80%

    &-wrapper
      width: 100%
      height: 100px
      display: flex
      justify-content: center
      align-items: center

      border-bottom: 1px solid var(--color-border-light)

  &__content
    padding: 20px 20px

  &__name 
    font-size: 18px
    font-weight: 700

</style>
