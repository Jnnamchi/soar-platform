<template>
  <div v-if="status === 'waiting'" class="confirm">
    <AppLoader class="loader" :isLoading="true" />

    <h1 class="title">Thank you for joining Soarline</h1>
    <h3 class="subtitle">please wait, till your account will be activated</h3>
  </div>

  <InfoError v-else :text="errorText" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppLoader from '@/components/UI/AppLoader.vue'
import InfoError from '@/components/info/InfoError.vue'
import { convertErrorToString } from '@/utils/convert'
import { RouteName } from '@/router/route.types'

const delayBeforeRedirectToLogin = 2000

@Component({
  components: {
    AppLoader,
    InfoError,
  },
})
export default class SignupAdminConfirm extends Vue {
  status = 'waiting'
  errorText = ''

  created() {
    this.signupAdminRequest()
  }

  async signupAdminRequest() {
    const routeId = this.$route.params.id

    try {
      const res = await this.$store.dispatch(
        'Signup/signupAdminConfirmAction',
        routeId
      )

      if (res && res.status === 204) {
        setTimeout(() => {
          this.$router.push({ name: RouteName.Login })
        }, delayBeforeRedirectToLogin)
      }
    } catch (error) {
      this.status = 'error'
      this.errorText = convertErrorToString(error)
    }
  }
}
</script>

<style lang="scss" scoped>
.confirm {
  margin-top: 40px;

  .loader {
    margin: 50px 136px;
    font-size: 6px;
    border-left-color: #50e698;
  }

  .title {
    margin-bottom: 10px;
    font-size: 26px;
  }

  .subtitle {
    font-size: 18px;
    font-weight: 400;
  }
}

.error {
  margin: 50px 0;
}
</style>
