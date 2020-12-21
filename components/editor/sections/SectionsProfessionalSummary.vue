<template>
  <ui-text-editor v-model="professionalSummary" />
</template>

<script>

import UITextEditor from '@/components/ui/UITextEditor'
import { mapFields } from 'vuex-map-fields'

export default {
  components: { UITextEditor, },
  computed: {
    ...mapFields('resume', ['professionalSummary']),
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

<style lang="sass">

</style>

