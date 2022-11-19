<template>
  <div class="input-container">
    <input
      :value="inputValue"
      @input="updateInput($event)"
      :class="['input', status && status.type === 'error' && 'error']"
      :placeholder="inputPlaceholder"
      :type="inputType"
      :disabled="isDisabled"
    />
    <p class="text" v-if="status">
      <IconSuccess
        v-if="status && status.type === 'success' && status.text"
        class="text-icon"
      />
      <IconError
        v-if="status && status.type === 'error' && status.text"
        class="text-icon"
      />
      <span
        v-if="status && status.type"
        :class="{
          'text-success': status && status.type === 'success',
          'text-error': status && status.type === 'error',
        }"
        >{{ status.text }}</span
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
    status: Object,
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
