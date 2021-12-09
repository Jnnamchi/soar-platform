<template>
  <div class="home">
    Welcome: {{user.name}}

    <br>
    <br>
    <br>
    <div>Your companies:</div>
    <div v-for="company in appData" v-bind:key="company.uid" >
      <div v-if="company.isOwndeBy(user)">
        <router-link :to="{ name: 'CompanyDashboard', params: { appData: appData, companyName: company.name }}">{{company.name}}</router-link>
      </div>
    </div>
    <router-link to="/addCompany">Add New Company</router-link>

    <br>
    <br>
    <div>Your surveys to complete:</div>
    <div v-for="company in appData" v-bind:key="company.name" >
      <br>
      <div v-if="company.isParticipating(user) && company.modules.length > 0">
        <div>{{company.name}}:</div>
        <div v-for="module in company.modules" v-bind:key="module.name">
          <div v-if="!module.hasBeenCompletedBy(user.uid)">
            <div v-on:click="openStartModule(company.name, module.name)">{{module.name}} - start now!</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
import { generateTestUser } from "../data/dataGenerator"

import { Company } from '../data/Company'

@Component
export default class Home extends Vue {
  @Prop() private appData!: Company[]

  user = generateTestUser()
  openStartModule (companyName: string, SOARModuleName: string) {
    this.$router.push({name: 'SurveySection', params: {companyName: companyName, SOARModuleName: SOARModuleName}})
  }
}
</script>
