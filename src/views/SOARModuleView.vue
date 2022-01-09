<template>
  <div>
      <div class="section-title">SOAR MODULE VIEWER</div>
      <div class="subsection-title">{{SOARModule.name}}</div>
      <div class="subsection-title-description">Module Description Goes Here</div>
      <div class="subsection-title-description">
          Total Questions: {{SOARModule.initialSurvey.countTotalQuestions()}}
      </div>
      <div v-on:click="addModuleToCompany(SOARModule, selectedCompany)" class="add-company">
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
    this.$router.push({name: 'CompanyDashboard', params: {companyName: this.companyName}})
  }
}
</script>
