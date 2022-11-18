<template>
  <div v-if="status === 'waiting'" class="confirm">
    <AppLoader class="loader" :isLoading="true" />

    <h1 class="title">Thank you for joining Soarline</h1>
    <h3 class="subtitle">please wait, till your account will be activated</h3>
  </div>

  <div v-else class="error">Oops, something going wrong. Please, try later</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import router from '@/router'

@Component({})
export default class ConfirmRegistration extends Vue {
  status = 'waiting'

  mounted() {
    this.registrationConfirm(this.$route.params.id)
  }

  async registrationConfirm(id: string) {
    const res = await this.$store.dispatch(
      'moduleAuth/onRegistrationConfirm',
      id
    )

    if (res && res.status === 204) {
      router.push({ name: 'login' })
    } else {
      this.status = 'error'
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
