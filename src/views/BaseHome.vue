<template>
  <div class="app-container">
    <AppHeader class="header" />
    <div class="main__top">
      <h4>user info: {{ $store.state.Auth.user.email }}</h4>
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
import { RouteName } from '@/types/route'

@Component({
  components: {
    AppButton,
    AppHeader,
    AppMain,
    TeamMembers,
  },
})
export default class BaseHome extends Vue {
  created() {
    if (!this.$store.getters['Auth/isLoggedIn']) {
      this.$router.push({ name: RouteName.Login })
    }
  }

  remove() {
    console.log('remove current user from DB')
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
      margin-top: auto;
      margin-left: auto;
      width: max-content;
      padding: 0 10px;
    }
  }
}
</style>
