<template>
  <div>
    <h1>404 Error</h1>

    <h3>Not Found</h3>

    <p>The resource requested could not be found on this server</p>

    <p>go to <router-link to="/">Home</router-link></p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class ErrorPage extends Vue {}
</script>

<style lang="scss" scoped></style>
