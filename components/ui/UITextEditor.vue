<template>
  <client-only>
    <vue-editor 
      :value="value" 
      :editorToolbar="customToolbar" 
      @input="updateValue($event)"
    />
  </client-only>
</template>

<script>

export default {
  props: {
    value: {
      type: String,
      required: false,
      default: '',
    },
  },
  data: () => ({
    content: '',
    customToolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["image"]
    ],
  }),
  methods: {
    updateValue(value) {
      this.valueModel = value
      this.$emit('input', value)
    },
  },
}

</script>

<style lang="sass">

.ql-toolbar
  border-radius: 6px 6px 0 0
  border: 1px solid var(--color-border-light)

.ql-container
  border-radius: 0 0 6px 6px
  border: 1px solid var(--color-border-light)
  height: calc(100% - 48px)


</style>
