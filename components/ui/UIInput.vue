<template>
  <div 
    class="input"
    :class="{'input_focused': focused}" 
    @click="setFocus()"    
  >
    <span class="input__label">
      {{ label }}
    </span>

    <input 
      class="input__field"
      type="text"
      v-model="value"
      ref="field"
      @blur.prevent="setBlur()"
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
  },
  data: () => ({
    value: '',
    focused: false,  
  }),
  methods: {
    setFocus() {
      if (this.$props.type === 'text') {
        const { field } = this.$refs
        field.focus()
      }

      this.focused = true
    },
    setBlur() {
      if (!this.value.length) {
        const { field } = this.$refs

        field.blur()
        this.focused = false
      } 
    },
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
