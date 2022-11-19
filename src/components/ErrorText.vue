<template>
  <div class="error-wrapper">
    <p class="title">Error:</p>
    <p class="text error">{{ errorText }}</p>
    <p class="text">
      Please,
      <span class="refresh" @click="refresh">refresh to try again</span>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

const ErrorProps = Vue.extend({
  props: {
    text: String,
    default: () => '',
  },
})

@Component
export default class ErrorText extends ErrorProps {
  get errorText(): string {
    return this.text
  }

  refresh() {
    this.$router.go(0)
  }
}
</script>

<style lang="scss" scoped>
.error-wrapper {
  .title {
    margin-bottom: 10px;
    font-size: 24px;
    font-weight: 600;
  }

  .text {
    margin-bottom: 10px;

    &.error {
      font-size: 18px;
      color: rgb(226, 59, 37);
    }
  }
}
.refresh {
  text-decoration: underline;
  cursor: pointer;
}
</style>
