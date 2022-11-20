<template>
  <div class="app-container">
    <AppHeader class="header" />
    <div class="main__top">
      <h4>
        user info: {{ email }} <span v-if="role">({{ role }})</span>
      </h4>
    </div>
    <AppMain class="main">
      <TeamMembers />

      <AppButton class="remove" @click.native="remove" :isLoading="isLoading"
        >Remove current user from DB</AppButton
      >
    </AppMain>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppButton from '@/components/UI/AppButton.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppMain from '@/components/AppMain.vue'
import TeamMembers from '@/components/home/TeamMembers.vue'
import { RouteName } from '@/router/route.types'

@Component({
  components: {
    AppButton,
    AppHeader,
    AppMain,
    TeamMembers,
  },
})
export default class BaseHome extends Vue {
  email = ''
  role = ''
  isLoading = false

  created() {
    this.init()
  }

  async init() {
    try {
      await this.$store.dispatch('Auth/getUserInfoAction')
      this.email = this.$store.state.Auth.user.email
      this.role = this.$store.state.Auth.user.role
    } catch (error) {
      this.$router.push({ name: RouteName.Login })
    }
  }

  async remove() {
    try {
      this.isLoading = true
      const res = await this.$store.dispatch('Auth/removeCurrentUserAction')

      if (res && res.status === 204) {
        this.$router.push({ name: RouteName.Login })
      }
    } catch (error) {
      throw new Error()
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100%;

  .header {
    height: 50px;
  }

  .main__top {
    height: 100px;
    background-color: #fafbfc;
  }

  .main {
    flex: 1;
    display: flex;
    flex-direction: column;

    .remove {
      // display: none;
      width: 197px !important;
      margin-top: auto;
      margin-left: auto;
      width: max-content;
      padding: 0 10px;
      opacity: 0.4;
      background-color: rgb(155, 18, 18);
    }
  }
}
</style>
