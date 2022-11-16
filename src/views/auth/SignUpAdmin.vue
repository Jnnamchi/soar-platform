<template>
  <div>
    <AuthWrapper>
      <p class="auth__intro">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio facilisis
        malesuada diam nisl vel enim nisi. Mattis ut iaculis amet ultrices nibh.
      </p>

      <EmailForm :title="'Start your registration'" />

      <p class="redirect">
        Already a member?
        <router-link :to="{ name: 'login' }" class="redirect__link"
          >Login</router-link
        >
      </p>
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
.auth__intro {
  margin-bottom: 15px;
  color: #505f79;
  font-size: 14px;
  line-height: 20px;
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
