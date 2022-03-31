<template>
  <div>
    <div class="section-title">{{appData.companies[companyUuid].name}}</div>
    <div>
      <div>{{selectedCompany.size}}</div>
      <div>{{selectedCompany.description}}</div>
      <div>Category: {{selectedCompany.category}}</div>
    </div>
    <div class="medium-space"></div>
    <div class="subsection">
        <div class="subsection-title">Participants</div>
        <div>
            There are currently {{selectedCompany.participants.length}} participants registered
        </div>
        <div>
            <div>Existing Users</div>
            <div  v-for="participantUuid in selectedCompany.participants" v-bind:key="participantUuid">
                <div class="add-participant-grid">
                    <div>
                        {{appData.getUserName(participantUuid)}}
                    </div>
                    <div>
                        {{appData.getUserEmail(participantUuid)}}
                    </div>
                    <div class="remove-participant-grid-button">
                        <!-- X -->
                    </div>
                </div>
            </div>
            <div>New Users</div>
            <div  v-for="participant in participantsToAdd" v-bind:key="participant.name">
                <div class="add-participant-grid">
                    <div>
                        <input placeholder="First and last name" v-model="participant.name">
                    </div>
                    <div>
                        <input placeholder="Email" v-model="participant.email">
                    </div>
                    <div class="remove-participant-grid-button">
                        Remove
                    </div>
                </div>
            </div>
            <div class="add-participant-grid">
                <div>
                    <input placeholder="First and last name" v-model="newParticipantData.name">
                </div>
                <div>
                    <input placeholder="Email" v-model="newParticipantData.email">
                </div>
                <div class="add-participant-grid-button" v-on:click="addParticipant()">
                    Add
                </div>
            </div>
        </div>
        <div class="company-select" style="margin-top: 25px"
            v-on:click="submitParticipantChanges()"
        >
            SUBMIT CHANGES
        </div>
    </div>
    <div class="subsection">
      <div class="subsection-title">Currently enrolled modules</div>
      <div class="subsection-title-description">Select a module to view the company's progress</div>
      <div v-if="selectedCompany.modules.length == 0">
        No modules yet, select one below!
      </div>
      <div v-else>
        <div v-for="module in selectedCompany.modules" v-bind:key="module.name">
          <router-link
            :to="{
              name: 'SOARModuleAnalysis',
              params: { appData: appData, selectedCompany: selectedCompany, SOARModule: module }
            }"
            v-if="!(selectedCompany.modules.includes(module.uuid))"
            class="company-select">
            {{appData.getModuleName(module)}}
          </router-link>
        </div>
      </div>
    </div>
    <div class="subsection">
      <div class="subsection-title">Add another module</div>
      <span v-for="module in modules" v-bind:key="module.name">
        <router-link
        :to="{
          name: 'SOARModuleView',
          params: { appData: appData, selectedCompany: selectedCompany, SOARModule: module }
        }"
        v-if="!(selectedCompany.modules.includes(module.uuid))"
        class="company-select">
          {{module.name}}
        </router-link>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
import { CreateUserFromObject } from '../data/User'
import { AppData } from '../data/App'
import { getServerUrl } from '../requests/requests'
import { CreateCompanyFromObject } from '../data/Company'

import { getGrowthModuleSurvey } from '../data/dataGenerator'
import { SOARModule } from '../data/SOARModule'
import '../styles/positions.css'
import '../styles/surveyStyles.css'
import axios from 'axios'

@Component
export default class CompanyDashboard extends Vue {
  @Prop() private appData!: AppData
  @Prop() private companyUuid!: string

  modules: SOARModule[] = []
  selectedCompany = this.appData.companies[this.companyUuid]
  participantsToAdd : any[] = []
  newParticipantData = {
    name: "",
    email: ""
  }

  mounted () {
    this.getAllModules()
  }
  openModuleAnalysis (SOARModuleName: string) {
    this.$router.push({name: 'SOARModuleAnalysis', params: {companyUuid: this.companyUuid, SOARModuleName: SOARModuleName}})
  }
  addParticipant () {
    if (this.newParticipantData.name != "" && this.newParticipantData.email != "") {
      this.participantsToAdd.push(this.newParticipantData)
      this.newParticipantData = {
        name: "",
        email: ""
      }
    } else {
      alert("Name and email must be valid")
    }
  }
  getAllModules () {
    let requestURL = getServerUrl()
    axios.get(requestURL + "/getAllModules")
    .then(response => {
      // Replace all chart data with new data
      const gotModules = response.data.data
      for (let module of gotModules) {
        this.modules.push(new SOARModule(module.uuid, module.name, getGrowthModuleSurvey(module.survey)))
      }
    }).catch(error => {
      if (error) {
        console.log("There was an error")
        console.log(error)
      }
      alert("Error fetching data")
    })
  }
  submitParticipantChanges () {
    const requestBody = {
      "companyUuid": this.companyUuid,
      "add": this.participantsToAdd,
      "remove": []
    }
    let requestURL = getServerUrl()
    axios.post(requestURL + "/updateCompanyParticipants", requestBody)
    .then(response => {
      // Replace all chart data with new data
      const newCompanyData = response.data.company
      for (const userObj of response.data.users) {
        const newUser = CreateUserFromObject(userObj)
        this.appData.addUser(newUser)
      }
      const newCompany = CreateCompanyFromObject(newCompanyData)
      this.appData.replaceCompany(newCompany)
      this.participantsToAdd = []
      this.selectedCompany = this.appData.companies[newCompany.uuid]
    }).catch(error => {
      if (error) {
        console.log("There was an error")
      }
    })
  }
}
</script>
