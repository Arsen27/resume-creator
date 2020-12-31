<template>
  <div class="courses">
    <draggable v-model="courses">
      <editor-card
        class="courses__course"
        v-for="(course, i) in coursesMulti" :key="i"
        
        :title="course.name"
        :description="formatedDate(course.date)"
        
        @titleChange="course.name = $event"
        @delete="removeItem(['courses', course.id])"
      >
        <div class="form">
          <div class="form__row">
            <ui-input label="Course" v-model="course.name" />
            <ui-input label="Institution" v-model="course.institution" />
          </div>

          <div class="form__row">
            <div class="form__period">
              <ui-date-picker label="Start date" v-model="course.date.from" />
              <ui-date-picker label="End date" v-model="course.date.to" />
            </div>
          </div>
        </div>
      </editor-card>    
    </draggable>

    <ui-button 
      class="courses__add-new-button"
      @click="addItem(['courses'])"
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
    ...mapMultiRowFields('resume', { coursesMulti: 'courses' }),
    ...mapFields('resume', ['courses']),
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
    this.initItems('courses')
  },
}

</script>

<style lang="sass" scoped>

.courses

  &__course 
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
