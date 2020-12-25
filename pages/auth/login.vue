<template>
  <div class="login">
    <div class="login__header">
      Login
    </div>
    
    <div class="login__content">
      <form @submit.prevent="handleLogin">
        <transition name="error">
          <span 
            class="login__error"
            v-if="errorsEmail.length"
          >
            {{ errorsEmail[0] }}
          </span>
        </transition>
        <div 
          class="login__input"
          ref="emailInput"
        >
          <ui-input 
            label="Email" 
            :error="errorsEmail.length"
            v-model="loginForm.email"
          />
        </div>

        <transition name="error">
          <span 
            class="login__error"
            v-if="errorsPassword.length"
          >
            {{ errorsPassword[0] }}
          </span>
        </transition>
        <div
          class="login__input" 
          ref="passwordInput"
        >
          <ui-input
            label="Password"
            type="password"
            :error="errorsPassword.length"
            v-model="loginForm.password"
          />
        </div>

        <ui-button 
          class="login__submit"
          styleType="filled"
        >
          Submit
        </ui-button>
      </form>
    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import { required, minLength, email } from 'vuelidate/lib/validators'

import UIInput from '@/components/ui/UIInput'
import UIButton from '@/components/ui/UIButton'

export default {
  components: {
    UIInput, UIButton,
  },
  data: () => ({
    submited: false,
  }),
  computed: {
    ...mapFields('auth', ['loggedIn', 'loginForm', 'status.errors']),

    form() {
      return this.$v.loginForm
    },
    errorsEmail() {
      const { email } = this.form
      const { loginForm, submited } = this
      let errors = []

      if (loginForm.email || submited) {
        !email.email    && errors.push('Email is not valid')
        !email.required && errors.push('This field cannot be empty')
      }

      return errors
    },
    errorsPassword() {
      const { password } = this.form
      const { loginForm, submited } = this
      let errors = []

      if (loginForm.password || submited) { 
        !password.minLength && errors.push('Password is invalid')
        !password.required  && errors.push('This field cannot be empty')
      }

      return errors
    }
  },
  methods: {
    ...mapActions('auth', ['login']),

    toAdmin() {
      this.$toasted.clear()
      this.$router.push('/admin')
    },
 
    handleLogin() {
      const { login, errorsEmail, errorsPassword, toAdmin } = this
      const { emailInput, passwordInput } = this.$refs
      this.submited = true

      if (errorsEmail.length) {
        emailInput.style.animation = 'headShake .5s'
      } else if (errorsPassword.length) {
        passwordInput.style.animation = 'headShake .5s'
      } else {
        login()
        .then(() => {
          this.$toasted.show('Logged successfuly')
          
          setTimeout(toAdmin, 1000)
        })
        .catch(error => {
          this.$toasted.show(error.response.data.error.message)
          console.error('Ups', error)
        })
      }
    }
  },
  validations: {
    loginForm: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.toAdmin()
    }
  },
}

</script>

<style lang="sass" scoped>

.login
  width: 330px

  padding: 30px 30px
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)

  border: 1px solid var(--color-border-light)
  border-radius: 10px

  &__header 
    font-size: 24px
    font-weight: 700

    margin-bottom: 30px

  &__error
    display: block
    color: var(--color-accent-red)
    margin-bottom: 10px

  &__input
    margin-bottom: 20px

    &_submited
      animation: headShake .5s

  &__submit
    margin-top: 10px


.error
  &-enter-active
      animation: fadeInDown .3s 

  &-leave-active
      animation: fadeOutUp .3s   

  

</style>
