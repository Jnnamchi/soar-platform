<template>
  <button class="button">
    <slot />
  </button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'AppButton',
})
export default class AppButton extends Vue {}
</script>

<style lang="scss" scoped>
.button {
  width: 100%;
  height: 32px;
  border: none;
  border-radius: 3px;
  color: #fff;
  background-color: #0052cc;
  cursor: pointer;

  &:hover {
    background-color: #1668e4;
  }

  &:active {
    background-color: #0052cc;
  }
}
</style>
