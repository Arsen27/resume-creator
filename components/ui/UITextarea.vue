<template>
  <textarea 
    class="textarea"
    :class="`textarea_${styleType}`"
    :value="value"
    @input="updateValue($event.target.value)"
    rows="1"
  >
  </textarea>
</template>

<script>

export default {
  props: {
    styleType: {
      type: String,
      required: false,
      default: 'default',
    },
    value: {
      type: String,
      required: false,
      default: '',
    }
  },
  methods: {
    updateValue(value) {
      this.$emit('input', value)
    },
  },
}

</script>

<style lang="sass" scoped>

.textarea
  width: 100%
  height: auto

  background: transparent
  color: var(--color-text-main)
  
  resize: none

  &_free
    border: 0 

</style>