<template>
  <div 
    class="modal__wrapper"
    v-if="opened"
  >
    <div @click="$emit('switch', false)">
      <icons-cross class="modal__close" />
    </div>

    <div class="modal">
      <div 
        v-if="title"
        class="modal__header"
      >
        <span class="modal__title">{{ title }}</span>
      </div>

      <slot />
    </div>
  </div>
</template>

<script>

import IconsCross from '@/components/icons/IconsCross'

export default {
  name: 'ui-modal',
  model: {
    prop: 'opened',
    event: 'switch',
  },
  props: {
    opened: {
      type: Boolean,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
  },
  components: { IconsCross, }
}

</script>

<style lang="sass" scoped>

.modal
  padding: 30px
  background: #FFFFFF
  border-radius: 17px

  &__wrapper
    display: flex
    justify-content: center
    align-items: center

    position: fixed
    top: 0
    bottom: 0
    left: 0
    right: 0
    z-index: 1000

    background: rgba(0, 0, 0, 0.5)

  &__header
    margin-bottom: 25px

  &__title
    font-size: 24px
    font-weight: 700

  &__close 
    position: absolute
    right: 30px
    top: 15px

    cursor: pointer

</style>
