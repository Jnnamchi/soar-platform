<template>
  <div v-if="!errorText" class="login-completed">
    <p>You have been successfully logged in</p>
    <p>you will be automatically redirected in few seconds</p>
  </div>

  <ErrorText v-else :text="errorText" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ErrorText from '@/components/ErrorText.vue'
import { namespace } from 'vuex-class'
const Auth = namespace('Auth')
import { convertErrorToString } from '@/utils/convert'
import { RouteName } from '@/types/route'

const delayBeforeRedirectToHome = 2000

@Component({
  components: {
    ErrorText,
  },
})
export default class LoginSuccessInfo extends Vue {
  errorText = ''

  @Auth.Action
  getUserInfoAction!: () => Promise<any>

  created() {
    this.userInfo()
  }

  async userInfo() {
    try {
      this.errorText = ''
      const res = await this.getUserInfoAction()
      if (res.status === 'ok') {
        setTimeout(() => {
          this.$router.push({ name: RouteName.Home })
        }, delayBeforeRedirectToHome)
      } else {
        this.errorText = 'Ooops! Something went wrong. Please try again later'
      }
    } catch (error) {
      this.errorText = convertErrorToString(error)
    }
  }
}
</script>

<style lang="scss" scoped>
.login-completed {
  background-color: #83f195a6;

  p {
    padding: 10px;
  }
}
</style>
