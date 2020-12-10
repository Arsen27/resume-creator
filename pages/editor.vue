<template>
  <main class="editor">
    <div class="editor__left">
      <header class="editor__header">
        <icons-arrow />
        <h2 class="editor__title">RESUME EDITOR</h2>
      </header>

      <div class="editor__form form">
        <div class="form__header">
          <ui-textarea
            style-type="free" 
            :font-size="40" 
            :font-weight="800"
            value="JavaScript Frontend Web Developer"
          />

          <EditorStatusbar class="form__statusbar" />
        </div>

        <draggable :list="sections">
          <EditorSection
            v-for="(section, i) in sections" :key="i"

            :number="i + 1"
            :title="section.title"
            :description="section.description"
          > 
            <component :is="section.component"></component>
          </EditorSection>
        </draggable>
      </div>
    </div>

    <div class="editor__right">
      
    </div>
  </main>
</template>

<script>

import IconsArrow from '@/components/icons/IconsArrow'
import UITextarea from '@/components/ui/UITextarea'
import EditorStatusbar from '@/components/editor/EditorStatusbar'
import EditorSection from '@/components/editor/EditorSection'

import SectionsPersonalDetails from '@/components/editor/sections/SectionsPersonalDetails'
import SectionsProfessionalSummary from '@/components/editor/sections/SectionsProfessionalSummary'
import SectionsEmploymentHistory from '@/components/editor/sections/SectionsEmploymentHistory'

import draggable from 'vuedraggable'

export default {
  components: { 
    IconsArrow, 
    UITextarea, 
    EditorStatusbar, 
    EditorSection,

    SectionsPersonalDetails,
    SectionsProfessionalSummary,
    SectionsEmploymentHistory,

    draggable,
  },
  data: () => ({
    sections: [
      { 
        component: 'sections-personal-details', 
        fixed: false, 
        title: 'Personal Details',
        description: '',  
      },
      { 
        component: 'sections-professional-summary', 
        fixed: false, 
        title: 'Professional Summary',
        description: 'Include 2-3 clear sentences about your overall experience',  
      },
      { 
        component: 'sections-employment-history', 
        fixed: false, 
        title: 'Employment History',
        description: 'Include your last 10 years of relevant experience and dates in this section. List your most recent position first.',  
      },
    ],
  }),
}
</script>

<style lang="sass" scoped>

.editor 
  height: 100vh
  display: grid
  grid-template-columns: 690px 1fr

  background: var(--color-bg-main)

  &__left
    padding: 24px 30px
    
    overflow-y: scroll

  &__header 
    display: flex
    align-items: center

    margin-bottom: 52px

  &__title 
    font-size: 22px
    font-weight: 700
    margin-left: 20px

  &__right 
    background: #1D242B


.form

  &__header 
    margin-bottom: 50px
  
  &__statusbar
    margin-top: 35px


</style>
