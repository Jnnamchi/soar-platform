<template>
  <div class="input-container">
    <input
      :value="inputValue"
      @input="updateInput($event)"
      class="input"
      :placeholder="inputPlaceholder"
      :type="inputType"
    />
    <p class="text">
      <IconSuccess v-if="info && info.type === 'success'" class="text-icon" />
      <IconError v-if="info && info.type === 'error'" class="text-icon" />
      <span
        v-if="info"
        :class="{
          'text-success': info.type === 'success',
          'text-error': info.type === 'error',
        }"
        >{{ info.text }}</span
      >
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

const InputProps = Vue.extend({
  props: {
    value: String,
    placeholder: String,
    type: String,
    info: Object,
  },
})

@Component({
  name: 'AppInput',
})
export default class AppInput extends InputProps {
  get inputValue(): string {
    return this.value
  }

  get inputPlaceholder(): string {
    return this.placeholder || ''
  }

  get inputType(): string {
    return this.type || 'text'
  }

  updateInput($event: { target: { value: string } }) {
    this.$emit('input', $event.target.value)
  }
}
</script>

<style lang="scss" scoped>
.input-container {
  position: relative;

  .input {
    display: block;
    padding: 12px 8px;
    width: 100%;

    border-radius: 3px;
    border: 2px solid #d7dbe4;

    &:focus {
      border-color: #4c9aff;
    }
  }

  .text {
    display: flex;
    align-items: center;
    margin-top: 2px;
    color: #00875a;
    font-size: 12px;

    &-icon {
      margin-left: 3px;
      margin-right: 4px;
    }
  }
}
</style>
