<template>
  <button 
    class="button"
    :class="`button_${styleType}`"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>

export default {
  props: {
    styleType: {
      type: String,
      required: false,
      default: 'free',
    },
  }  
}

</script>

<style lang="sass" scoped>

.button
  cursor: pointer

  &_free
    font-size: 16px
    font-weight: 600

    border: 0
    background: none
    color: var(--color-accent-blue)


</style>
