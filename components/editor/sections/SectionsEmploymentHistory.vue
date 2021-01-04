<template>
  <div class="places">
    <draggable v-model="workExperiences">
      <editor-card
        class="places__place"
        v-for="(place, i) in workExperiencesMulti" :key="i"
        
        :title="place.title"
        :description="formatedDate(place.dateFrom, place.dateTo)"

        @titleChange="place.title = $event"
        @delete="removeItem(['workExperiences', place.id])"
      >
        <div class="form">
          <div class="form__row">
            <ui-input label="Job title" v-model="place.title" />
            <ui-input label="Employer" v-model="place.employer" />
          </div>

          <div class="form__row">
            <div class="form__period">
              <ui-date-picker label="Start date" v-model="place.dateFrom" />
              <ui-date-picker label="End date" v-model="place.dateTo" />
            </div>

            <ui-input label="City" v-model="place.city" />
          </div>

          <div class="form__row">
            <span class="form__label">Description</span>
            <div>
              <ui-text-editor v-model="place.description" />
            </div>
          </div>
        </div>
      </editor-card>    
    </draggable>

    <ui-button 
      class="places__add-new-button"
      @click="addItem(['workExperiences'])"
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
    ...mapMultiRowFields('resume', { workExperiencesMulti: 'workExperiences' }),
    ...mapFields('resume', ['workExperiences']),
  },
  methods: {
    ...mapMutations('resume', [
      'addItem',
      'removeItem',
    ]),
    ...mapActions('resume', [
      'initItems',
    ]), 
  },
  created() {
    this.initItems('workExperiences')
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
