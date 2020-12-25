<template>
  <div class="admin">
    <div class="admin__header">
      <h2 class="admin__title">
        Templates
      </h2>
    </div>

    <div class="admin__content">
      <div class="admin__templates">
        <div 
          class="admin__template template"
          v-for="template in templates" :key="template.id"
        >
          <nuxt-link :to="`/admin/template/${template._id}`">
            <div class="template__image">
              <img :src="apiUrl + template.icon" alt="template icon">
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

.template
  border: 1px solid var(--color-border-light)
  border-radius: 10px

  overflow: hidden

  &__image
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
