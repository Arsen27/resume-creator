<template>
  <div class="links">
    <draggable v-model="links">
      <editor-card
        class="links__link"
        v-for="(link, i) in linksMulti" :key="i"
        
        :title="link.label"
        
        @titleChange="link.label = $event"
        @delete="removeItem(['links', link.id])"
      >
        <div class="form">
          <div class="form__row">
            <ui-input label="Label" v-model="link.label" />
            <ui-input label="Link" v-model="link.link" />
          </div>
        </div>
      </editor-card>    
    </draggable>

    <ui-button 
      class="links__add-new-button"
      @click="addItem(['links'])"
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
    ...mapMultiRowFields('resume', { linksMulti: 'links' }),
    ...mapFields('resume', ['links']),
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
    this.initItems('links')
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
