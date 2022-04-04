<template>
  <div>
    <div class="section-title">SOAR MODULE ANALYSIS</div>
    <!-- <div class="subsection-title">{{selectedSOARModule.name}}</div> -->
    <div class="subsection-title-description">View your company's progress here</div>
    <div>
      <span class="click-text" v-if="selectedWorkshopStage > 0" v-on:click="previousStage()">&#60;</span>
      <span class="click-text" v-if="selectedWorkshopStage < getLastVirtualWorkshopNumber()" v-on:click="nextStage()">&#62;</span>
    </div>

    <div v-if="selectedWorkshopStage === 0">
      <div>
        Initial Survey
      </div>
      <div>
        Total Questions: {{selectedSOARModule.initialSurvey.countTotalQuestions()}}
      </div>
      <div>
        Completion: {{selectedCompany.countModuleAnswers(SOARModule)}} out of {{selectedCompany.participants.length}} registered participants
      </div>
      <div class="medium-space"></div>
      <div class="subsection-title">Answer analysis will be viewable here</div>
      <div
      class="general-select" v-on:click="moveToNextRound()"
      v-if="!selectedCompany.hasMovedToNextRound()">
        Start Virtual Workshops
      </div>
      <div v-if="selectedSOARModule.answers.length == 0">
        No answers yet
      </div>
      <div>
        <div class="flex-parent-middle" style="width: 95%; margin: 0 auto;">
          <div v-for="answer in rankAnswers(selectedCompany.answerAnalysis)" v-bind:key="answer.id" style="margin-top: 20px; flex: 0 0 400px;">
            <div style="width: 400px; margin: 10px;">
              <div>Score: {{answer.score}}</div>
              <div style="font-size: 12px;">{{answer.questionName}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <!-- {{getVirtualWorkshop()}} -->
      <div v-for="(workshop, workshopNum) in getVirtualWorkshop()" v-bind:key="workshopNum">
        <div v-if="workshopNum == selectedWorkshopStage">
          <div>
            {{workshop.title}}
          </div>
          <div>
            Completion: {{Object.keys(workshop.moduleAnswers).length}} out of {{selectedCompany.participants.length}} registered participants
          </div>
          <div v-if="workshopNum == getLastVirtualWorkshopNumber()">
            <div v-if="workshop.hasNextWorkshop">
              <div class="general-select" v-on:click="moveToNextVirtualWorkshop()">
                Start Next Workshop
              </div>
            </div>
            <div v-else>
              <div
              class="notice-message">
                This is the final workshop
              </div>
            </div>
          </div>
          <div class="flex-parent-middle" style="width: 95%; margin: 0 auto;">
            <div v-for="answer in rankWorkshopAnswers(workshop.answerAnalysis)" v-bind:key="answer.id" style="margin-top: 20px; flex: 0 0 400px;">
              <div style="width: 400px; margin: 10px;">
                 <!-- {{answer}} -->
                <div>
                  Score: {{answer.score}}
                </div>
                <!-- <RadarChart class="test-radar" ref="summaryPersonnaCategories"
                :chartOptions="{}"
                :chartData="buildChartDataFromAnswer(answer)"
                :canvasName="answer.id + workshopNum"/> -->
                <div style="font-size: 12px;">
                  {{answer.questionName}}
                </div>
              </div>
            </div>
          </div>
        </div>
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

import '../styles/text.css'
// import RadarChart from '../chart-js/RadarChart.vue'

@Component({
  components: {
    // RadarChart,
  }
})
export default class CompanyDashboard extends Vue {
  @Prop() private appData!: AppData
  @Prop() private selectedCompany!: Company
  @Prop() private SOARModule!: string

  selectedSOARModule = this.appData.modules[this.SOARModule]
  topAnswers: any[] = []
  selectedWorkshopStage = parseInt(this.getLastVirtualWorkshopNumber())

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
    this.selectedSOARModule.addQuestionNamesById(answers)
    this.topAnswers = answers
    return answers
  }
  rankWorkshopAnswers (answerAnalysis: any) {
    const answers = []
    for (const answerId in answerAnalysis) {
      if (answerAnalysis[answerId].score > 0) {
        answers.push(Object.assign(answerAnalysis[answerId], {id: answerId}))
      }
    }
    answers.sort(this.compare)
    this.selectedSOARModule.addQuestionNamesById(answers)
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
    this.selectedCompany.virtualWorkshops = response.data.virtualWorkshops
    this.nextStage()
  }
  getVirtualWorkshop () {
    return this.selectedCompany.virtualWorkshops[this.SOARModule]
  }
  getLastVirtualWorkshopNumber () {
    let lastVirtualWorkshopNumber = "0"
    for (const key in this.getVirtualWorkshop()) {
      if (key > lastVirtualWorkshopNumber) {
        lastVirtualWorkshopNumber = key
      }
    }
    return lastVirtualWorkshopNumber
  }
  moveToNextVirtualWorkshop () {
    this.selectedSOARModule.addQuestionNamesById(this.topAnswers)
    // console.log(this.topAnswers)
    this.runMoveToNextRound()
  }
  async runMoveToNextVirtualWorkshop () {
    const url = getServerUrl()
    this.selectedCompany.addTopAnswers(this.topAnswers.slice(0, 15))
    const data = {
        company: this.selectedCompany,
        moduleId: this.selectedSOARModule.uuid
    }
    const response = await axios.post(url + "/createNextWorkshop", data)
    this.selectedCompany.virtualWorkshops = response.data.virtualWorkshops
    this.nextStage()
  }
  previousStage () {
    this.selectedWorkshopStage = Math.max(this.selectedWorkshopStage - 1, 0)
  }
  nextStage () {
    this.selectedWorkshopStage = Math.min(this.selectedWorkshopStage + 1, parseInt(this.getLastVirtualWorkshopNumber()))
  }
  buildChartDataFromAnswer (answer: any) {
    console.log("HEERE======")
    const illegalKeys = ["questionName", "score", "id"]
    let labels = []
    let data = []
    for (const key in answer) {
      console.log(key)
      if (!(illegalKeys.includes(key))) {
        labels.push(key)
        data.push(answer[key])
      }
    }
    console.log(labels)
    const chartData = {
      labels: labels,
      datasets: [{
        label: 'My First Dataset',
        data: data,
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      }]
    }
    return chartData
  }
}
</script>
