<template>
  <div class="field">
    <div>
      <span 
        class="field__text"
        :style="{ visibility: dataFocused ? 'hidden' : 'visible' }"
      >
        {{ value ? value : '(Not specified)' }}
      </span>
      
      <input
        :value="value"
        ref="input"
        class="field__input" 
        type="text"
        @blur="setBlur"
        @input="$emit('input', $event.target.value)"
      >
    </div>

    <div
      @click.stop="setFocus"
      v-show="!dataFocused" 
    >
      <IconsPen v-if="showPen" class="field__pen-icon" />
    </div>
  </div>
</template>

<script>

import IconsPen from '@/components/icons/IconsPen'

export default {
  components: { IconsPen, },
  props: {
    value: {
      type: String,
      required: false,
    },
    showPen: {
      type: Boolean,
      required: false,
      default: true,
    },
    focused: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({
    dataFocused: false,
  }),
  watch: {
    focused(value) {
      if (value) {
        this.setFocus()
      } else {
        this.setBlur()
      }
    } 
  },
  methods: {
    setFocus() {
      this.$refs.input.style.display = 'block'
      this.$refs.input.focus()
      this.dataFocused = true
    },
    setBlur() {
      this.$refs.input.style.display = 'none'
      this.dataFocused = false
      this.$emit('blur')
    },
  },
  created() {
    this.dataFocused = this.focused
  }
}

</script>

<style lang="sass" scoped>

.field
  position: relative
  display: flex
  align-items: center

  max-width: 100%

  &:hover 
    .field__pen-icon
      opacity: 1
      trasnstion: .2s

  &__input 
    display: none
    width: 100%

    position: absolute
    top: 0

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