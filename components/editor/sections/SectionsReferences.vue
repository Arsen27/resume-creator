<template>
  <div class="references">
    <draggable v-model="references">
      <editor-card
        class="references__ref"
        v-for="(ref, i) in referencesMulti" :key="i"
        
        :title="ref.name"
        
        @delete="removeItem(['references', ref.id])"
      >
        <div class="form">
          <div class="form__row">
            <ui-input label="Referent's Full Name" v-model="ref.name" />
            <ui-input label="Company" v-model="ref.company" />
          </div>

          <div class="form__row">
            <ui-input label="Phone" v-model="ref.phone" />
            <ui-input label="Email" v-model="ref.email" />
          </div>
        </div>
      </editor-card>    
    </draggable>

    <ui-button 
      class="references__add-new-button"
      @click="addItem(['references'])"
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


export default {
  components: { UIButton, draggable },
  computed: {
    ...mapMultiRowFields('resume', { referencesMulti: 'references' }),
    ...mapFields('resume', ['references']),
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
    this.initItems('references')
  },
}

</script>

<style lang="sass" scoped>

.references

  &__ref 
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

  &__label
    font-weight: 600
    font-size: 16px
    margin-bottom: 15px

</style>
