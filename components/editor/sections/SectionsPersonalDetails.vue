<template>
  <div class="personal-details">
    <div class="personal-details__row">
      <ui-input 
        label="Wanted job title" 
        :value="fields.wantedJob" 
        @input="fieldUpdate('wantedJob', $event)" 
      />
    </div>

    <div class="personal-details__row">
      <ui-input 
        label="First name" 
        :value="fields.firstName"
        @input="fieldUpdate('firstName', $event)" 
      />

      <ui-input 
        label="Last name" 
        :value="fields.lastName"
        @input="fieldUpdate('lastName', $event)"
      />
    </div>

    <div class="personal-details__row">
      <ui-input 
        label="Email" 
        :value="fields.email"
        @input="fieldUpdate('email', $event)"
      />

      <ui-input 
        label="Phone" 
        :value="fields.phone"
        @input="fieldUpdate('phone', $event)"
      />
    </div>
  </div>
</template>

<script>

import UIInput from '@/components/ui/UIInput'

export default {
  components: { UIInput, },
  props: {
    value: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  data: () => ({
    fields: {
      wantedJob: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
  }),
  methods: {
    fieldUpdate(key, value) {
      this.fields = { 
        ...this.fields, 
        [key]: value 
      }

      this.$emit('dataChange', this.fields)
    },
  },
  mounted() {
    this.$emit('dataChange', this.places)
  },
}

</script>

<style lang="sass" scoped>

.personal-details 
  display: grid
  grid-gap: 22px 0

  &__row
    display: grid
    grid-gap: 0 24px

    &:nth-of-type(1)
      grid-template-columns: 1fr

    &:nth-of-type(2)
      grid-template-columns: 1fr 1fr

    &:nth-of-type(3)
      grid-template-columns: 1fr 1fr

</style>
