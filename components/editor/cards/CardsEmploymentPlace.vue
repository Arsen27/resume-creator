<template>
  <editor-card
    :title="name"
    :description="formatedDate"
  >
    <div class="form">
      <div class="form__row">
        <ui-input label="Job title" />
        <ui-input label="Employer" />
      </div>

      <div class="form__row">
        <div class="form__period">
          <ui-date-picker label="Start date" />
          <ui-date-picker label="End date" />
        </div>

        <ui-input label="City" />
      </div>
    </div>
  </editor-card>    
</template>

<script>

import EditorCard from '@/components/editor/EditorCard'

import UIInput from '@/components/ui/UIInput'
import UIDatePicker from '@/components/ui/UIDatePicker'

export default {  
  components: {
    EditorCard, UIInput, UIDatePicker,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Object,
      required: true,
    }
  },
  methods: {
    dateFormat(date) {
      const { monthNameShort } = this.$options.filters
      
      return `${date.getDate()} ${monthNameShort(date.getMonth())} ${date.getFullYear()}`
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
    

</style>
