// # TODO
// # 1. Show experience toggle
// # 2. Add from templates

<template>
  <div class="skills">
    <div class="skills__exp-level-show">
      <ui-toggle />
      <span>Don't show experience level</span>
    </div>

    <div class="skills__templates">
      <editor-skill-template 
        class="skills__template"
        v-for="(skill, i) in skillTemplates" :key="skill.id"

        :checked="skill.checked" 
        @click="skillTemplates[i].checked = true"
      >
        {{ skill.name }}
      </editor-skill-template>
    </div>

    <div class="skills__items">
      <draggable v-if="skills.length" :list="skills">
        <cards-skill 
          class="skills__item"
          v-for="skill in skills" :key="skill.id"

          :id="skill.id"
          :name="skill.name"
          :description="skill.level"
          :showExperience="showExperience"

          @delete="deleteItem(skill.id)"
          @dataChange="updateData(skill.id, $event)"
        />
      </draggable>

      <ui-button 
        class="skills__add-new-button"
        @click="addNewItem"
      >
        + ADD NEW SKILL
      </ui-button>
    </div>
  </div>
</template>

<script>

import UIToggle from '@/components/ui/UIToggle'
import UIButton from '@/components/ui/UIButton'
import EditorSkillTemplate from '@/components/editor/EditorSkillTemplate'
import CardsSkill from '@/components/editor/cards/CardsSkill.vue'

import draggable from 'vuedraggable'

export default {
  components: { UIToggle, UIButton, EditorSkillTemplate, CardsSkill, draggable, },
  data: () => ({
    showExperience: true,
    skills: [
      { id: 0, name: '(Not specified)', level: 'Expert', templateId: null, },
    ],
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
  methods: {
    addNewItem() {
      this.skills.push({
        id: this.skills.length,
        name: '(Not specified)',
        level: 'Expert',
        templateId: null,
      })
    },
    deleteItem(id) {
      this.skills.forEach((item, i) => {
        if (item.id === id) {
          this.skills.splice(i, 1)

          return
        }
      })
    },
    updateData(id, value) {
      this.skills.forEach(item => {
        if (item.id === id) {
          item.value = value
          
          return
        }
      })

      this.$emit('dataChange', this.skills)
    },
  },
  mounted() {
    this.$emit('dataChange', this.skills)
  },
}

</script>

<style lang="sass" scoped>

.skills 

  &__exp-level-show
    display: grid
    grid-template-columns: auto 1fr
    grid-gap: 0 13px
    align-items: center

  &__templates
    display: flex
    flex-wrap: wrap

    margin-top: 25px

  &__template 
    margin-right: 8px
    margin-bottom: 10px

  &__items
    margin-top: 30px

  &__item 
    margin-bottom: 20px

    &:last-of-type
      margin-bottom: 0 

  &__add-new-button
    margin-top: 25px



</style>
