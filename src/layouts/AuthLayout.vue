<template>
  <div class="layout layout__auth">
    <div class="container">
      <img class="logo" src="@/assets/img/icons/icon-soarline-logo.svg" />

      <p class="auth__banner">THE #1 BUSINESS TOOL ONLINE</p>

      <h1 class="auth__title">Welcome to Soarline</h1>

      <router-view />

      <div class="auth__bottom">
        <h2 class="bottom__title">watch a quick tour</h2>
        <p class="bottom__text">
          Connect to Soarline and discover how it can help you create a long
          term sustainable growth for your business.
        </p>
        <div class="img-wrapper">
          <img class="bottom__video" src="@/assets/img/images/man.jpg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AuthLayout extends Vue {}
</script>

<style lang="scss" scoped>
.layout__auth {
  padding-top: 40px;
  padding-bottom: 100px;

  .logo {
    margin: 40px 0 80px 10px;
  }

  .auth__banner {
    width: max-content;
    padding: 8px 16px;
    margin-bottom: 15px;
    border-radius: 20px;
    border: 1px solid #a5adba;
    font-size: 11px;
    line-height: 16px;
    text-transform: uppercase;
  }

  .auth__title {
    margin-bottom: 15px;
    font-size: 40px;
    line-height: 50px;
    font-weight: 700;
  }

  .auth__bottom {
    margin-top: 90px;
    width: 417px;
    font-size: 14px;

    .bottom__title {
      margin-bottom: 6px;
      font-weight: 700;
      text-transform: uppercase;
    }

    .bottom__text {
      margin-bottom: 15px;
      color: #505f79;
    }

    .img-wrapper {
      width: 100%;
      height: 185px;
      overflow: hidden;
      border-radius: 8px;
    }
    .bottom__video {
      width: 100%;
      transform: translateY(-45px);
    }
  }
}
</style>
