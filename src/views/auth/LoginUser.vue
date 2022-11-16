<template>
  <div>
    <AuthWrapper>
      <SigninForm />
    </AuthWrapper>
  </div>
</template>

<script lang="ts">
import AuthWrapper from '@/components/auth/AuthWrapper.vue'
import SigninForm from '@/components/auth/SigninForm.vue'

export default {
  components: {
    AuthWrapper,
    SigninForm,
  },
}
</script>
