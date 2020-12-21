<template>
  <div class="personal-details">
    <div class="personal-details__row">
      <ui-input 
        label="Wanted job title" 
        v-model="wantedJob"
      />

      <!-- <picture-input 
        ref="pictureInput"
        width="500"
        height="56" 
        margin="16" 
        accept="image/jpeg,image/png" 
        size="10" 
        buttonClass="test"
        :custom-strings="{
          upload: '<h1>Bummer!</h1>',
          drag: 'Drag a 😺 GIF or GTFO'
        }"
        @change="onChange">
      </picture-input>

      <div class="test">The test</div> -->
    </div>

    <div class="personal-details__row">
      <ui-input 
        label="First name" 
        v-model="firstName"
      />

      <ui-input 
        label="Last name" 
        v-model="lastName"
      />
    </div>

    <div class="personal-details__row">
      <ui-input 
        label="Email" 
        v-model="email"
      />

      <ui-input 
        label="Phone" 
        v-model="phone"
      />
    </div>
  </div>
</template>

<script>

import UIInput from '@/components/ui/UIInput'

import { mapFields } from 'vuex-map-fields'

export default {
  components: { UIInput },
  props: {
    value: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  computed: {
    ...mapFields('resume', [
      'wantedJob',
      'firstName',
      'lastName',
      'email',
      'phone',
    ]),
  },
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
