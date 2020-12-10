<template>
  <div class="drag">
    <div class="drag__col">
      <div class="drag__dot"></div>
      <div class="drag__dot"></div>
      <div class="drag__dot"></div>
    </div>

    <div class="drag__col">
      <div class="drag__dot"></div>
      <div class="drag__dot"></div>
      <div class="drag__dot"></div>
    </div>
  </div>
</template>

<script>

export default {
  
}

</script>

<style lang="sass" scoped>

.drag 
  display: flex

  &__col 
    display: flex
    flex-direction: column

  &__dot
    height: 4px
    width: 4px

    margin: 1px 2px

    opacity: .6
    background: var(--color-text-light)
    border-radius: 50%


</style>
