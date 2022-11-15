<template>
  <div id="app">
    <router-view :key="$route.fullPath" :appData="appData" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppData } from './data/App'

@Component
export default class App extends Vue {
  appData = this.generateAppData()

  generateAppData() {
    const newAppData = new AppData()
    return newAppData
  }
}
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
  min-height: 100vh;
}
</style>
