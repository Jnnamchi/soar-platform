<template>
  <div v-show="value" @click="closePopup" class="popup__overlay">
    <div @click.stop class="popup">
      <div @click="closePopup" class="popup__close" title="Close popup" />

      <div class="popup__content-wrapper">
        <div class="popup__content">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

const PopupProps = Vue.extend({
  props: {
    value: Boolean,
    default: () => false,
  },
})

@Component({})
export default class AppPopup extends PopupProps {
  get isPopupOpen() {
    return this.value
  }

  closePopup() {
    this.$emit('input', false)
  }
}
</script>

<style lang="scss" scoped>
.popup__overlay {
  position: fixed;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(#172b4d, 0.25);

  .popup {
    position: relative;
    border-radius: 10px;
    background-color: #fff;

    &__close {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 5;
      width: 30px;
      height: 30px;
      cursor: pointer;

      &::before,
      &::after {
        position: absolute;
        top: 50%;
        left: 50%;
        display: block;
        content: '';
        height: 2px;
        width: 22px;
        background-color: #444;
      }
      &::before {
        transform: translate(-50%, -50%) rotate(45deg);
      }

      &::after {
        transform: translate(-50%, -50%) rotate(-45deg);
      }

      &:hover {
        &::before,
        &::after {
          background-color: #777;
        }
      }
    }

    &__content-wrapper {
      height: 100%;
      padding: 30px;

      .popup__content {
        height: 100%;
      }
    }
  }
}
</style>
