<template>
  <div>
    <div class="section-title">{{companyName}}</div>
    <div>
      <div>{{selectedCompany.size}} employees</div>
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
            <!-- <div v-for="participant in selectedCompany.participants" v-bind:key="participant">
                {{participant}}
            </div> -->
            <div  v-for="participant in participantsToAdd" v-bind:key="participant.email">
                <div class="add-participant-grid">
                    <div>
                        {{participant.name}}
                    </div>
                    <div>
                        {{participant.email}}
                    </div>
                    <div class="remove-participant-grid-button">
                        X
                    </div>
                </div>
            </div>
            <div class="add-participant-grid">
                <div>
                    <input placeholder="First and Last name" v-model="newParticipantData.name">
                </div>
                <div>
                    <input placeholder="Email" v-model="newParticipantData.email">
                </div>
                <div class="add-participant-grid-button" v-on:click="addParticipant()">
                    Add
                </div>
            </div>
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
          <div v-on:click="openModuleAnalysis(module.name)" class="company-select">{{module.name}}</div>
        </div>
      </div>
    </div>
    <div class="subsection">
      <div class="subsection-title">Add another module</div>
      <span v-for="module in modules" v-bind:key="module.name">
        <router-link
        :to="{
          name: 'SOARModuleView',
          params: { SOARModule: module, appData: appData, selectedCompany: selectedCompany, companyName: companyName }
        }"
        class="company-select">
          {{module.name}}
        </router-link>
      </span>
      <div class="company-select">Margin Module</div>
      <div class="company-select">Sales Module</div>
      <div class="company-select">HR Module</div>
    </div>
    <button v-on:click="replaceModules()">REPLACE</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
import { User, GenerateUniqueID } from '../data/User'
import { Company } from '../data/Company'

import { getGrowthModuleSurvey } from '../data/dataGenerator'
import { SOARModule } from '../data/SOARModule'
import { generateModuleList } from '../data/generator/modules'
import '../styles/positions.css'
import '../styles/surveyStyles.css'
import axios from 'axios'

@Component
export default class CompanyDashboard extends Vue {
  @Prop() private appData!: Company[]
  @Prop() private companyName!: string

  modules = generateModuleList()
  participantsToAdd = [
    {
    name: "John Nnamchi",
    email: "john.nnamchi@simvo.io",
    }
  ]
  newParticipantData = {
    name: "",
    email: ""
  }

  selectedCompany = this.getSelectedCompany()
  getSelectedCompany () {
    for (const company of this.appData) {
      if (company.name == this.companyName) {
        return company
      }
    }
  }
  openModuleAnalysis (SOARModuleName: string) {
    this.$router.push({name: 'SOARModuleAnalysis', params: {companyName: this.companyName, SOARModuleName: SOARModuleName}})
  }
  addParticipant () {
    if (this.newParticipantData.name != "" && this.newParticipantData.email != "") {
      this.participantsToAdd.push(this.newParticipantData)
      let newParticipantUser = new User(GenerateUniqueID(), this.newParticipantData.name, this.newParticipantData.email)
      this.selectedCompany?.addParticipant(newParticipantUser.uuid)
      this.newParticipantData = {
        name: "",
        email: ""
      }
    } else {
      alert("Name and email must be valid")
    }
  }
  replaceModules () {
    console.log("Replacing...1")
    let requestURL = "http://localhost:5000/getAllModules"
    axios.get(requestURL)
    .then(response => {
      // Replace all chart data with new data
      const growthSurveyData = response.data.data[0].survey
      // console.log(getGrowthModuleSurvey(response.data.data))
      this.modules.push(new SOARModule("Growth Module 2", getGrowthModuleSurvey(growthSurveyData)))
    }).catch(error => {
      if (error) {
        console.log("There was an error")
        console.log(error)
      }
      alert("Error fetching data")
    })
  }
}
</script>
