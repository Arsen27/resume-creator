<template>
  <div class="places">
    <draggable v-if="places.length" :list="places">
      <component 
        :is="itemComponent" 
        class="places__place"
        v-for="(place, i) in places" :key="i"

        :id="place.id"
        :name="place.title"
        :date="place.date"
        
        @delete="deleteItem(place.id)"
        @dataChange="updateData(place.id, $event)"
      />

    </draggable>

    <ui-button 
      class="places__add-new-button"
      @click="addNewItem"
    >
      + ADD NEW
    </ui-button>
  </div>
</template>

<script>

import CardsEmployment from '@/components/editor/cards/CardsEmployment'
import CardsEducation from '@/components/editor/cards/CardsEducation'

import UIButton from '@/components/ui/UIButton'

import draggable from 'vuedraggable'


export default {
  components: { 
    CardsEmployment,
    CardsEducation, 

    UIButton, 
    draggable 
  },
  props: {
    itemComponent: {
      type: String,
      required: true,
    },
  }, 
  data: () => ({
    places: [
      {
        id: 0,
        title: '(Not specified)',
        date: {
          from: new Date(),
          to: new Date(),
        },
      },
    ]
  }),
  methods: {
    addNewItem() {
      this.places.push({
        id: this.places.length,
        title: '(Not specified)',
        date: {
          from: new Date(),
          to: new Date(),
        },
      })
    },
    deleteItem(id) {
      this.places.forEach((item, i) => {
        if (item.id === id) {
          this.places.splice(i, 1)

          return
        }
      })
    },
    updateData(id, value) {
      this.places.forEach(item => {
        if (item.id === id) {
          item.value = value
          
          return
        }
      })

      this.$emit('dataChange', this.places)
    },
  },
  mounted() {
    this.$emit('dataChange', this.places)
  },
}

</script>

<style lang="sass" scoped>

.places

  &__place 
    margin-bottom: 20px

    &:last-of-type
      margin-bottom: 0 

  &__add-new-button
    margin-top: 25px

</style>
