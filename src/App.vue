<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home" class="nav-item">Home</router-link>
      <router-link to="/payment" class="nav-item">Payment</router-link>
      <a v-on:click="logout()" v-if="userLoggedIn" class="nav-item">Logout</a>
    </div>
    <!-- <keep-alive> -->
    <router-view :key="$route.fullPath" :appData="appData" />
    <!-- </keep-alive> -->
    <!-- {{appData}} -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { AppData } from './data/App'

// Firebase Libs
import { firebasePackage, logoutFirebase } from './firebase/firebase'

@Component
export default class App extends Vue {

  userLoggedIn: boolean = false
  appData = this.generateAppData()
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
      this.$router.push("/login")
    })
  }
  goToPayments () {
    this.$router.push("/payment")
  }
  generateAppData () {
    const newAppData = new AppData()
    return newAppData
  }
}

</script>

<style lang="scss">

* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 20px;
  background-color: #42b983;
  color: white;
  border-bottom: solid #42b983 1px;
  text-align: left;
  a {
    color: white;
    &.router-link-exact-active {
      font-weight: bold;
    }
  }
}

.nav-item {
    margin: auto 15px;
    text-decoration: none;
}

.nav-item:hover {
    cursor: pointer;
    font-weight: bold;
}
</style>
