<template>
  <textarea 
    class="textarea"
    :class="`textarea_${styleType}`"
    :style="{
      fontSize: `${fontSize}px`,
      fontWeight: fontWeight,
    }"
    :value="value"
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
    fontSize: {
      type: Number,
      required: false,
      default: 16,
    },
    fontWeight: {
      type: Number,
      required: false,
      default: 500,
    },
    value: {
      type: String,
      required: false,
      default: '',
    }
  }
}

</script>

<style lang="sass" scoped>

.textarea
  width: 100%

  background: transparent
  color: var(--color-text-main)
  
  resize: none

  &_free
    border: 0 

</style>