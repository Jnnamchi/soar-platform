<template>
  <div class="home">
    THIS IS THE COMPANY DASHBOARD FOR: {{test}}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component({
  components: {},
  data () {
    return {
      test: "THIS IS DATA"
    }
  },
  methods: {
  },
  mounted () {
    // this.runTest("HIHI")
  },
})
export default class Home extends Vue {}
</script>
