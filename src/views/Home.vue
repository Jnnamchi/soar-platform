<template>
  <div class="home">
    <div class="section-title">Welcome {{user.name}}</div>
    <div class="subsection">
      <div class="subsection-title">Your companies</div>
      <div class="flex-parent">
        <div v-for="company in appData.companies" v-bind:key="company.uid">
          <div v-if="company.isOwndeBy(user.uuid)">
            <router-link :to="{ name: 'CompanyDashboard', params: { appData: appData, companyUuid: company.uuid }}" class="unstyle-link company-select">
              {{company.name}}
            </router-link>
          </div>
        </div>
        <div>
          <router-link :to="{ name: 'AddCompanySection', params: { appData: appData.companies }}" class="add-company">Add New Company</router-link>
        </div>
      </div>
    </div>
    <div class="subsection">
      <div class="subsection-title">Your surveys to complete</div>
      <div v-for="company in appData.companies" v-bind:key="company.name" >
        <div v-if="company.isParticipating(user.uuid) && company.modules.length > 0">
          <div class="company-name">{{company.name}}</div>
          <div v-if="company.userHasCompletedAllModules(user.uuid)">
              All surveys have been completed!
          </div>
          <div v-for="module in company.modules" v-bind:key="module.name">
            <div v-if="!company.userHasCompletedModule(user.uuid, module)">
              <router-link
                :to="{
                name: 'SurveySection',
                params: { appData: appData, selectedCompany: company, SOARModule: module }
                }"
                class="company-select">
                <div>{{appData.getModuleName(module)}}</div>
                <div class="start-module-text">START NOW</div>
              </router-link>
              <!-- <div v-on:click="openStartModule(company.name, appData.modules[module].name)" class="company-select">
                
              </div> -->
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

import { getCurrentUserId, getCurrentUser } from '../firebase/firebase'
import { getServerUrl } from '../requests/requests'

import { AppData } from '../data/App'
import { CreateCompanyFromObject } from '../data/Company'
import { CreateModuleFromObject } from '../data/SOARModule'
import { CreateUserFromObject } from '../data/User'

import '../styles/positions.css'

import axios from 'axios'

@Component
export default class Home extends Vue {
  @Prop() private appData!: AppData

  mounted () {
    this.getUserData()
  }

  user = getCurrentUser()
  getUserData () {
    let url = getServerUrl()
    let userId = getCurrentUserId()
    axios.get(url + "/getAllUserData?userId=" + userId)
    .then(response => {
      // Replace all chart data with new data
      this.appData.clearCompanies()
      for (const company of response.data.companies) {
        const newCompany = CreateCompanyFromObject(company)
        this.appData.addCompany(newCompany)
      }
      this.appData.clearModules()
      for (const module of response.data.modules) {
        const newModule = CreateModuleFromObject(module)
        this.appData.addModule(newModule)
      }
      this.appData.clearUsers()
      for (const user of response.data.users) {
        const newUser = CreateUserFromObject(user)
        this.appData.addUser(newUser)
      }
    }).catch(error => {
      if (error) {
        console.log("There was an error")
        console.log(error)
      }
      alert("Error fetching data")
    })
  }
  openStartModule (companyName: string, SOARModuleName: string) {
    this.$router.push({name: 'SurveySection', params: {companyName: companyName, SOARModuleName: SOARModuleName}})
  }
}
</script>
