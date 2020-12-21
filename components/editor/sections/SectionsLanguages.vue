<template>
  <div class="langs">
    <draggable v-model="languages">
      <editor-card
        class="langs__lang"
        v-for="(lang, i) in languagesMulti" :key="i"
        
        :title="lang.name"
        
        @delete="removeItem(['languages', lang.id])"
      >
        <div class="form">
          <div class="form__row">
            <ui-input label="Language" v-model="lang.name" />
            <ui-level-select label="Level" v-model="lang.level" />
          </div>
        </div>
      </editor-card>    
    </draggable>

    <ui-button 
      class="langs__add-new-button"
      @click="addItem(['languages'])"
    >
      + ADD NEW
    </ui-button>
  </div>
</template>

<script>

import UIButton from '@/components/ui/UIButton'
import UILevelSelect from '@/components/ui/UILevelSelect'

import draggable from 'vuedraggable'

import { mapActions, mapMutations } from 'vuex'
import { mapMultiRowFields, mapFields } from 'vuex-map-fields'


export default {
  components: { UIButton, UILevelSelect, draggable },
  computed: {
    ...mapMultiRowFields('resume', { languagesMulti: 'languages' }),
    ...mapFields('resume', ['languages']),
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
    this.initItems('languages')
  },
}

</script>

<style lang="sass" scoped>

.langs

  &__lang 
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
