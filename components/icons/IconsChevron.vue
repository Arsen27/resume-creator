<template>
  <div 
    class="chevron"
    :class="`chevron_${direction}`"
  >
    <div class="chevron__line chevron__left"></div>
    <div class="chevron__line chevron__right"></div> 
  </div>
</template>

<script>

export default {
  props: {
    direction: {
      type: String,
      required: false,
      default: 'down',
    },
  },
}

</script>

<style lang="sass" scoped>

@keyframes up-left
  0%
    transform: translateX(4px) rotate(-45deg)
  50%
    transform: translateX(4px) rotate(-90deg)
  100%
    transform: translateX(4px) rotate(-135deg)

@keyframes up-right
  0%
    transform: translateX(11px) rotate(45deg)
  50%
    transform: translateX(11px) rotate(90deg)
  100%
    transform: translateX(11px) rotate(135deg)

@keyframes down-left
  0%
    transform: translateX(4px) rotate(-135deg)
  50%
    transform: translateX(4px) rotate(-90deg)
  100%
    transform: translateX(4px) rotate(-45deg)

@keyframes down-right
  0%
    transform: translateX(11px) rotate(135deg)
  50%
    transform: translateX(11px) rotate(90deg)
  100%
    transform: translateX(11px) rotate(45deg)

.chevron
  display: flex
  position: relative
  width: 16px

  &_up
    .chevron__left
      animation: up-left .4s forwards

    .chevron__right
      animation: up-right .4s forwards

  &_down
    .chevron__left
      animation: down-left .4s forwards

    .chevron__right
      animation: down-right .4s forwards
  
  &__line
    width: 2px
    height: 11px

    background: var(--color-text-main)
    border-radius: 2px

  &__left
    position: absolute
    transform: translateX(4px) rotate(-45deg)

  &__right
    transform: translateX(11px) rotate(45deg)

</style>
