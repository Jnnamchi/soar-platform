<template>
  <div>
    <div class="section-title">SOAR MODULE ANALYSIS</div>
    <div class="subsection-title">{{selectedSOARModule.name}}</div>
    <div class="subsection-title-description">View your company's progress here</div>

    <div>
      Total Questions: {{selectedSOARModule.initialSurvey.countTotalQuestions()}}
    </div>
    <div>
      Total Answers: {{selectedSOARModule.answers.length}}
    </div>
    <div class="medium-space"></div>
    <div class="subsection-title">Answer analysis will be viewable here</div>
    <div v-if="selectedSOARModule.answers.length == 0">
      No answers yet
    </div>
    <div v-for="answer in selectedSOARModule.answers" v-bind:key="JSON.stringify(answer)">
      {{answer}}
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
