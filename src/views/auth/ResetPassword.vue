<template>
  <div>
    <AuthWrapper>
      <EmailForm :title="'Reset password form'" :submitForm="submitEmailForm" />
    </AuthWrapper>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AuthWrapper from '@/components/auth/AuthWrapper.vue'
import EmailForm from '@/components/auth/EmailForm.vue'

@Component({
  components: {
    AuthWrapper,
    EmailForm,
  },
})
export default class SignUpAdmin extends Vue {
  submitEmailForm(validEmail: string) {
    console.log('reset pass validation confirm', validEmail)
  }
}
</script>

<style lang="scss" scoped>
.form {
  margin-top: 50px;
}
</style>
