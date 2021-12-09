<template>
  <div>
      <h1>SOAR MODULE VIEWER</h1>
      <h1>{{SOARModule.name}}</h1>
      <div>
          Total Questions: {{SOARModule.initialSurvey.countTotalQuestions()}}
      </div>
      <div v-on:click="addModuleToCompany(SOARModule, selectedCompany)">
          Add this module
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

import { Company } from '../data/Company'

import { SOARModule } from '../data/SOARModule'
import { generateModuleList } from '../data/generator/modules'

@Component
export default class CompanyDashboard extends Vue {
  @Prop() private SOARModule!: SOARModule
  @Prop() private appData!: Company[]
  @Prop() private companyName!: string

  modules = generateModuleList()
  selectedCompany = this.getSelectedCompany()
  getSelectedCompany () {
    for (const company of this.appData) {
      if (company.name == this.companyName) {
        return company
      }
    }
  }
  addModuleToCompany (module: SOARModule, company: Company) {
    company.addSOARModule(module)
    console.log(company)
    this.$router.push({name: 'CompanyDashboard', params: {companyName: this.companyName}})
  }
}
</script>
