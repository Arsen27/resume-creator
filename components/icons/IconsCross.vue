<template>
  <div class="cross">
    <div class="cross__line cross__line_first"></div>
    <div class="cross__line cross__line_second"></div>
  </div>
</template>

<style lang="sass" scoped>

.cross 
  position: relative
  transform: rotate(45deg)

  &__line
    height: 35px
    width: 3px
    
    background: #FFFFFF
    border-radius: 10px
    
    &_second 
      position: absolute
      top: 0
      transform: rotate(90deg)

</style>
