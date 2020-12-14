<template>
  <div class="skill">
    <editor-card
      :title="label"
      :id="id"
      @delete="$emit('delete')" 
    >
      <div class="form">
        <div class="form__row">
          <ui-input 
            label="Label" 
            :value="fields.label"
            @input="fieldUpdate('label', $event)" 
          />

          <ui-input 
            label="Link" 
            :value="fields.link"
            @input="fieldUpdate('link', $event)" 
          />
        </div>
      </div>
    </editor-card>    
  </div>
</template>

<script>

import EditorCard from '@/components/editor/EditorCard'

import UIInput from '@/components/ui/UIInput'

export default {  
  components: {
    EditorCard, UIInput,
  },
  props: {
    id: {
      type: Number,
      requried: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    fields: {
      label: '',
      link: '',
    }
  }),
  methods: {
    fieldUpdate(key, value) {
      this.fields = {
        ...this.fields,
        [key]: value,
      }

      this.$emit('dataChange', this.fields)
    }
  },
}

</script>

<style lang="sass" scoped>

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

    
</style>
