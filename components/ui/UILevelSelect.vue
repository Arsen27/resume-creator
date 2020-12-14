<template>
  <div class="select">
    <span class="select__label">
      Level -
      <span 
        class="select__label-level" 
        :style="{ color: currentLevel.color }"
      >
        {{ currentLevel.name }}
      </span> 
    </span>
    
    <div 
      class="select__field field"
      :style="{ 
        gridTemplateColumns: `repeat(${levels.length}, 1fr)`,
        background: backgroundColor,
      }"
    >
      <div 
        class="field__section"
        v-for="(level, i) in levels" :key="i"
        
        @click="setLevel(i)"
      ></div>

      <div 
        class="field__active"
        :style="{
          width: `${100 / levels.length}%`,
          left: `${(100 / levels.length) * level}%`,
          background: currentLevel.color,
        }"
      ></div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    levels: {
      type: Array,
      required: false,
      default: () => (
        [
          { name: 'Novice', color: 'rgb(232, 72, 72)' },
          { name: 'Beginner', color: 'rgb(219, 108, 53)' },
          { name: 'Skillful', color: 'rgb(255, 194, 51)' },
          { name: 'Experienced', color: 'rgb(175, 209, 115)' },
          { name: 'Expert', color: 'rgb(61, 179, 78)' },
        ]
      ),
    },
  },
  data: () => ({
    level: 0,
  }),
  methods: {
    setLevel(index) {
      const { levels } = this.$props

      this.level = index
      this.$emit('input', levels[index].name)
    },
  },
  computed: {
    currentLevel() {
      const { levels } = this.$props
      const { level } = this

      return this.levels[level]
    },
    backgroundColor() {
      const { levels } = this.$props
      const { level } = this

      let color = levels[level].color
      
      if (color.substr(0, 4) === 'rgb(') {
        return color.substr(0, 3) + 'a' + color.slice(3, -1) + ' ,.3)'
      } else if (color.substr(0, 4) === 'rgba') {
        return color.slice(0, -2) + '3)'
      } 
    }   
  },
  mounted() {
    const { levels } = this.$props

    const newLevel = levels.length - 1
    this.level = newLevel
    this.$emit('input', levels[newLevel].name)
  }
}

</script>

<style lang="sass" scoped>

.select 
  height: 58px
  widht: 100%
  box-sizing: border-box
  display: grid
  grid-template-rows: auto 1fr
  grid-gap: 7px 0

  &__label 
    font-size: 14px

    &-level 
      font-weight: 600


.field
  display: grid
  position: relative
  border-radius: 6px

  &__active
    height: 100%

    position: absolute
    
    border-radius: 6px  

    transition: .2s ease-in

</style>
