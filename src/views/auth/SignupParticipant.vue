<template>
  <div>
    <p class="auth__intro">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio facilisis
      malesuada diam nisl vel enim nisi. Mattis ut iaculis amet ultrices nibh.
    </p>

    <SignupParticipantForm
      v-if="signupStep === 1"
      :submitFormCb="submitParticipantForm"
    />

    <InfoSuccess
      v-if="signupStep === 2"
      :text="'You have been successfully signed up'"
    >
      <router-link :to="{ name: 'login' }" class="redirect__link"
        >Login</router-link
      ></InfoSuccess
    >

    <p v-if="signupStep !== 2" class="redirect">
      Already a member?
      <router-link :to="{ name: 'login' }" class="redirect__link"
        >Login</router-link
      >
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SignupParticipantForm from '@/components/auth/SignupParticipantForm.vue'
import InfoSuccess from '@/components/info/InfoSuccess.vue'

@Component({
  components: {
    SignupParticipantForm,
    InfoSuccess,
  },
})
export default class SignupParticipant extends Vue {
  signupStep = 1

  submitParticipantForm() {
    this.signupStep = 2
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
