<template>
  <div class="form">
    <p class="form__title">{{ formTitle }}</p>

    <AppInput
      class="form__input"
      :placeholder="'Enter your email address'"
      v-model="inputText"
      :info="inputValidationInfo"
    />

    <AppButton @click.native="submitButtonHandler" class="button form__button"
      >Submit</AppButton
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { checkEmailValidation } from '@/utils/validation'

const EmailFormProps = Vue.extend({
  props: {
    title: String,
    submitForm: Function,
  },
})

@Component
export default class EmailForm extends EmailFormProps {
  inputText = 'yy.dev@bk.ru'
  inputValidationInfo = {
    type: '',
    text: '',
  }

  get formTitle(): string {
    return this.title || 'Enter your email'
  }

  submitButtonHandler() {
    const isEmailValid = checkEmailValidation(this.inputText.trim())
    if (isEmailValid) {
      this.submitForm(this.inputText)
      this.inputValidationInfo = {
        type: '',
        text: '',
      }
    } else {
      this.inputValidationInfo = {
        type: 'error',
        text: "Email wasn't validated",
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  padding: 27px;
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
