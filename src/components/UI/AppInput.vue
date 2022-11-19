<template>
  <div class="input-container">
    <input
      :value="inputValue"
      @input="updateInput($event)"
      :class="['input', info && info.type === 'error' && 'error']"
      :placeholder="inputPlaceholder"
      :type="inputType"
      :disabled="isDisabled"
    />
    <p class="text" v-if="info">
      <IconSuccess
        v-if="info && info.type === 'success' && info.text"
        class="text-icon"
      />
      <IconError
        v-if="info && info.type === 'error' && info.text"
        class="text-icon"
      />
      <span
        v-if="info && info.type"
        :class="{
          'text-success': info && info.type === 'success',
          'text-error': info && info.type === 'error',
        }"
        >{{ info.text }}</span
      >
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import IconError from './IconError.vue'
import IconSuccess from './IconSuccess.vue'

const InputProps = Vue.extend({
  props: {
    value: String,
    placeholder: String,
    type: String,
    info: Object,
    disabled: Boolean,
  },
})

@Component({
  name: 'AppInput',
  components: {
    IconError,
    IconSuccess,
  },
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

  get isDisabled(): boolean {
    return this.disabled || false
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

    &.error {
      border-color: #de350b;
    }

    &:focus {
      border-color: #4c9aff;
    }
  }

  .text {
    display: flex;
    align-items: center;
    font-size: 12px;

    &-success {
      color: #00875a;
    }

    &-error {
      color: #de350b;
    }

    &-icon {
      margin-left: 3px;
      margin-right: 4px;
    }
  }
}
</style>
