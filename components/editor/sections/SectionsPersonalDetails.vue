<template>
  <div class="personal-details">
    <div class="personal-details__row">
      <ui-input label="Wanted job title" />
    </div>

    <div class="personal-details__row">
      <ui-input label="First name" />

      <ui-input label="Last name" />
    </div>

    <div class="personal-details__row">
      <ui-input label="Email" />

      <ui-input label="Phone" />
    </div>
  </div>
</template>

<script>

import UIInput from '@/components/ui/UIInput'

export default {
  components: { UIInput, }  
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
