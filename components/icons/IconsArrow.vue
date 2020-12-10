<template>
  <div class="arrow">
    <div class="arrow__short"></div>
    <div class="arrow__main"></div>
  </div>
</template>

<style lang="sass" scoped>

.arrow  
  height: 10px

  display: flex
  align-items: flex-end

  position: relative

  cursor: pointer
  
  &__main
    height: 2px
    width: 26px

    transform: translate(0, -2px)
    
    background: var(--color-text-main)
    border-radius: 3px

  &__short
    height: 2px
    width: 10px
    
    position: absolute
    transform: translate(0, -6px) rotate(-45deg)

    background: var(--color-text-main)
    border-radius: 3px


</style>
