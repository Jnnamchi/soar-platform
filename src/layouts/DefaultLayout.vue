<template>
  <div class="layout">
    <AppNav />

    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppNav from '@/components/AppNav.vue'

@Component({
  components: {
    AppNav,
  },
})
export default class DefaultLayout extends Vue {}
</script>
