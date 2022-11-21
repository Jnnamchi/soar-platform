<template>
  <div class="layout layout__base">
    <AppSidebar class="menu" />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppSidebar from '@/components/containers/AppSidebar.vue'

@Component({
  components: {
    AppSidebar,
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
