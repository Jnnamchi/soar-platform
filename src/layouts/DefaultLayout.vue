<template>
  <div class="layout layout__base">
    <AppMenu class="menu" />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppMenu from '@/components/AppMenu.vue'

@Component({
  components: {
    AppMenu,
  },
})
export default class DefaultLayout extends Vue {}
</script>

<style lang="scss" scoped>
.layout__base {
  display: grid;
  grid-template-columns: 250px 1fr;
}
</style>
