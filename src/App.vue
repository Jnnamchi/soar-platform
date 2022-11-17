<template>
  <div id="app">
    <component :is="layout">
      <router-view :key="$route.fullPath" :appData="appData" />
    </component>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppData } from './data/App'
import AuthLayout from '@/layouts/AuthLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const DEFAULT_LAYOUT = 'DefaultLayout'

@Component({
  components: {
    AuthLayout,
    DefaultLayout,
  },
})
export default class App extends Vue {
  appData = this.generateAppData()

  generateAppData() {
    const newAppData = new AppData()
    return newAppData
  }

  get layout() {
    const layout = this.$route.meta?.layout || DEFAULT_LAYOUT
    console.log('layout: ', layout)
    return layout
  }
}
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
  min-height: 100vh;
}
</style>
