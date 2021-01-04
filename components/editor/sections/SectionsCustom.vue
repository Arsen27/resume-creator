<template>
  <div class="custom">
    <draggable>
      <editor-card
        class="custom__item"
        v-for="(item, i) in cards" :key="i"
        
        :title="item.title"
        :description="formatedDate(item.dateFrom, item.dateTo)"
        
        @titleChange="item.title = $event"
        @delete="removeItem(item.id)"
      >
        <div class="form">
          <div class="form__row">
            <ui-input label="Activity name, job title etc." v-model="item.title" />
            <ui-input label="City" v-model="item.city" />
          </div>

          <div class="form__row">
            <div class="form__period">
              <ui-date-picker label="Start date" v-model="item.dateFrom" />
              <ui-date-picker label="End date" v-model="item.dateTo" />
            </div>
          </div>

          <div class="form__row">
            <span class="form__label">Description</span>
            <div>
              <ui-text-editor v-model="item.description" />
            </div>
          </div>
        </div>
      </editor-card>    
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
import { mapMutations } from 'vuex'

import { dateFormat } from '@/mixins'
import UIButton from '@/components/ui/UIButton'

export default {
  mixins: [ dateFormat ],
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  components: { draggable, UIButton, },
  data: () => ({
    cards: [],
  }),
  methods: {
    ...mapMutations('resume', ['updateCustomSection']),

    addNewItem() {
      const { cards } = this

      cards.push({
        id: cards.length,
        title: '',
        city: '',
        dateFrom: new Date(),
        dateTo: new Date(),
        description: '',
      })
    },
    removeItem(id) {
      const { cards } = this 

      cards.forEach((item, i) => {
        if (item.id === id) {
          cards.splice(i, 1)
        }
      })
    },
  },
  created() {
    this.addNewItem()
    this.updateCustomSection([this.id, {
      items: this.cards
    }])
  },
  updated() {
    this.updateCustomSection([this.id, {
      items: this.cards
    }])
  }
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


.form
  display: grid
  grid-gap: 22px 0px

  &__row
    display: grid
    grid-gap: 0px 24px

    &:nth-of-type(1)
      grid-template-columns: 1fr 1fr

    &:nth-of-type(2)
      grid-template-columns: 1fr 1fr

  &__period
    display: grid
    grid-template-columns: 1fr 1fr
    grid-gap: 0 10px
    
  &__label
    font-weight: 600
    font-size: 16px
    margin-bottom: 15px

</style>

