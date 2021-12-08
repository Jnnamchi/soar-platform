<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <span v-on:click="logout()" v-if="userLoggedIn">Logout</span>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

// Firebase Libs
import { firebasePackage, logoutFirebase } from './firebase/firebase'

@Component
export default class App extends Vue {

  userLoggedIn: boolean = false
  mounted () {
    this.userLoggedIn = false
    this.isLoggedIn()
  }
  isLoggedIn () {
    // Check if authenticated for protected navigation
    firebasePackage.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userLoggedIn = true
      } else {
        this.userLoggedIn = false
      }
    })
  }
  logout () {
    logoutFirebase()
    firebasePackage.auth().signOut().then(() => {
      // this.$router.push('/')
      console.log("Logged Out")
      this.$router.push("/login")
    })
  }
}

</script>

<style lang="scss">

* {
    box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
