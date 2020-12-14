<template>
  <ui-text-editor
    :value="fields.content"
    @input="fieldUpdate('content', $event)" 
  />
</template>

<script>

import UITextEditor from '@/components/ui/UITextEditor'

export default {
  components: { UITextEditor, },
  data: () => ({
    fields: {
      content: '',
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

<style lang="sass">

</style>

