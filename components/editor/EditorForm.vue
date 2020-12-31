<template>
  <div class="form">
    <div class="form__header">
      <ui-textarea
        ref="title"
        style-type="free"
        class="form__title"
        :value="title"
      />

      <!-- <editor-statusbar 
        class="form__statusbar" 
      /> -->
    </div>

    <draggable v-model="sections">
      <editor-section
        v-for="(section, i) in sections" :key="i"

        :number="i + 1"
        :title="section.title"
        :description="section.description"

        @changeTitle="changeSectionTitle([section.id, $event])"
        @delete="removeSection(section.id)"
      >
        <component
          :is="section.component"
          :id="section.id"
          :itemComponent="section.itemComponent"
        />
      </editor-section>
    </draggable>

    <div class="form__additional additional">
      <h2>Add Section</h2>

      <div class="additional__items">
        <div
          class="additional__item"
          v-for="(item, i) in additionalSections" :key="i"

          @click="addSection(item)"
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
import SectionsEmploymentHistory from '@/components/editor/sections/SectionsEmploymentHistory'
import SectionsEducation from '@/components/editor/sections/SectionsEducation'
import SectionsLinks from '@/components/editor/sections/SectionsLinks'
import SectionsCustom from '@/components/editor/sections/SectionsCustom'
import SectionsActivities from '@/components/editor/sections/SectionsActivities'
import SectionsHobbies from '@/components/editor/sections/SectionsHobbies'
import SectionsReferences from '@/components/editor/sections/SectionsReferences'
import SectionsCourses from '@/components/editor/sections/SectionsCourses'
import SectionsInternships from '@/components/editor/sections/SectionsInternships'
import SectionsLanguages from '@/components/editor/sections/SectionsLanguages'

import draggable from 'vuedraggable'
import { saveAs } from 'file-saver';

import { mapMutations, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import formData from '@/mixins/forms/formData.mixin'

import { api } from '@/api'

export default {
  mixins: [ formData ],
  components: { 
    UITextarea,
    EditorStatusbar, 
    EditorSection,

    SectionsPersonalDetails,
    SectionsProfessionalSummary,
    SectionsSkills,
    SectionsEmploymentHistory,
    SectionsEducation,
    SectionsLinks,
    SectionsCustom,
    SectionsActivities,
    SectionsHobbies,
    SectionsReferences,
    SectionsCourses,
    SectionsInternships,
    SectionsLanguages,

    draggable,
  },
  computed: {
    ...mapFields('resume', ['title', 'sections']),
  },
  data: () => ({
    dataSnapshot: {
      title: 'Your Resume Title',
    },
    additionalSections: [
      { 
        icon: 'sliders-h', 
        name: 'Custom Section', 
        used: false, 
        component: 'sections-custom',
        fieldName: 'sectionsCustom',
        key: 'custom',
      },
      { 
        icon: 'running', 
        name: 'Extra-curricular Activities', 
        used: false, 
        component: 'sections-activities',
        fieldName: 'sectionsExtra',
        key: 'activities',
      },
      { 
        icon: 'chess-knight', 
        name: 'Hobbies', 
        used: false, 
        component: 'sections-hobbies',
        fieldName: 'sectionsHobbies',
        key: 'hobbies',
      },
      { 
        icon: 'list-ul', 
        name: 'References', 
        used: false, 
        component: 'sections-references',
        fieldName: 'sectionsReferences',
        key: 'references',
      },
      { 
        icon: 'medal', 
        name: 'Courses', 
        used: false, 
        component: 'sections-courses',
        fieldName: 'sectionsCourses',
        key: 'courses',
      },
      { 
        icon: 'briefcase', 
        name: 'Internship', 
        used: false, 
        component: 'sections-internships',
        fieldName: 'sectionsInternships',
        key: 'internships',
      },
      { 
        icon: 'globe-europe', 
        name: 'Languages', 
        used: false, 
        component: 'sections-languages',
        fieldName: 'sectionsLanguages',
        key: 'languages',
      },
    ],
  }),
  methods: {
    ...mapMutations('resume', [
      'addSection',
      'removeSection',
      'changeSectionTitle',
    ]),
  },
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
