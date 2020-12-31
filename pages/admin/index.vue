<template>
  <div class="admin">
    <div class="admin__header">
      <h2 class="admin__title">
        Templates
      </h2>

      <nuxt-link to="/admin/template/create">
        <button class="admin__add-new">Add new</button>
      </nuxt-link>
    </div>

    <div class="admin__content">
      <div class="admin__templates">
        <div 
          class="admin__template template"
          v-for="template in templates" :key="template.id"
        >
          <nuxt-link :to="`/admin/template/${template._id}`">
            <div class="template__image-wrapper">
              <img
                class="template__image" 
                :src="apiUrl + template.icon" 
                alt="template icon"
              >
            </div>

            <div class="template__content">
              <span class="template__name">
                {{ template.name }}
              </span>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import { API_URL } from '@/api'

export default {
  data: () => ({
    apiUrl: API_URL,
  }),
  computed: {
    ...mapGetters({
      templates: 'admin/templates',
      loggedIn: 'auth/loggedIn',
    }),
  },
  methods: {
    ...mapActions('admin', ['loadTemplates']),
  },
  created() {
    if (!this.loggedIn) {
      this.$router.push('/auth/login')
    }

    this.loadTemplates()
  }
}

</script>>

<style lang="sass" scoped>

.admin
  padding: 40px 50px

  &__title
    font-size: 30px
    margin-bottom: 30px

  &__templates
    display: grid
    grid-template-columns: repeat(6, 1fr)
    grid-gap: 25px    

  &__header
    display: flex
    align-items: center
    justify-content: space-between

  &__add-new
    padding: 12px 17px

    color: var(--color-text-contrast)
    border-radius: 100px
    border: 0
    background: var(--color-accent-blue)

    cursor: pointer

.template
  border: 1px solid var(--color-border-light)
  border-radius: 10px

  overflow: hidden

  &__image
    max-height: 90%
    max-width: 90%

    &-wrapper
      width: 100%
      height: 100px
      display: flex
      justify-content: center
      align-items: center

      border-bottom: 1px solid var(--color-border-light)

  &__content
    padding: 20px 20px

  &__name 
    font-size: 18px
    font-weight: 700

</style>
