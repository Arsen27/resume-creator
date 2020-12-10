<template>
  <div class="item" :class="{ 'item_opened': opened }">
    <div class="item__header" @click="contentToggle()">
      <div>
        <h4 class="item__title">{{ title }}</h4>
        <span class="item__description">{{ description }}</span>
      </div>

      <div>
        <IconsChevron :direction="opened ? 'up' : 'down'" />
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

export default {
  components: {
    IconsChevron, IconsDrag,
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

  &_opened
    .item__content 
      width: auto

      padding: 20px 24px
      margin: 0

      background: var(--color-bg-main)
      border: 1px solid var(--color-border-light)
      border-top: none

      overflow: visible

    .item__header
      border-bottom: none
      border-radius: 6px 6px 0 0

  
  &__header 
    display: flex
    align-items: center
    justify-content: space-between

    background: var(--color-bg-main)
    border: 1px solid var(--color-border-light)
    border-radius: 6px

    padding: 20px 24px

  &:hover
    .item__content
      padding-top: 5px
      transition: .2s

    .item__drag-.item__description 
      opacity: 1

  &_opened
    &:hover
      .item__content
        padding: 20px 24px

  &__title
    font-size: 20px
    font-weight: 700
    margin-bottom: 10px


  &__description
    font-size: 14px
    color: var(--color-text-light)

  &__content
    max-height: 0px
    width: 92%

    margin-left: 4%

    border-radius: 0 0 10px 10px
    background: var(--color-accent-blue)

    transition: .2s
    overflow: hidden

</style>
