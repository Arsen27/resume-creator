<template>
  <section 
    class="section"
    :class="{'section_opened': opened}"
  >
    <div class="section__side">
      <icons-drag class="section__drag-icon" />  
      
      <div class="section__num">
        {{ number }}
      </div>

      <div class="section__line"></div>
    </div>

    <div class="section__main">
      <div class="section__header" @click="contentToggle()">
        <div class="section__header-left">
          <ui-editable-text
            class="section__title"
            :value="title" 
            :focused="titleFocused"
            :showPen="false"
            @input="$emit('changeTitle', $event)"
          />
          <icons-chevron :direction="opened ? 'up' : 'down'" />
        </div>

        <div class="section__header-right">
          <div @click.stop="titleFocused = true">
            <icons-pen 
              class="section__pen-icon" 
            />
          </div>

          <div @click.stop="$emit('delete', id)">
            <icons-delete class="section__delete-icon" />
          </div>
        </div>
      </div>
      
      <div 
        ref="content" 
        class="section__content"
      >
        <span v-if="description" class="section__description">
          {{ description }}
        </span>

        <div class="section__margin"></div>

        <slot />
      </div>
    </div>
  </section>
</template>

<script>

import IconsChevron from '@/components/icons/IconsChevron'
import IconsDrag from '@/components/icons/IconsDrag'
import IconsPen from '@/components/icons/IconsPen'
import IconsDelete from '@/components/icons/IconsDelete'

import UIEditableText from '@/components/ui/UIEditableText'

export default {
  components: { IconsChevron, IconsDrag, IconsPen, IconsDelete, UIEditableText },
  props: {
    number: {
      type: Number,
      required: true,
    },
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
  data: () => ({
    opened: false,
    contentMaxHeight: null,
    lineHeight: null,
    titleFocused: false,
  }),
  methods: {
    contentToggle() {
      this.opened = !this.opened
    }
  },
}

</script>

<style lang="sass" scoped>

.section 
  display: grid
  grid-template-columns: 26px 1fr
  grid-gap: 0 0

  padding: 0 10px 0 30px

  &:last-of-type
    .section__line 
      height: 0
      
    .section__content 
      padding-bottom: 0

  &:hover
    .section__pen-icon
      opacity: 1
      transition: .1s
    
    .section__delete-icon
      opacity: 1
      transition: .1s
    

  &_opened 
    .section__content
      height: auto
      max-height: 1000px

      padding: 0 30px 56px 20px !important
      transform: translateY(0) rotate(0)
      
      opacity: 1

      visibility: visible
      overflow-x: visible
      overflow-y: auto

    .section__line
      height: calc(100% - 26px)

    &:last-of-type
      .section__line 
        height: calc(100% - 26px)
    
  &__header
    display: flex
    align-items: center
    justify-content: space-between

    padding: 0 20px

    cursor: pointer

    &-left 
      display: flex
      align-items: center

    &-right 
      display: flex
      align-items: center

  &__description
    display: block

    font-size: 14px
    line-height: 24px

    margin-top: 15px

  &__margin
    width: 100%
    height: 30px

  &__content
    max-height: 0
    overflow: hidden
 
    padding-bottom: 56px
    transform: translateY(50px) rotate(5deg)
    
    opacity: 0

    visibility: hidden
    transition: .4s

  &__title 
    font-size: 22px
    font-weight: 700

    margin-right: 10px

  &__delete-icon
    height: 18px
    width: auto

    fill: var(--color-accent-red)    
    opacity: 0

    transition: .1s

  &__pen-icon
    height: 14px
    width: auto

    margin-right: 12px
    transform: rotate(-10deg)

    opacity: 0

    trasnstion: .1s

  &__side 
    position: relative

  &__drag-icon
    position: absolute
    left: -22px
    top: 4px

    opacity: 0
    
    transition: .2s 
    cursor: grab

  &:hover
    .section__drag-icon
      opacity: 1
      transition: .2s

  &__num
    width: 26px
    height: 26px
    display: flex
    justify-content: center
    align-items: center

    font-size: 12px
    font-weight: 700

    background: var(--color-accent-blue)
    color: var(--color-text-contrast)
    border-radius: 50%

  &__line
    width: 2px
    height: calc(100% - 26px)

    position: relative
    left: 50%
    transform: translateX(-50%)

    background: var(--color-accent-blue)

    transition: .5s


</style>
