<template>
  <div class="skills">
    <div class="skills__items">
      <draggable v-model="skills">
        <editor-card
          class="skills__item"
          v-for="(skill, i) in skillsMulti" :key="i"
          
          :title="skill.name"
          :description="skill.level"
          
          @titleChange="titleChange(i, $event)"
          @delete="removeItem(['skills', skill.id])"
        >
          <div class="form">
            <div class="form__row">
              <ui-input label="Skill" v-model="skill.name" />

              <ui-level-select v-model="skill.level" />
            </div>  
          </div>
        </editor-card>    
      </draggable>

      <ui-button 
        class="skills__add-new-button"
        @click="addItem(['skills'])"
      >
        + ADD NEW SKILL
      </ui-button>
    </div>
  </div>
</template>

<script>

import UIToggle from '@/components/ui/UIToggle'
import UIButton from '@/components/ui/UIButton'
import UILevelSelect from '@/components/ui/UILevelSelect'
import EditorSkillTemplate from '@/components/editor/EditorSkillTemplate'

import draggable from 'vuedraggable'

import { mapActions, mapMutations } from 'vuex'
import { mapMultiRowFields, mapFields } from 'vuex-map-fields'


export default {
  components: { 
    UIToggle, 
    UIButton, 
    UILevelSelect,
    EditorSkillTemplate, 
    draggable, 
  },
  data: () => ({
    skillTemplates: [
      { id: 0, name: 'Communication Skills', checked: false, },
      { id: 1, name: 'Customer Service', checked: false, },
      { id: 2, name: 'Microsoft Office', checked: false, },
      { id: 3, name: 'Computer Skills', checked: false, },
      { id: 4, name: 'Fast Learner', checked: false, },
      { id: 5, name: 'Ability to Multitask', checked: false, },
      { id: 6, name: 'Effective Time Management', checked: false, },
      { id: 7, name: 'Leadership Skills', checked: false, },
    ]
  }),
  computed: {
    ...mapMultiRowFields('resume', { skillsMulti: 'skills' }),
    ...mapFields('resume', ['skills']),
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
      this.skills[i].name = text
    },
  },
  created() {
    this.initItems('skills')
  },
}

</script>

<style lang="sass" scoped>

.skills 
  &__templates
    display: flex
    flex-wrap: wrap

  &__template 
    margin-right: 8px
    margin-bottom: 10px

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
