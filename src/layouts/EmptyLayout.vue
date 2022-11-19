<template>
  <div class="layout layout__empty">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class EmptyLayout extends Vue {}
</script>

<style lang="scss" scoped></style>
