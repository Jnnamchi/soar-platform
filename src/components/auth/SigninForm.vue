<template>
  <div>
    <div class="form">
      <p class="form__text">Email</p>
      <input
        type="text"
        class="form__input"
        placeholder="Enter your email address"
        value="mehmet@xyz.com"
      />

      <p class="form__text">Password</p>
      <input
        type="password"
        class="form__input"
        placeholder="Enter your password"
      />

      <div class="form__control">
        <div class="remember">Remember for 30 days</div>
        <router-link :to="{ name: 'reset-pass' }" class="pass__link"
          >Forgot password</router-link
        >
      </div>

      <AppButton class="button form__button">Sign in</AppButton>
    </div>
  </div>
</template>

<script lang="ts">
export default {}
</script>

<style lang="scss" scoped>
.form {
  margin-top: 50px;

  .form__title {
    margin-bottom: 17px;
    font-size: 16px;
    font-weight: 600;
  }

  .form__text {
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 700;
  }

  .form__input {
    display: block;
    padding: 12px 8px;
    margin-bottom: 20px;
    width: 100%;

    border-radius: 3px;
    border: 2px solid #a5adba;

    &:focus {
      border-color: #4c9aff;
    }
  }

  .form__control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    font-size: 14px;

    .pass__link {
      font-weight: 600;
      color: #0052cc;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
