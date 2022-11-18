<template>
  <div>
    <EmailForm :title="'Reset password form'" :submitForm="submitEmailForm" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EmailForm from '@/components/auth/EmailForm.vue'

@Component({
  components: {
    EmailForm,
  },
})
export default class ResetPassword extends Vue {
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
