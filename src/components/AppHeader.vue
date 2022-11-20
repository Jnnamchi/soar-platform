<template>
  <header class="app-header">
    <span @click="logout" class="logout">Logout</span>
  </header>
</template>

<script lang="ts">
import { RouteName } from '@/router/route.types'
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class AppHeader extends Vue {
  logout() {
    this.$store.commit('Auth/logout')
    this.$router.push({ name: RouteName.Login })
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  display: flex;
  align-items: center;
  padding: 0 20px;
  background-color: #fafbfc;
  border-bottom: 1px solid #b9b9b9;

  .logout {
    display: block;
    margin-left: auto;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
