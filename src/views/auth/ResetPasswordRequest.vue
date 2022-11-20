<template>
  <div>
    <EmailForm
      v-if="resetPassStep === 1 && errorText === ''"
      :title="'Reset password form'"
      :isLoading="isLoading"
      :submitForm="submitEmailForm"
    />

    <InfoSuccess
      v-if="resetPassStep === 2 && errorText === ''"
      :text="'Check your email to reset your password'"
    />

    <InfoError v-if="errorText" :text="errorText" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EmailForm from '@/components/auth/EmailForm.vue'
import InfoSuccess from '@/components/info/InfoSuccess.vue'
import InfoError from '@/components/info/InfoError.vue'
import { convertErrorToString } from '@/utils/convert'

@Component({
  components: {
    EmailForm,
    InfoSuccess,
    InfoError,
  },
})
export default class ResetPassword extends Vue {
  resetPassStep = 1
  isLoading = false
  errorText = ''

  async submitEmailForm(validEmail: string) {
    this.isLoading = true
    try {
      const res = await this.$store.dispatch(
        'Auth/resetPasswordRequestAction',
        validEmail
      )
      if (res && res.status === 204) {
        this.resetPassStep = 2
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
</script>

<style lang="scss" scoped>
.form {
  margin-top: 50px;
}
</style>
