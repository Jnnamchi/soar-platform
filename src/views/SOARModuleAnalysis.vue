<template>
  <div>
      <h1>SOAR MODULE ANALYSIS</h1>
      <h2>View your company's progress here</h2>
      <h1>{{selectedSOARModule.name}}</h1>
      <div>
          Total Questions: {{selectedSOARModule.initialSurvey.countTotalQuestions()}}
      </div>
      <div>
          Total Answers: {{selectedSOARModule.answers.length}}
      </div>
      <div>
          Answer analysis will be viewable here
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

import { Company } from '../data/Company'

@Component
export default class CompanyDashboard extends Vue {
  @Prop() private appData!: Company[]
  @Prop() private companyName!: string
  @Prop() private SOARModuleName!: string

  selectedCompany = this.getSelectedCompany()
  selectedSOARModule = this.getSelectedSOARModule()
  getSelectedCompany () {
    for (const company of this.appData) {
      if (company.name == this.companyName) {
        return company
      }
    }
  }
  getSelectedSOARModule () {
    let company = this.getSelectedCompany()
    if (company) {
      for (const module of company.modules) {
        if (module.name == this.SOARModuleName) {
          return module
        }
      }
    }
  }
}
</script>
