<template>
  <nav class="app-menu">
    <img class="logo" src="@/assets/img/icons/icon-soarline-logo.svg" />
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class AppMenu extends Vue {}
</script>

<style lang="scss" scoped>
.app-menu {
  background-color: #fafbfc;

  .logo {
    display: block;
    margin: 20px auto;
  }
}
</style>
