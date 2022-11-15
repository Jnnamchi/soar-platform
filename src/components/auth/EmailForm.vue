<template>
  <div>
    <div class="form">
      <p class="form__title">Start your registration</p>

      <input
        type="text"
        class="form__input"
        placeholder="Enter your email address"
      />

      <button class="button form__button">Submit</button>
    </div>

    <p class="redirect">
      Already a member?
      <router-link to="/login" class="redirect__link">Login</router-link>
    </p>
  </div>
</template>

<script lang="ts">
export default {}
</script>

<style lang="scss" scoped>
.form {
  padding: 27px;
  margin-bottom: 15px;
  border-radius: 8px;
  background-color: #f4f5f7;

  .form__title {
    margin-bottom: 17px;
    font-size: 16px;
    font-weight: 600;
  }

  .form__input {
    display: block;
    padding: 12px 8px;
    margin-bottom: 17px;
    width: 100%;

    border-radius: 3px;
    border: 2px solid #a5adba;

    &:focus {
      border-color: #4c9aff;
    }
  }
}

.redirect {
  font-size: 11px;
  text-align: center;

  &__link {
    color: #0065ff;
    text-decoration: underline;
  }
}
</style>
