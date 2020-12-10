<template>
  <div class="emp-history">
    <draggable :list="sections">
      <cards-employment-place 
        class="emp-history__place"
        v-for="(place, i) in places" :key="i"

        :name="place.title"
        :date="place.date"
      />
    </draggable>
  </div>
</template>

<script>

import CardsEmploymentPlace from '@/components/editor/cards/CardsEmploymentPlace'

import draggable from 'vuedraggable'


export default {
  components: { CardsEmploymentPlace, draggable },  
  data: () => ({
    places: [
      {
        title: 'Some place 1',
        date: {
          from: new Date(),
          to: new Date(),
        },
      },
      {
        title: 'Some place 2',
        date: {
          from: new Date(),
          to: new Date(),
        },
      },
    ]
  }),
}

</script>

<style lang="sass" scoped>

.emp-history

  &__place 
    margin-bottom: 20px

    &:last-of-type
      margin-bottom: 0 

</style>
