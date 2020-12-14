<template>
  <div class="form">
    <div class="form__header">
      <ui-textarea
        style-type="free"
        class="form__title"
        :value="dataSnapshot.title"
      />

      <editor-statusbar class="form__statusbar" />
    </div>

    <draggable :list="sections">
      <editor-section
        v-for="(section, i) in sections" :key="i"

        :number="i + 1"
        :title="section.title"
        :description="section.description"
      >
        <component
          :is="section.component"
          :itemComponent="section.itemComponent"
          @dataChange="updateData(section.fieldName, $event)"
        />
      </editor-section>
    </draggable>

    <div class="form__additional additional">
      <h2>Add Section</h2>

      <div class="additional__items">
        <div
          class="additional__item"
          v-for="(item, i) in additionalSections" :key="i"
        >
          <font-awesome-icon class="additional__icon" :icon="item.icon" />

          <span class="additional__name">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import UITextarea from '@/components/ui/UITextarea'
import EditorStatusbar from '@/components/editor/EditorStatusbar'
import EditorSection from '@/components/editor/EditorSection'

import SectionsPersonalDetails from '@/components/editor/sections/SectionsPersonalDetails'
import SectionsProfessionalSummary from '@/components/editor/sections/SectionsProfessionalSummary'
import SectionsSkills from '@/components/editor/sections/SectionsSkills'
import SectionsPlaces from '@/components/editor/sections/SectionsPlaces'
import SectionsLinks from '@/components/editor/sections/SectionsLinks'

import draggable from 'vuedraggable'


export default {
  components: { 
    UITextarea, 
    EditorStatusbar, 
    EditorSection,

    SectionsPersonalDetails,
    SectionsProfessionalSummary,
    SectionsSkills,
    SectionsPlaces,
    SectionsLinks,

    draggable,
  },
  data: () => ({
    dataSnapshot: {
      title: 'Your Resume Title',
    },
    sections: [
      { 
        component: 'sections-personal-details', 
        itemComponent: '',
        fixed: false, 
        title: 'Personal Details',
        description: '',
        fieldName: 'personalDetails',
      },
      { 
        component: 'sections-professional-summary', 
        itemComponent: '',
        fixed: false, 
        title: 'Professional Summary',
        description: 'Include 2-3 clear sentences about your overall experience',  
        fieldName: 'professionalSummary',
      },
      { 
        component: 'sections-places', 
        itemComponent: 'cards-employment',
        fixed: false, 
        title: 'Employment History',
        description: 'Include your last 10 years of relevant experience and dates in this section. List your most recent position first.',  
        fieldName: 'employmentHistory',
      },
      { 
        component: 'sections-places', 
        itemComponent: 'cards-education',
        fixed: false, 
        title: 'Education',
        description: 'If relevant, include your most recent educational achievements and the dates here',  
        fieldName: 'education',
      },
      { 
        component: 'sections-links', 
        itemComponent: '',
        fixed: false, 
        title: 'Websites & Social Links',
        description: 'You can add links to websites you want hiring managers to see! Perhaps It will be  a link to your portfolio, LinkedIn profile, or personal website',  
        fieldName: 'links',
      },
      { 
        component: 'sections-skills', 
        itemComponent: '',
        fixed: false, 
        title: 'Skills',
        description: '',  
        fieldName: 'skills',
      },
    ],
    additionalSections: [
      { icon: 'sliders-h', name: 'Custom Section', used: false, },
      { icon: 'running', name: 'Extra-curricular Activities', used: false, },
      { icon: 'chess-knight', name: 'Hobbies', used: false, },
      { icon: 'list-ul', name: 'References', used: false, },
      { icon: 'medal', name: 'Courses', used: false, },
      { icon: 'briefcase', name: 'Internship', used: false, },
      { icon: 'globe-europe', name: 'Langueges', used: false, },
    ],
  }),
  methods: {
    updateData(key, value) {
      this.dataSnapshot = {
        ...this.dataSnapshot,
        [key]: value,
      }

      console.log('snapshot', this.dataSnapshot)
    },
  }
}
</script>

<style lang="sass" scoped>

.form
  &__header 
    margin-bottom: 50px
    padding: 0 30px
  
  &__title
    font-size: 40px
    font-weight: 800

  &__statusbar
    margin-top: 35px

  &__additional 
    margin-top: 70px
    margin-bottom: 30px
    padding: 0px 30px



.additional
  &__items
    margin-top: 30px

    display: grid
    grid-template-columns: 1fr 1fr
    grid-gap: 25px 0

  &__item
    display: grid
    grid-template-columns: 30px 1fr
    cursor: pointer

  &__name
    font-size: 19px
    font-weight: 600
    margin-left: 10px

  &__icon
    font-size: 1.3em
    color: var(--color-accent-blue)


</style>
