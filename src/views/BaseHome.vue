<template>
  <div class="app-container">
    <AppHeader class="header" />
    <div class="main__top">
      <h4>user info:</h4>
    </div>
    <AppMain class="main">
      <TeamMembers />

      <AppButton class="remove" @click.native="remove"
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

@Component({
  components: {
    AppButton,
    AppHeader,
    AppMain,
    TeamMembers,
  },
})
export default class BaseHome extends Vue {
  user = {
    id: '',
    email: '',
    first_name: '',
  }

  mounted() {
    // this.getUserInfo()
  }

  async getUserInfo() {
    try {
      const res = await this.$store.dispatch('moduleAuth/onGetUserInfo')

      console.log('res: ', res)

      this.user = res.data
    } catch (error) {
      console.log('getUser error', error)
      throw Error()
    }
  }

  async remove() {
    console.log('remove user')
    try {
      const res = await this.$store.dispatch('moduleAuth/onRemoveUser', {
        id: this.user.id,
      })

      console.log('res: ', res)

      if (res && res.status === 204) {
        this.$store.dispatch('moduleAuth/onLogout')
        this.$router.push({ name: 'login' })
      }
    } catch (error) {
      console.log('remove user from db error', error)
      throw Error()
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
      display: none;
      margin-top: auto;
      margin-left: auto;
      width: max-content;
      padding: 0 10px;
    }
  }
}
</style>
