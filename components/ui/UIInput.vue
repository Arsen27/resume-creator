<template>
  <div 
    class="input"
    :class="{
      'input_focused': focused,
      'input_error': error,
    }" 
    @click="setFocus()"    
  >
    <span class="input__label">
      {{ label }}
    </span>

    <input 
      class="input__field"
      :type="type"
      :value="value"
      ref="field"
      @blur.prevent="setBlur()"
      @input="updateValue($event.target.value)"
    >
  </div>
</template>

<script>

export default {
  props: {
    type: {
      type: String,
      required: false,
      default: 'text',
    },
    label: {
      type: String,
      required: false,
      default: '',
    },
    value: {
      type: String,
      required: false,
      default: '',
    },
    error: {
      required: false,
      default: false,
    },
  },
  data: () => ({
    valueModel: '',
    focused: false,  
  }),
  methods: {
    setFocus() {
      const { field } = this.$refs
      field.focus()

      this.focused = true
    },
    setBlur() {
      if (!this.valueModel.length) {
        const { field } = this.$refs

        field.blur()
        this.focused = false
      } 
    },
    updateValue(value) {
      this.valueModel = value
      this.$emit('input', value)
    },
  },
  updated() {
    if (this.value) {
      this.setFocus()
      this.valueModel = this.value
    }
  },
}

</script>

<style lang="sass" scoped>

.input
  height: 58px
  width: 100%
  box-sizing: border-box

  position: relative
  padding: 0 18px

  border: 1px solid var(--color-border-light)
  border-radius: 6px
  background: transparent
  
  transition: 0.2s
  cursor: pointer

  &_focused
    border-color: var(--color-accent-blue)

    .input__label
      font-size: 11px

      top: 11px
      transform: translateY(0)

      color: var(--color-accent-blue)

  &_error
    border-color: var(--color-accent-red)

    .input__label
      color: var(--color-accent-red)

  &__label
    font-size: 16px
    font-weight: 600

    position: absolute
    top: 50%
    transform: translateY(-50%)

    transition: 0.2s

  &__field
    font-size: 16px
    font-weight: 600

    width: calc(100% - 36px)

    position: absolute
    bottom: 12px

    border: none
    background: transparent

</style>
