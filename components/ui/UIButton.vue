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
  border: 0

  &_free
    font-size: 16px
    font-weight: 600

    background: none
    color: var(--color-accent-blue)

  &_filled
    background: var(--color-accent-blue)
    color: var(--color-text-contrast)
    border-radius: 6px

    font-size: 16px
    font-weight: 600

    padding: 13px 20px


</style>
