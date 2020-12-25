<template>
  <main>
    <nav class="navigation">
      <nuxt-link class="navigation__link" to="/">Home</nuxt-link>
      <nuxt-link class="navigation__link" to="/editor">Editor</nuxt-link>
    </nav>

    <div class="container">
      <h1>This is the <br> Home Page.</h1>
    </div>
  </main>
</template>

<script>
export default {}
</script>

<style lang="sass" scoped>

main 
  height: 100vh

.navigation
  width: 100%
  display: flex
  justify-content: center

  padding-top: 20px

  &__link 
    margin: 0 20px

.container
  display: flex
  justify-content: center
  align-items: center
  width: 100%

  margin-top: 200px

  h1
    font-weight: 800
    font-size: 70px

</style>
