<template>
  <div>
    <div v-if="!errorText" class="form">
      <p class="form__text">Email</p>
      <AppInput
        type="text"
        class="form__input"
        :placeholder="'Enter your email address'"
        v-model="loginData.email"
        :status="emailValidationInfo"
      />

      <p class="form__text">Password</p>
      <AppInput
        :type="'password'"
        class="form__input"
        :placeholder="'Enter your password'"
        v-model="loginData.password"
        :status="passwordValidationInfo"
      />

      <div class="form__control">
        <div class="remember">
          <input type="radio" id="remember" /><label for="remember"
            >Remember for 30 days</label
          >
        </div>
        <router-link :to="{ name: 'reset-password-request' }" class="pass__link"
          >Forgot password</router-link
        >
      </div>

      <AppButton
        @click.native="submitButtonHandler"
        class="button form__button"
        :isLoading="isLoading"
        >Sign in</AppButton
      >
    </div>

    <InfoError v-else :text="errorText" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppButton from '@/components/UI/AppButton.vue'
import AppInput from '@/components/UI/AppInput.vue'
import { checkEmailValidation } from '@/utils/validation'
import { namespace } from 'vuex-class'
const Auth = namespace('Auth')
import { convertErrorToString } from '@/utils/convert'
import { IAuthData } from '@/types/auth'
import InfoError from '@/components/info/InfoError.vue'

const LoginFormProps = Vue.extend({
  props: {
    loginSuccessCb: Function,
  },
})

@Component({
  components: {
    AppButton,
    AppInput,
    InfoError,
  },
})
export default class LoginForm extends LoginFormProps {
  loginData = {
    email: '',
    password: '',
  }
  emailValidationInfo = {
    type: '',
    text: '',
  }
  passwordValidationInfo = {
    type: '',
    text: '',
  }
  isLoading = false
  errorText = ''

  @Auth.Action
  loginInitialAction!: (data: IAuthData) => Promise<any>

  async submitButtonHandler() {
    this.emailValidation()
    this.passValidation()

    const validationSuccess =
      !this.emailValidationInfo.type && !this.passwordValidationInfo.type

    if (validationSuccess) {
      this.isLoading = true

      try {
        this.errorText = ''
        const res = await this.loginInitialAction(this.loginData)
        if (res.status === 'ok') {
          this.loginSuccessCb()
        } else {
          this.errorText = 'Ooops! Something went wrong. Please try again later'
        }
      } catch (error) {
        this.errorText = convertErrorToString(error)
      } finally {
        this.isLoading = false
      }
    }
  }

  emailValidation() {
    const isEmailValid = checkEmailValidation(this.loginData.email.trim())
    if (!isEmailValid) {
      this.emailValidationInfo = {
        type: 'error',
        text: "Email wasn't validated",
      }
    } else {
      this.emailValidationInfo = {
        type: '',
        text: '',
      }
    }
  }

  passValidation() {
    if (this.loginData.password.length < 6) {
      this.passwordValidationInfo = {
        type: 'error',
        text: 'Password length must be greater than 6 characters',
      }
    } else {
      this.passwordValidationInfo = {
        type: '',
        text: '',
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
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

    .remember {
      display: flex;
      align-items: center;

      input {
        margin-right: 5px;
      }
    }

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

.refresh {
  text-decoration: underline;
  cursor: pointer;
}
</style>
