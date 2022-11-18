<template>
  <div>
    <p class="auth__intro">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio facilisis
      malesuada diam nisl vel enim nisi. Mattis ut iaculis amet ultrices nibh.
    </p>

    <EmailForm
      v-if="registerStep === 1"
      :title="'Start your registration'"
      :submitForm="submitEmailForm"
    />

    <RegisterAdminForm
      v-if="registerStep === 2"
      :validEmail="validEmail"
      :submitForm="submitAdminForm"
    />

    <div v-if="registerStep === 3" class="success">
      <IconSuccess class="success-icon" />
      <div class="success-info">
        <p class="title">Success!</p>
        <p class="text">Check your email to activate your account</p>
        <p class="link">Didn’t get email? click here</p>
      </div>
    </div>

    <p class="redirect">
      Already a member?
      <router-link :to="{ name: 'login' }" class="redirect__link"
        >Login</router-link
      >
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EmailForm from '@/components/auth/EmailForm.vue'
import RegisterAdminForm from '@/components/auth/RegisterAdminForm.vue'
import IconSuccess from '@/components/UI/IconSuccess.vue'

@Component({
  components: {
    EmailForm,
    RegisterAdminForm,
    IconSuccess,
  },
})
export default class RegisterAdmin extends Vue {
  registerStep = 1
  validEmail = ''

  submitEmailForm(validEmail: string) {
    this.registerStep = 2
    this.validEmail = validEmail
  }

  submitAdminForm() {
    this.registerStep = 3
  }
}
</script>

<style lang="scss" scoped>
.auth__intro {
  margin-bottom: 15px;
  color: #505f79;
  font-size: 14px;
  line-height: 20px;
}

.success {
  display: flex;
  padding: 20px;
  border-radius: 3px;
  background-color: #e3fcef;

  &-icon {
    margin-right: 20px;
    transform: scale(2) translateY(2px);
  }
  &-info {
    .title {
      margin-bottom: 8px;
      font-size: 16px;
      font-weight: 600;
    }

    .text {
      margin-bottom: 8px;
      font-size: 14px;
    }

    .link {
      font-size: 14px;
      color: #0052cc;
      cursor: pointer;
    }
  }
}

.redirect {
  margin-top: 15px;
  font-size: 11px;
  text-align: center;

  &__link {
    color: #0065ff;
    text-decoration: underline;
  }
}
</style>
