<template>
  <div class="main">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class AppMain extends Vue {}
</script>

<style lang="scss" scoped>
.main {
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 16px 40px 2px rgba(#aaa, 0.5);
  background-color: #fff;
}
</style>
