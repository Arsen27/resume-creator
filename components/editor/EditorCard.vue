<template>
  <div class="item" :class="{ 'item_opened': opened }">
    <div class="item__header" @click="contentToggle()">
      <icons-drag class="item__drag-icon" />  

      <div>
        <ui-editable-text 
          class="item__title" 
          :value="title" 
          @input="$emit('input', $event)"
        />
        
        <span 
          v-if="description" 
          class="item__description"
        >
          {{ description }}
        </span>
      </div>

      <icons-chevron :direction="opened ? 'up' : 'down'" />

      <div class="item__delete-icon-wrapper" @click.stop="$emit('delete')">
        <icons-delete class="item__delete-icon" />
      </div>    
    </div>

    <div 
      class="item__content" 
      ref="content"
      :style="{ maxHeight: contentMaxHeight }"
    >
      <slot />
    </div>
  </div>
</template>

<script>

import IconsChevron from '@/components/icons/IconsChevron'
import IconsDrag from '@/components/icons/IconsDrag'
import UIEditableText from '@/components/ui/UIEditableText'

export default {
  components: {
    IconsChevron, IconsDrag, UIEditableText,
  },
  data: () => ({
    opened: false,
    contentMaxHeight: null,
  }),
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
  },
  methods: {
    contentToggle() {
      this.opened = !this.opened

      let { content } = this.$refs

      if (content.style.maxHeight) {
        this.contentMaxHeight = null
      } else {
        this.contentMaxHeight = `${content.scrollHeight}px`
      }
    },
  },
}

</script>

<style lang="sass" scoped>

.item
  cursor: pointer
  position: relative

  &_opened
    .item__content 
      width: auto

      padding: 20px 24px
      margin: 0

      background: var(--color-bg-main)
      border: 1px solid var(--color-border-light)
      border-bottom: 1px solid var(--color-border-light) !important
      border-top: none

      overflow: visible

    .item__header
      border-bottom: none
      border-radius: 6px 6px 0 0

  &__drag-icon   
    position: absolute
    left: -20px

    opacity: 0

    transition: .3s
  
  &__delete-icon
    height: 18px
    width: auto

    fill: var(--color-accent-red)    
    opacity: 0

    transition: .3s

    &-wrapper
      position: absolute
      right: -27px
      top: 50%
      transform: translateY(-50%)

  &__header 
    display: flex
    align-items: center
    justify-content: space-between

    background: var(--color-bg-main)
    border: 1px solid var(--color-border-light)
    border-radius: 6px

    padding: 20px 24px
    
    &:hover
      .item__drag-icon
        opacity: 1
        transition: .3s

      .item__delete-icon
        opacity: 1
        transition: .3s

  &:hover
    .item__content
      border-bottom: 5px solid var(--color-accent-blue)
      transition: .2s

    .item__drag
      opacity: 1

  &_opened
    &:hover
      .item__content
        padding: 20px 24px

  &__title
    font-size: 20px
    font-weight: 700

  &__description
    display: inline-block
    
    margin-top: 10px
    
    font-size: 14px
    
    color: var(--color-text-light)

  &__content
    max-height: 0px
    width: 92%

    margin-left: 4%

    border-radius: 0 0 10px 10px
    background: var(--color-accent-blue)
    border: 0px solid var(--color-accent-blue)

    transition: .1s
    overflow: hidden

</style>
