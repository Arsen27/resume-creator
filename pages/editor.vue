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
      <div class="editor__preview" ref="previewContainer">
        <iframe ref="iframe">
          Your browser doesn't support resume preview
        </iframe>
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

import ejs from 'ejs'

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
    ...mapGetters('templates', {
      'template': 'template',
      'templates': 'templates',
      'templatesLoading': 'loading',
    }),
    ...mapGetters('resume', ['state']),
  }, 
  methods: {
    ...mapActions('templates', ['loadTemplates', 'loadTemplate']),

    getTemplateData() {
      const fields = this.$store.state.resume
      let customArray = []
      for (const key in fields.custom) {
        customArray.push({
          id: key,
          ...fields.custom[key],
        })
      }

      console.log(customArray)

      return {
        ...fields,
        custom: customArray,
      }
    },
    download() {
      const { getTemplateData, templateId } = this

      const formData = this.jsonToFormData(getTemplateData())

      api.post(`api/pdf/download/${templateId}`, formData, {
        responseType: 'blob'
      })
      .then(res => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'resume.pdf');
      })
      .catch(err => console.log(err.response))
    },
    previewUpdate() {
      const { template, getTemplateData } = this
     
      if (template.body) {
        const body = template.body
        let style = template.style
        style += '* { box-sizing: border-box; }'
        const htmlTemplate = `<html><head><style>${style}</style></head><body>${body}</body></html>`
        const html = ejs.render(htmlTemplate, getTemplateData())
        this.preview.innerHTML = html
      } 
    }
  },
  watch: {
    templatesLoading(value) {
      if (!value) {
        this.templateId = this.templates[0]._id
      }
    },
    async templateId(value) {
      await this.loadTemplate(value)
      this.previewUpdate()
    },
    state: {
      handler(value) {
        this.previewUpdate()
      },
      deep: true,
    },
  },
  created() {
    this.loadTemplates()
  },
  mounted() {
    const { iframe} = this.$refs

    this.preview = iframe.contentWindow.document.body
  }
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

  &__preview
    position: relative
    padding-bottom: 30px
    height: 100%
    box-sizing: border-box

  iframe
    position: relative
    left: 50%
    transform: translateX(-50%)

    width: 550px
    height: 100%

    background: #FFF  
    border: 1px solid var(--color-border-light)
    border-radius: 7px

</style>
