<template>
  <div class="personal-details">
    <div class="personal-details__row">
      <ui-input 
        label="Wanted job title" 
        v-model="wantedJob"
      />

      <div class="photo-input">
        <input 
          class="photo-input__input"
          type="file" 
          ref="photo" 
          id="photo" 
          @change="photoChange()"
        />

        <!-- <label 
          class="photo-input__label"
          for="photo"
        >
          <icons-photo />

          <div class="photo-input__title">
            {{ icon && icon.name || 'Upload photo' }}
          </div>
        </label> -->
      </div>
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

import { mapFields } from 'vuex-map-fields'
import { mapMutations } from 'vuex'

import UIInput from '@/components/ui/UIInput'
import IconsPhoto from '@/components/icons/IconsPhoto'


export default {
  components: { UIInput, IconsPhoto },
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
      'icon',
    ]),
  },
  methods: {
    ...mapMutations('resume', ['setIcon']), 

    fieldUpdate(key, value) {
      this.fields = { 
        ...this.fields, 
        [key]: value 
      }

      this.$emit('dataChange', this.fields)
    },
    photoChange() {
      const { setIcon } = this
      const file = this.$refs.photo.files[0]
      
      setIcon(file)
    }
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


.photo-input
  display: flex
  align-items: center
  
  cursor: pointer

  &__label
    display: flex
    align-items: center
    cursor: pointer

  &__title
    max-width: 170px  
    word-wrap: break-word
    font-weight: 600
    margin-left: 18px

  &__input
    display: none

</style>
