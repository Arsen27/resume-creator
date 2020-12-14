<template>
  <div class="field">
    <span 
      class="field__text"
      v-show="!focused"
    >
      {{ value }}
    </span>
    
    <input
      v-model="value" 
      ref="input"
      class="field__input" 
      type="text"
      @blur="setBlur"
    >

    <div
      @click.stop="setFocus"
      v-show="!focused" 
    >
      <IconsPen class="field__pen-icon" />
    </div>
  </div>
</template>

<script>

import IconsPen from '@/components/icons/IconsPen'

export default {
  components: { IconsPen, },
  data: () => ({
    value: null,
    focused: false,
  }),
  props: {
    placeholder: {
      type: String,
      required: true,
    },
  },
  methods: {
    setFocus() {
      this.$refs.input.style.display = 'block'
      this.$refs.input.focus()
      this.focused = true
    },
    setBlur() {
      this.$refs.input.style.display = 'none'
      this.focused = false
    },
  },
  mounted() {
    this.value = this.$props.placeholder
  }
}

</script>

<style lang="sass" scoped>

.field
  position: relative
  display: flex
  align-items: center

  &:hover 
    .field__pen-icon
      opacity: 1
      trasnstion: .2s

  &__input 
    display: none

    font-size: inherit
    font-weight: inherit

    color: inherit
    background: transparent
    border: 0

  &__pen-icon
    height: 13px
    width: auto

    margin-left: 12px
    transform: rotate(-10deg)

    opacity: 0

    trasnstion: .2s

</style>