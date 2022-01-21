<template>
  <div>
    <div class="section-title">SOAR MODULE ANALYSIS</div>
    <div class="subsection-title">{{selectedSOARModule.name}}</div>
    <div class="subsection-title-description">View your company's progress here</div>

    <div>
      Total Questions: {{selectedSOARModule.initialSurvey.countTotalQuestions()}}
    </div>
    <div>
      Completion: {{selectedCompany.countModuleAnswers(SOARModule)}} out of {{selectedCompany.participants.length}} registered participants
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

import { AppData } from '../data/App'
import { Company } from '../data/Company'

@Component
export default class CompanyDashboard extends Vue {
  @Prop() private appData!: AppData
  @Prop() private selectedCompany!: Company
  @Prop() private SOARModule!: string

  selectedSOARModule = this.appData.modules[this.SOARModule]
}
</script>
