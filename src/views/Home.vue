<template>
  <div class="home">
    <div class="section-title">Welcome {{user.name}}</div>

    <div class="subsection">
      <div class="subsection-title">Your companies</div>
      <div class="flex-parent">
        <div v-for="company in appData" v-bind:key="company.uid">
          <div v-if="company.isOwndeBy(user)">
            <router-link :to="{ name: 'CompanyDashboard', params: { appData: appData, companyName: company.name }}" class="unstyle-link company-select">
              {{company.name}}
            </router-link>
          </div>
        </div>
        <div>
          <router-link to="/addCompany" class="add-company">Add New Company</router-link>
        </div>
      </div>
    </div>

    <div class="subsection">
      <div class="subsection-title">Your surveys to complete</div>
      <div v-for="company in appData" v-bind:key="company.name" >
        <div v-if="company.isParticipating(user) && company.modules.length > 0">
          <div class="company-name">{{company.name}}</div>
          <div v-for="module in company.modules" v-bind:key="module.name">
            <div v-if="!module.hasBeenCompletedBy(user.uid)">
              <div v-on:click="openStartModule(company.name, module.name)" class="company-select">
                <div>{{module.name}}</div>
                <div class="start-module-text">START NOW</div>
              </div>
            </div>
          </div>
          <div class="small-space"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
import { generateTestUser } from "../data/dataGenerator"

import { Company } from '../data/Company'

import '../styles/positions.css'

@Component
export default class Home extends Vue {
  @Prop() private appData!: Company[]

  user = generateTestUser()
  openStartModule (companyName: string, SOARModuleName: string) {
    this.$router.push({name: 'SurveySection', params: {companyName: companyName, SOARModuleName: SOARModuleName}})
  }
}
</script>
