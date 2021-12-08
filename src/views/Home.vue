<template>
  <div class="home">
    Welcome: {{user.name}}

    <br>
    <br>
    <br>
    <div>Your companies:</div>
    <div v-for="company in companies" v-bind:key="company.uid" >
      <div v-if="company.isOwndeBy(user)">
        <router-link to="/company">{{company.name}}</router-link>
      </div>
      <router-link to="/addCompany">Add New Company</router-link>
    </div>

    <br>
    <br>
    <div>Your consultation groups:</div>
    <div v-for="company in companies" v-bind:key="company.name" >
      <div v-if="company.isParticipating(user)">
        {{company.name}}
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { generateTestCompanies, generateTestUser } from "../data/dataGenerator"

@Component({
  components: {},
  data () {
    return {
      user: generateTestUser(),
      companies: generateTestCompanies(generateTestUser())
    }
  },
  methods: {
    runTest () {
    }
  },
  mounted () {
    // this.runTest("HIHI")
  },
})
export default class Home extends Vue {}
</script>
