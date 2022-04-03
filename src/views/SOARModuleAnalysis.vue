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
    <div class="subsection-title">Answer analysis will be viewable heree</div>
    <div class="general-select" v-on:click="moveToNextRound()">
      Move to next round
    </div>
    <div v-if="selectedSOARModule.answers.length == 0">
      No answers yet
    </div>
    <div>
      <div v-for="answer in rankAnswers(selectedCompany.answerAnalysis)" v-bind:key="answer.id" style="margin-top: 20px;">
        {{answer}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

import { AppData } from '../data/App'
import { Company } from '../data/Company'
import { getServerUrl } from '../requests/requests'

import axios from 'axios'

@Component
export default class CompanyDashboard extends Vue {
  @Prop() private appData!: AppData
  @Prop() private selectedCompany!: Company
  @Prop() private SOARModule!: string

  selectedSOARModule = this.appData.modules[this.SOARModule]
  topAnswers: any[] = []

  compare( a: any, b: any ) {
    if ( a.score < b.score ){
      return 1;
    }
    if ( a.score > b.score ){
      return -1;
    }
    return 0;
  }
  rankAnswers (answerAnalysis: any) {
    const answers = []
    for (const answerId in answerAnalysis[this.selectedSOARModule.uuid]) {
      if (answerAnalysis[this.selectedSOARModule.uuid][answerId].score > 0) {
        answers.push(Object.assign(answerAnalysis[this.selectedSOARModule.uuid][answerId], {id: answerId}))
      }
    }
    answers.sort(this.compare)
    this.topAnswers = answers
    return answers
  }
  moveToNextRound () {
    this.selectedSOARModule.addQuestionNamesById(this.topAnswers)
    this.runMoveToNextRound()
  }
  async runMoveToNextRound () {
    const url = getServerUrl()
    this.selectedCompany.addTopAnswers(this.topAnswers.slice(0, 15))
    const data = {
        company: this.selectedCompany,
        moduleId: this.selectedSOARModule.uuid
    }
    const response = await axios.post(url + "/createNextWorkshop", data)
    console.log(response)
    // this.$router.push('/home')
    // this.message = "Virtual Workshop " + Object.keys(response.data.virtualWorkshops) + " has been initiated"
  }
}
</script>
