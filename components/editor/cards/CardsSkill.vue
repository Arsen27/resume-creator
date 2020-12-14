<template>
  <div class="skill">
    <editor-card
      :title="name"
      :description="showExperience ? description: ''"
      :id="id"
      @delete="$emit('delete')" 
    >
      <div class="form">
        <div class="form__row">
          <ui-input 
            label="Skill" 
            :value="fields.name"
            @input="fieldUpdate('name', $event)" 
          />

          <ui-level-select 
            v-if="showExperience" 
            @input="fieldUpdate('level', $event)"
          />
        </div>
      </div>
    </editor-card>    
  </div>
</template>

<script>

import EditorCard from '@/components/editor/EditorCard'

import UIInput from '@/components/ui/UIInput'
import UIDatePicker from '@/components/ui/UIDatePicker'
import UILevelSelect from '@/components/ui/UILevelSelect.vue'

export default {  
  components: {
    EditorCard, UIInput, UIDatePicker, UILevelSelect,
  },
  props: {
    id: {
      type: Number,
      requried: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      require: false,
      default: '',
    },
    showExperience: {
      type: Boolean,
      required: false,
      default: true,
    }
  },
  data: () => ({
    fields: {
      name: '',
      level: '',
    },
  }),
  methods: {
    fieldUpdate(key, value) {
      this.fields = {
        ...this.fields,
        [key]: value,
      }

      this.$emit('dataChange', this.fields)
    },
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

  &__period
    display: grid
    grid-template-columns: 1fr 1fr
    grid-gap: 0 10px
    
</style>
