<template>
  <div>
    <AuthWrapper>
      <EmailForm class="form" />
    </AuthWrapper>
  </div>
</template>

<script lang="ts">
import AuthWrapper from '@/components/auth/AuthWrapper.vue'
import EmailForm from '@/components/auth/EmailForm.vue'

export default {
  components: {
    AuthWrapper,
    EmailForm,
  },
}
</script>

<style lang="scss" scoped>
.form {
  margin-top: 50px;
}
</style>
