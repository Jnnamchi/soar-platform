<template>
  <div class="layout">
    <AppNav />

    <slot />
  </div>
</template>

<script lang="ts">
import AppNav from '@/components/AppNav.vue'

export default {
  components: {
    AppNav,
  },
}
</script>
