<template>
  <div>
    <AuthWrapper>
      <EmailForm />
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
