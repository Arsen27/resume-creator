<template>
  <div class="container">
    <Nuxt />
  </div>
</template>

<style lang="sass">

* 
  padding: 0
  margin: 0

:root
  --font-main: 'Gilroy', sans-serif

  --color-text-main: #1C1C1C
  --color-text-light: #3D3A3A
  --color-text-contrast: #FFFFFF
  --color-border-light: #CECECE
  --color-bg-main: #FFFFFF
  --color-bg-light: #E8E8E8
  --color-accent-red: #FF4848
  // --color-accent-blue: #5B8ADB
  --color-accent-blue: #5574f2

// Scroll

*::-webkit-scrollbar
  width: 4px
  background-color: none

*::-webkit-scrollbar-thumb
  border-radius: 4px
  background-color: var(--color-border-light)


body
  font-family: var(--font-main)
  font-weight: 500

  color: var(--color-text-main)

a 
  text-decoration: none
  color: var(--color-text-main)

input 
  outline: none
  font-family: var(--font-main)

textarea 
  outline: none
  font-family: var(--font-main)

button 
  outline: none

// .picture-input
//   background: transparent
//   border: 1px solid var(--color-accent-blue)

</style>

<style lang="sass" scoped>

.container
  height: 100%

</style>
