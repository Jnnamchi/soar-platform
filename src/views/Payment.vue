<template>
  <div>
      PAYMENT PAGE {{testValue}}
      <!-- STRIPE INTEGRATION WILL GO HERE
      see: https://firebase.google.com/docs/use-cases/payments
      to get started
      -->
  </div>
</template>

<script>

// import router from '../router/index'

export default {
  name: 'PaymentPage',
  props: {

  },
  data () {
    return {
      testValue: "Hello World"
    }
  },
  mounted () {
  },
  methods: {
    paymentSubmittedCallback () {

    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
