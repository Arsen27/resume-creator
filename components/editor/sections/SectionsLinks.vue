<template>
  <div class="links">
    <draggable v-if="links.length" :list="links">
      <cards-link 
        class="links__link"
        v-for="(link, i) in links" :key="i"

        :id="link.id"
        :label="link.label"
        
        @delete="deleteItem(link.id)"
        @dataChange="updateData(link.id, $event)"
      />

    </draggable>

    <ui-button 
      class="links__add-new-button"
      @click="addNewItem"
    >
      + ADD NEW
    </ui-button>
  </div>
</template>

<script>

import CardsLink from '@/components/editor/cards/CardsLink'

import UIButton from '@/components/ui/UIButton'

import draggable from 'vuedraggable'


export default {
  components: { CardsLink, UIButton, draggable },
  props: {
    itemComponent: {
      type: String,
      required: true,
    },
  }, 
  data: () => ({
    links: [
      {
        id: 0,
        label: '(Not Specified)',
      },
    ]
  }),
  methods: {
    addNewItem() {
      this.links.push({
        id: this.links.length,
        label: '(Not Specified)',
      })
    },
    deleteItem(id) {
      this.links.forEach((item, i) => {
        if (item.id === id) {
          this.links.splice(i, 1)

          return
        }
      })
    },
    updateData(id, value) {
      this.links.forEach(item => {
        if (item.id === id) {
          item.value = value
          
          return
        }
      })

      this.$emit('dataChange', this.links)
    },
  },
  mounted() {
    this.$emit('dataChange', this.links)
  },
}

</script>

<style lang="sass" scoped>

.links

  &__link
    margin-bottom: 20px

    &:last-of-type
      margin-bottom: 0 

  &__add-new-button
    margin-top: 25px

</style>
