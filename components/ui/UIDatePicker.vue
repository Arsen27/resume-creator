<template>
  <div 
    class="input"
    :class="{'input_focused': focused}" 
    @click="setFocus(); showField()"
    v-click-outside="hideField"
  >
    <span class="input__label">
      {{ label }}
    </span>

    <span class="input__field">{{ formatedDate }}</span>

    <client-only>
      <div 
        class="input__calendar"
        v-show="dateField" 
      >
        <v-date-picker
          mode="range"
          :value="value"
          :min-date="new Date()"
          show-caps
          @input="updateValue($event)"
        />
      </div>
    </client-only>
  </div>
</template>

<script>

import ClickOutside from 'vue-click-outside'

export default {
  props: {
    label: {
      type: String,
      required: false,
      default: '',
    },
    value: {
      type: Date,
      required: false,
    },
  },
  data: () => ({
    focused: false,
    dateField: false,
    selectedDate: null,
  }),
  methods: {
    setFocus() {
      this.focused = true
    },
    setBlur() {
      if (!this.selectedDate) {
        this.focused = false
      }
    },
    showField() {
      this.dateField = true
    },
    hideField() {
      this.dateField = false
      this.setBlur()
    },
    updateValue(value) {
      this.$emit('input', value)
    },
  },
  computed: {
    formatedDate() {
      const { monthNameShort } = this.$options.filters
      const { value } = this

      if (!value) return ''

      return value.getDate() + ' ' + monthNameShort(value.getMonth())
    }
  },
  directives: {
    ClickOutside,
  },
  updated() {
    if (this.value) {
      this.setFocus()
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

  &__calendar
    z-index: 1000
    position: absolute
    top: 110%
    left: 0


</style>
