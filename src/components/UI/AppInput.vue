<template>
  <input
    :value="inputValue"
    @input="updateInput($event)"
    class="input"
    :placeholder="inputPlaceholder"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

const InputProps = Vue.extend({
  props: {
    value: String,
    placeholder: String,
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

  updateInput($event: { target: { value: string } }) {
    this.$emit('input', $event.target.value)
  }
}
</script>

<style lang="scss" scoped>
.input {
  display: block;
  padding: 12px 8px;
  width: 100%;

  border-radius: 3px;
  border: 2px solid #a5adba;

  &:focus {
    border-color: #4c9aff;
  }
}
</style>
