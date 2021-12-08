<template>
  <div>
      LOGIN PAGE
      <div id="firebaseui-auth-container" class="main-panel"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

// Firebase Libs
import { firebasePackage } from '../firebase/firebase'
import 'firebase/auth'
import * as firebaseui from 'firebaseui'

import router from '../router/index'

@Component
export default class SurveyComponent extends Vue {
  mounted () {
    this.initializeFirebaseUI()
  }
  initializeFirebaseUI () {
    var uiConfig = {
      signInOptions: [
        {
          provider: firebasePackage.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD
        }
      ],
      // signInSuccessUrl: '/home',
      callbacks: {
        signInSuccessWithAuthResult (): any {
          router.push("/home")
          return
        }
      }
    }
    var ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebasePackage.auth())
    ui.start('#firebaseui-auth-container', uiConfig)
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
