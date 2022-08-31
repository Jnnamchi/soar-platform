<template>
  <div>
      <div class="section-title">SOAR MODULE VIEWER</div>
      <div class="subsection-title">{{SOARModule.name}}</div>
      <div class="subsection-title-description">Module Description Goes Here</div>
      <div class="subsection-title-description">
          Total Questions: {{SOARModule.initialSurvey.countTotalQuestions()}}
      </div>
      <div v-on:click="addModuleToCompany(SOARModule.uuid, selectedCompany)" class="add-company">
          Add this module
      </div>
  </div>
</template>

<script>
import { Component, Vue, Prop } from "vue-property-decorator"

import { CreateCompanyFromObject } from '../data/Company'
// import { AppData } from '../data/App'

// import { SOARModule } from '../data/SOARModule'
import { getServerUrl } from '../requests/requests'
import axios from 'axios'

@Component
export default class CompanyDashboard extends Vue {
  @Prop() appData
  @Prop() selectedCompany
  @Prop() SOARModule
  mounted() {
  }
  async addModuleToCompany (moduleUuid, company) {
    const url = getServerUrl()
    const requestBody = {
        "companyUuid": company.uuid,
        "moduleUuid": moduleUuid,
    }
    axios.post(url + "/addModuleToCompany", requestBody)
    .then(response => {
      let newCompanyData = response.data
      let newCompany = CreateCompanyFromObject(newCompanyData)
      this.appData.replaceCompany(newCompany)
      this.$router.push({
        name: 'CompanyDashboard',
        params: {
          companyUuid: this.selectedCompany.uuid,
          appData: this.appData
        }
      })
    }).catch(error => {
      if (error) {
        console.log("There was an error")
      }
      alert("Error fetching data")
    })
  }
}
</script>
