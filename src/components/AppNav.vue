<template>
  <nav id="nav">
    <router-link to="/home" class="nav-item">Home</router-link>
    <a v-on:click="logout()" v-if="userLoggedIn" class="nav-item">Logout</a>
  </nav>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'

// Firebase Libs
import { firebasePackage, logoutFirebase } from '@/firebase/firebase'

export default class AppNav extends Vue {
  userLoggedIn: boolean = false

  mounted() {
    this.userLoggedIn = false
    this.isLoggedIn()
  }

  isLoggedIn() {
    // Check if authenticated for protected navigation
    firebasePackage.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userLoggedIn = true
      } else {
        this.userLoggedIn = false
      }
    })
  }

  logout() {
    logoutFirebase()
    firebasePackage
      .auth()
      .signOut()
      .then(() => {
        this.$router.push('/login')
      })
  }
}
</script>
