<template>
  <div 
    class="toggle" 
    :class="{ 'toggle_on': on }"
    @click="toggle()"
  >
    <div class="toggle__circle"></div>
  </div>
</template>

<script>

export default {
  props: {
    value: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({
    on: false,
  }),
  methods: {
    toggle() {
      this.on = !this.on
      this.$emit('input', this.on)
    }
  },
  created() {
    this.on = this.value
  }
}

</script>

<style lang="sass" scoped>
  
.toggle
  height: 22px
  width: 36px
  display: flex
  align-items: center

  padding: 0 2px
  position: relative

  border-radius: 20px
  background: var(--color-border-light)

  transition: .3s
  cursor: pointer

  &_on
    background: var(--color-accent-blue)

    .toggle__circle
      margin-left: calc(100% - 18px)
      transition: .1s ease-in

  &__circle
    transition: .1s ease-in

    height: 18px
    width: 18px

    background: #FFFFFF
    border-radius: 50%

</style>