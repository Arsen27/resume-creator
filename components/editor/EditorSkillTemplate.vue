<template>
  <div 
    v-show="show" 
    class="skill"
    :class="{ 'skill_checked': checked }"
    @click="$emit('click')"
  >
    <span class="skill__name">
      <slot />
    </span>

    <icons-tick v-show="checked" class="skill__tick-icon" />
    <icons-plus v-show="!checked" class="skill__plus-icon" />
  </div>
</template>

<script>

import IconsTick from '@/components/icons/IconsTick.vue'
import IconsPlus from '@/components/icons/IconsPlus.vue'

export default {
  components: { IconsTick, IconsPlus, },
  data: () => ({
    show: true,
  }),
  props: {
    checked: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  watch: {
    checked(value) {
      if (value) {
        setTimeout(() => {
          this.show = false
        }, 2000)
      }
    }
  }
}

</script>

<style lang="sass" scoped>

.skill
  padding: 10px 15px

  border: 1px solid var(--color-border-light)
  border-radius: 10px

  cursor: pointer
  transition: .3s

  &_checked 
    background: var(--color-accent-blue)
    border: none
    color: var(--color-text-contrast)

  &__name
    font-size: 14px
    font-weight: 600
    margin-right: 7px

  &__plus-icon
    width: auto
    height: 10px
    fill: var(--color-text-main)
  
  &__tick-icon
    width: auto
    height: 10px
    fill: var(--color-text-contrast)

</style>
