<template>
  <main class="editor">
    <div class="editor__left">
      <header class="editor__header">
        <icons-arrow />
        <h2 class="editor__title">RESUME EDITOR</h2>
      </header>

      <editor-form />
    </div>

    <div class="editor__right">
      
    </div>
  </main>
</template>

<script>

import IconsArrow from '@/components/icons/IconsArrow'

export default {
  components: { 
    IconsArrow, 
  },
}

</script>

<style lang="sass" scoped>

.editor 
  height: 100vh
  display: grid
  grid-template-columns: 690px 1fr

  background: var(--color-bg-main)

  &__left
    padding: 24px 0
    
    overflow-y: scroll

  &__header 
    display: flex
    align-items: center

    padding: 0 30px
    margin-bottom: 52px

  &__title 
    font-size: 22px
    font-weight: 700
    margin-left: 20px

  &__right 
    background: #1D242B

</style>
