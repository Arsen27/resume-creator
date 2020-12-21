<template>
  <div class="custom">
    <draggable>
      <cards-custom 
        class="custom__item"
        v-for="(item, i) in items" :key="i"

        :id="item.id"
        :title="item.title"
        :date="item.date"

        @delete="deleteItem(item.id)"
        @dataChange="updateData(item.id, $event)"
      />
    </draggable>

    <ui-button 
      class="custom__add-new-button"
      @click="addNewItem"
    >
      + ADD NEW
    </ui-button>
  </div>
</template>

<script>

import draggable from 'vuedraggable'

export default {
  components: { draggable, },
  data: () => ({
    items: [
      {
        id: 0,
        title: '(Not specified)',
        date: {
          from: new Date(),
          to: new Date(),
        },
      }
    ]
  }),
  methods: {
    addNewItem() {
      this.items.push({
        id: this.items.length,
        title: '(Not specified)',
        date: {
          from: new Date(),
          to: new Date(),
        },
      })
    },
    deleteItem(id) {
      this.items.forEach((item, i) => {
        if (item.id === id) {
          this.items.splice(i, 1)

          return
        }
      })
    },
    updateData(id, value) {
      this.items.forEach(item => {
        if (item.id === id) {
          item.value = value
          
          return
        }
      })

      this.$emit('dataChange', this.items)
    },
  },
  mounted() {
    this.$emit('dataChange', this.items)
  },
}

</script>

<style lang="sass" scoped>

.custom

  &__item
    margin-bottom: 20px

    &:last-of-type
      margin-bottom: 0 

  &__add-new-button
    margin-top: 25px

</style>

