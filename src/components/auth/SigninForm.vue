<template>
  <div>
    <div class="form">
      <p class="form__text">Email</p>
      <AppInput
        type="text"
        class="form__input"
        :placeholder="'Enter your email address'"
        v-model="loginData.email"
      />

      <p class="form__text">Password</p>
      <AppInput
        :type="'password'"
        class="form__input"
        :placeholder="'Enter your password'"
        v-model="loginData.password"
      />

      <div class="form__control">
        <div class="remember">Remember for 30 days</div>
        <router-link :to="{ name: 'reset-pass' }" class="pass__link"
          >Forgot password</router-link
        >
      </div>

      <AppButton @click.native="submitButtonHandler" class="button form__button"
        >Sign in</AppButton
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// import { checkEmailValidation } from '@/utils/validation'

const EmailFormProps = Vue.extend({})

@Component
export default class EmailForm extends EmailFormProps {
  loginData = {
    email: '',
    password: '',
  }

  submitButtonHandler() {
    // const isEmailValid = checkEmailValidation(this.inputText.trim())
    console.log('check form validation and login to server', this.loginData)
  }
}
</script>

<style lang="scss" scoped>
.form {
  margin-top: 50px;

  .form__title {
    margin-bottom: 17px;
    font-size: 16px;
    font-weight: 600;
  }

  .form__text {
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 700;
  }

  .form__input {
    margin-bottom: 20px;
    width: 100%;
  }

  .form__control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    font-size: 14px;

    .pass__link {
      font-weight: 600;
      color: #0052cc;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
