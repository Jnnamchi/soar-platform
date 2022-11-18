<template>
  <div v-if="isLoading" class="loader"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

const AppLoaderProps = Vue.extend({
  props: {
    isLoading: {
      type: Boolean,
      default: () => false,
    },
  },
})

@Component({
  name: 'AppLoader',
})
export default class AppLoader extends AppLoaderProps {
  get loader(): boolean {
    return this.isLoading
  }
}
</script>

<style lang="scss" scoped>
.loader,
.loader:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}

$fs: 10px;
$bs: 1.25em;
.loader {
  margin: 0 auto;
  font-size: $fs;
  position: relative;
  text-indent: -9999em;
  border-top: $bs solid rgba(255, 255, 255, 0.2);
  border-right: $bs solid rgba(255, 255, 255, 0.2);
  border-bottom: $bs solid rgba(255, 255, 255, 0.2);
  border-left: $bs solid #ffffff;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
