<template>
  <div class="activities">
    <draggable v-model="activities">
      <editor-card
        class="activities__item"
        v-for="(item, i) in activitiesMulti" :key="i"
        
        :title="item.title"
        :description="formatedDate(item.date)"
        
        @titleChange="titleChange(i, $event)"
        @delete="removeItem(['activities', item.id])"
      >
        <div class="form">
          <div class="form__row">
            <ui-input label="Function title" v-model="item.title" />
            <ui-input label="Employer" v-model="item.employer" />
          </div>

          <div class="form__row">
            <div class="form__period">
              <ui-date-picker label="Start date" v-model="item.date.from" />
              <ui-date-picker label="End date" v-model="item.date.to" />
            </div>

            <ui-input label="City" v-model="item.city" />
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
      class="activities__add-new-button"
      @click="addItem(['activities'])"
    >
      + ADD NEW
    </ui-button>
  </div>
</template>

<script>

import UIButton from '@/components/ui/UIButton'

import draggable from 'vuedraggable'

import { mapActions, mapMutations } from 'vuex'
import { mapMultiRowFields, mapFields } from 'vuex-map-fields'

import { dateFormat } from '@/mixins'

export default {
  mixins: [ dateFormat ], 
  components: { UIButton, draggable },
  computed: {
    ...mapMultiRowFields('resume', { activitiesMulti: 'activities' }),
    ...mapFields('resume', ['activities']),
  },
  methods: {
    ...mapMutations('resume', [
      'addItem',
      'removeItem',
    ]),
    ...mapActions('resume', [
      'initItems',
    ]), 

    titleChange(i, text) {
      this.activities[i].title = text
    },
  },
  created() {
    this.initItems('activities')
  },
}

</script>

<style lang="sass" scoped>

.activities

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
