<template>
  <div class="success">
    <IconSuccess class="success-icon" />
    <div class="success-info">
      <p class="title">Success!</p>
      <p class="text">{{ text }}</p>

      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import IconSuccess from '@/components/UI/IconSuccess.vue'

const InfoSuccessProps = Vue.extend({
  props: {
    text: String,
  },
})

@Component({
  components: {
    IconSuccess,
  },
})
export default class InfoSuccess extends InfoSuccessProps {}
</script>

<style lang="scss" scoped>
.success {
  display: flex;
  padding: 40px 20px;
  border-radius: 3px;
  background-color: #e3fcef;

  &-icon {
    margin-right: 20px;
    transform: scale(2) translateY(2px);
  }
  &-info {
    .title {
      margin-bottom: 8px;
      font-size: 16px;
      font-weight: 600;
    }

    .text {
      margin-bottom: 8px;
      font-size: 14px;
    }

    .link {
      font-size: 14px;
      color: #0052cc;
      cursor: pointer;
    }
  }
}
</style>
