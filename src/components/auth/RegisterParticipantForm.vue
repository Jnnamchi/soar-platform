<template>
  <div>
    <div class="form">
      <p class="form__title">Start your registration</p>

      <AppInput
        class="form__input"
        :placeholder="'Enter your email address'"
        v-model="registerForm.email"
        :status="emailInfo"
      />

      <AppInput
        class="form__input"
        :placeholder="'First name'"
        v-model="registerForm.firstName"
      />

      <AppInput
        class="form__input"
        :placeholder="'Last name'"
        v-model="registerForm.lastName"
      />

      <AppInput
        class="form__input"
        :placeholder="'Choose password'"
        :type="'password'"
        v-model="registerForm.password"
      />

      <AppInput
        class="form__input"
        :placeholder="'Repeat password'"
        :type="'password'"
        v-model="registerForm.passwordConfirm"
      />

      <AppButton class="button form__button" @click.native="submitButtonHandler"
        >Submit</AppButton
      >
    </div>
  </div>
</template>

<script lang="ts">
import { checkEmailValidation } from '@/utils/validation'
import { Component, Vue } from 'vue-property-decorator'
import AppButton from '@/components/UI/AppButton.vue'
import AppInput from '@/components/UI/AppInput.vue'

const RegisterParticipantFormProps = Vue.extend({
  props: {
    validEmail: String,
    submitForm: Function,
  },
})

@Component({
  components: {
    AppButton,
    AppInput,
  },
})
export default class RegisterParticipantForm extends RegisterParticipantFormProps {
  emailInfo = {
    type: '',
    text: '',
  }
  registerForm = {
    email: this.validEmail,
    firstName: '',
    lastName: '',
    password: '',
    passwordConfirm: '',
  }

  submitButtonHandler() {
    const isEmailValid = checkEmailValidation(this.registerForm.email.trim())

    if (isEmailValid) {
      this.submitForm(this.registerForm)
    } else {
      console.log('show validation error')
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  padding: 27px;
  margin-bottom: 15px;
  border-radius: 8px;
  background-color: #f4f5f7;

  .form__title {
    margin-bottom: 17px;
    font-size: 16px;
    font-weight: 600;
  }

  .form__input {
    margin-bottom: 17px;
  }
}

.redirect {
  font-size: 11px;
  text-align: center;

  &__link {
    color: #0065ff;
    text-decoration: underline;
  }
}
</style>
