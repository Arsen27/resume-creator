<template>
  <main class="editor">
    <ui-modal
      title="Select template" 
      v-model="showSelectTemplate"
    >
      <editor-template-select 
        :templates="templates"
        v-model="templateId" 
      />
    </ui-modal>

    <div class="editor__left">
      <header class="editor__header">
        <icons-arrow />
        <h2 class="editor__title">RESUME EDITOR</h2>
      </header>

      <editor-form />
    </div>

    <div class="editor__right">
      <div class="editor__preview">

      </div>
      
      <div class="editor__download">
        <ui-button 
          styleType="free"
          @click="showSelectTemplate = true"
        >
          Select template
        </ui-button>

        <ui-button 
          styleType="filled"
          @click="download"
        >
          Download PDF
        </ui-button>
      </div>
    </div>
  </main>
</template>

<script>

import EditorTemplateSelect from '@/components/editor/EditorTemplateSelect'
import IconsArrow from '@/components/icons/IconsArrow'
import UIButton from '@/components/ui/UIButton'
import UIModal from '@/components/ui/UIModal'

import { mapGetters, mapActions } from 'vuex'
import { api } from '@/api'
import formData from '@/mixins/forms/formData.mixin'

export default {
  name: 'editor',
  mixins: [ formData ],
  components: { 
    IconsArrow, UIButton, UIModal, EditorTemplateSelect,
  },
  data: () => ({
    showSelectTemplate: false,
    templateId: null,
  }),
  computed: {
    ...mapGetters('admin', {
      'templates': 'templates',
      'templatesLoading': 'loading',
    }),
  }, 
  methods: {
    ...mapActions('admin', ['loadTemplates']),

    download() {
      const fields = this.$store.state.resume
      let customArray = []
      for (const key in fields.custom) {
        customArray.push({
          id: key,
          ...fields.custom[key],
        })
      }

      const formData = this.jsonToFormData({ 
        ...fields,
        custom: customArray,
      })

      api.post(`api/pdf/download/${this.templateId}`, formData, {
        responseType: 'blob'
      })
      .then(res => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'resume.pdf');
      })
      .catch(err => console.log(err.response))
    },
  },
  watch: {
    templatesLoading(value) {
      if (!value) {
        this.templateId = this.templates[0]._id
      }
    },
  },
  created() {
    this.loadTemplates()
  },
}

</script>

<style lang="sass" scoped>

.editor 
  height: 100vh
  display: grid
  grid-template-columns: 690px 1fr

  background: var(--color-bg-main)

  &__left
    padding: 24px 0
    
    overflow-y: scroll

  &__header 
    display: flex
    align-items: center

    padding: 0 30px
    margin-bottom: 52px

  &__title 
    font-size: 22px
    font-weight: 700
    margin-left: 20px

  &__right 
    padding: 20px

    display: grid
    grid-template-rows: 1fr auto

    background: #1D242B

  &__download
    padding: 0 10px
    display: flex
    justify-content: space-between

</style>
