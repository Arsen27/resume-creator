<template>
  <editor-card
    :title="name"
    :description="formatedDate"
    :id="id"
    @delete="$emit('delete')"
  >
    <div class="form">
      <div class="form__row">
        <ui-input 
          label="School" 
          :value="fields.school"
          @input="fieldUpdate('school', $event)" 
        />
        <ui-input 
          label="Degree" 
          :value="fields.degree"
          @input="fieldUpdate('degree', $event)" 
        />
      </div>

      <div class="form__row">
        <div class="form__period">
          <ui-date-picker 
            label="Start date" 
            :value="fields.startDate"
            @input="fieldUpdate('startDate', $event)" 
          />
          <ui-date-picker 
            label="End date" 
            :value="fields.endDate"
            @input="fieldUpdate('endDate', $event)" 
          />
        </div>

        <ui-input 
          label="City" 
          :value="fields.city"
          @input="fieldUpdate('city', $event)" 
        />
      </div>

      <div class="form__row">
        <span class="form__label">Description</span>
        <div>
          <ui-text-editor 
            :value="fields.description"
            @input="fieldUpdate('description', $event)" 
          />
        </div>
      </div>
    </div>
  </editor-card>    
</template>

<script>

import EditorCard from '@/components/editor/EditorCard'

import UIInput from '@/components/ui/UIInput'
import UIDatePicker from '@/components/ui/UIDatePicker'
import UITextEditor from '@/components/ui/UITextEditor'

export default {  
  components: {
    EditorCard, UIInput, UIDatePicker, UITextEditor,
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
    date: {
      type: Object,
      required: true,
    }
  },
  data: () => ({
    fields: {
      title: '',
      school: '',
      degree: '',
      startDate: new Date(),
      endDate: new Date(),
      city: '',
      description: '',
    },
  }),
  methods: {
    dateFormat(date) {
      const { monthNameShort } = this.$options.filters
      
      return `${monthNameShort(date.getMonth())} ${date.getFullYear()}`
    },
    fieldUpdate(key, value) {
      this.fields = {
        ...this.fields,
        [key]: value,
      }

      this.$emit('dataChange', this.fields)
    },
  },
  computed: {
    formatedDate() {
      const { from, to } = this.$props.date
      const { dateFormat } = this
      
      return dateFormat(from) + ' - ' + dateFormat(to)
    }
  }
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

  &__label
    font-weight: 600
    font-size: 16px
    margin-bottom: 15px

</style>
