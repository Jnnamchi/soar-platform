<template>
  <nav class="nav">
    <router-link to="/" class="nav-item">Home</router-link>
    <span @click="logout" class="nav-item">Logout</span>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class AppNav extends Vue {
  logout() {
    this.$store.dispatch('moduleAuth/onLogout')
    this.$router.push({ name: 'login' })
  }
}
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #42b983;
  color: white;
  border-bottom: solid #42b983 1px;
  text-align: left;

  .nav-item {
    color: white;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}

.nav-item {
  margin: auto 15px;
  text-decoration: none;
}
</style>
