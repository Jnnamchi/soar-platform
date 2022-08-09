<template>
  <div>
    <div class="section-title">SOAR MODULE ANALYSIS</div>
    <!-- <div class="subsection-title">{{selectedSOARModule.name}}</div> -->
    <div class="subsection-title-description">View your company's progress here</div>
    <div>
      <div v-if="!isViewingInPersonWorkshops">
        <span class="click-text" v-if="selectedWorkshopStage > 0" v-on:click="previousStage()">&#60;</span>
        <span class="click-text" v-if="selectedWorkshopStage < getLastVirtualWorkshopNumber()" v-on:click="nextStage()">&#62;</span>
        <span class="click-text" v-if="selectedWorkshopStage == getLastVirtualWorkshopNumber() && hasInPersonWorkshops" v-on:click="isViewingInPersonWorkshops = true">&#62;</span>
      </div>
      <div v-else>
        <span class="click-text" v-if="selectedWorkshopStage == getLastVirtualWorkshopNumber() && hasInPersonWorkshops" v-on:click="isViewingInPersonWorkshops = false">&#60;</span>
      </div>
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
      <div v-if="!selectedCompany.hasMovedToNextRound()">
        <div v-if="selectedCompany.countModuleAnswers(SOARModule) == 0" class="notice-message">
          No answers yet, at least one response is needed to start the next workshop
        </div>
        <div v-else class="general-select" v-on:click="startVirtualWorkshops()">
          Start Virtual Workshops
        </div>
      </div>
      <div v-if="selectedSOARModule.answers.length == 0">
        No answers yet
      </div>
      <div class="medium-space"></div>
      <div v-if="selectedCompany.countModuleAnswers(SOARModule) > 0">
        <div style="width: 95%; margin: 0 auto;">
          <div class="initial-survey-grid table-column-header">
            <div>
            </div>
            <div>
              Opportunity Score
            </div>
            <div>
              Necessity Score
            </div>
            <div>
              Total Score
            </div>
          </div>
          <div class="medium-space"></div>
          <div v-for="answer in rankAnswers(selectedCompany.answerAnalysis)" v-bind:key="answer.id" style="margin-top: 20px; flex: 0 0 400px;">
            <div class="initial-survey-grid">
              <div class="question-name-in-grid">{{answer.questionName}}</div>
              <div>{{answer.opportunityScore}}</div>
              <div>{{answer.necessityScore}}</div>
              <div>{{answer.opportunityScore + answer.necessityScore}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="!isViewingInPersonWorkshops">
      <div v-for="(workshop, workshopNum) in getVirtualWorkshop()" v-bind:key="workshopNum">
        <div v-if="workshopNum == selectedWorkshopStage">
          <div>
            {{workshop.title}}
          </div>
          <div>
            Completion: {{Object.keys(workshop.moduleAnswers).length}} out of {{selectedCompany.participants.length}} registered participants
          </div>
          <div v-if="workshopNum == getLastVirtualWorkshopNumber()">
            <div v-if="Object.keys(workshop.moduleAnswers).length > 0">
              <div v-if="workshop.hasNextWorkshop">
                <div class="medium-space"></div>
                <div class="general-select" v-on:click="moveToNextVirtualWorkshop()">
                  Start Next Workshop
                </div>
                <div class="medium-space"></div>
              </div>
              <div v-else-if="!hasInPersonWorkshops">
                <div class="medium-space"></div>
                <div v-on:click="startInPersonWorkshops()"
                class="general-select">
                  Start in person workshops
                </div>
                <div class="medium-space"></div>
              </div>
            </div>
            <div v-else>
              <div class="notice-message">
                No answers yet, at least one response is needed to start the next workshop
              </div>
            </div>
          </div>
          <div style="width: 95%; margin: 0 auto;" v-if="Object.keys(workshop.moduleAnswers).length > 0">
            <div :style="getVirtualWorkshopRequiredColumns(rankWorkshopAnswers(workshop.answerAnalysis)[0])">
              <div></div>
              <div v-for="workshopQuestion in getVirtualWorkshopQuestions(rankWorkshopAnswers(workshop.answerAnalysis)[0])" v-bind:key="workshopQuestion">
                {{workshopQuestion}} <div class="table-column-header">Consensus Answer</div>
              </div>
              <div>Updated Score</div>
            </div>
            <div v-for="answer in rankWorkshopAnswers(workshop.answerAnalysis)" v-bind:key="answer.id" style="margin-top: 20px; flex: 0 0 400px;">
              <div :style="getVirtualWorkshopRequiredColumns(answer)">
                <div class="question-name-in-grid">
                  {{answer.questionName}}
                </div>
                <div v-for="workshopQuestion in getVirtualWorkshopQuestions(answer)" v-bind:key="workshopQuestion">
                  {{getConsensusAnswer(answer[workshopQuestion])}}
                </div>
                <div style="font-size: 16px;">
                  {{answer.score}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="medium-space"></div>
      <div style="display: grid; grid-template-columns: 250px 250px; margin: 0 auto; width: fit-content;">
        <div class="general-select" v-on:click="selectedInPersonWorkshopView = 'reranking'" style="margin: 0 auto;">
          Re-ranking
        </div>
        <div class="general-select" v-on:click="selectedInPersonWorkshopView = 'actionPlans'" style="margin: 0 auto;">
          Action Plans
        </div>
      </div>
      <div class="medium-space"></div>
      <div v-if="selectedInPersonWorkshopView === 'reranking'">
        <div style="width: 70%; margin: 0 auto;">Each top initiative identified is either a great OPPORTUNITY or a NECESSITY to your business. Go through them below, discuss, and decide which group they should belong to.</div>
        <div class="medium-space"></div>
        <div>{{countAssignedInitiatives(selectedCompany.inPersonWorkshops[SOARModule].reRanking)}} of {{getTotalInitiatives(selectedCompany.inPersonWorkshops[SOARModule].reRanking)}} initiatives have been assigned</div>
        <div class="medium-space"></div>
        <div v-on:click="saveWorkshopState()">
          SAVE
        </div>
        <div class="reranking-grid">
          <div>
            <div>Opportunities</div>
            <div class="medium-space"></div>
            <div>
              <div v-for="initiative of rankAnswersForReranking(selectedCompany.inPersonWorkshops[SOARModule].reRanking.opportunities)"  v-bind:key="initiative.id">
                <div v-if="initiative.oppOrNec == 'Opportunity'">
                  <div class="standard-panel">
                    <div>{{initiative.questionName}}</div>
                    <div class="small-space"></div>
                    <div class="reassign-initative text-small" v-on:click="unassignInitiative(initiative)"><span class="reassign-initative-text">Reassign</span></div>
                  </div>
                  <div class="medium-space"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="reranking-main-column">
            <div v-for="initiative of rankAnswersForReranking(selectedCompany.inPersonWorkshops[SOARModule].reRanking.unassigned)" v-bind:key="initiative.id">
              <div class="standard-panel">
                <RankInitiativeViewer :initiativeData="initiative" :initialSurveyScores="getInitialSurveyScores(initiative)"/>
                <div>
                  <div style="font-size: 12px;">
                    <select :value="initiative.oppOrNec" @change="onAssignInitiative(initiative, $event)">
                      <option v-for="option in ['Opportunity', 'Necessity', 'Unselected']" v-bind:key="option">{{option}}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="medium-space"></div>
            </div>
          </div>
          <div>
            <div>Necessities</div>
            <div class="medium-space"></div>
            <div>
              <div v-for="initiative of rankAnswersForReranking(selectedCompany.inPersonWorkshops[SOARModule].reRanking.necessities)"  v-bind:key="initiative.id">
                <div v-if="initiative.oppOrNec == 'Necessity'">
                  <div class="standard-panel">
                    <div>{{initiative.answerDetails.score}}</div>
                    <div>{{initiative.questionName}}</div>
                    <div class="small-space"></div>
                    <div class="reassign-initative text-small" v-on:click="unassignInitiative(initiative)"><span class="reassign-initative-text">Reassign</span></div>
                  </div>
                  <div class="medium-space"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="selectedInPersonWorkshopView === 'actionPlans'">
        <div>
          <div>
            <div v-for="inPersonWorkshop in selectedCompany.inPersonWorkshops[SOARModule].actionPlan" v-bind:key="inPersonWorkshop.name">
              <div v-if="inPersonWorkshop.name == selectedWorkshop" style="font-weight: bold">{{inPersonWorkshop.name}}</div>
              <div v-else v-on:click="selectWorkshop(inPersonWorkshop.name)">{{inPersonWorkshop.name}}</div>
            </div>
          </div>
        </div>
        <div class="medium-space"></div>
        <div v-on:click="saveWorkshopState()">
          SAVE
        </div>
        <div class="medium-space"></div>
        <div v-for="[, inPersonWorkshop] in Object.entries(selectedCompany.inPersonWorkshops[SOARModule].actionPlan)" v-bind:key="inPersonWorkshop.name" >
          <div v-if="inPersonWorkshop.name == selectedWorkshop" class="in-person-workshop-container" :set="workshopRows = getSelectedWorkshopRows(selectedWorkshop)">
            <div :style="getRequiredColumns(inPersonWorkshop.columns)">
              <div></div>
              <div></div>
              <div v-for="(column, columnNum) in inPersonWorkshop.columns" v-bind:key="columnNum">
                <div class="table-column-header">{{column.title}}</div>
                <div style="font-size: 11px;">{{column.subtitle}}</div>
              </div>
            </div>
            <div class="medium-space"></div>
            <div>
              <draggable tag="ul" :list="workshopRows" class="list-group" handle=".dragPoint">
                <div
                  v-for="(row) in workshopRows"
                  :key="row.questionName"
                >
                  <div class="small-space"></div>
                  <div :style="getRequiredColumns(inPersonWorkshop.columns)">
                    <div>
                      <i class="drag-icon fa-solid fa-bars dragPoint"></i>
                    </div>
                    <div class="question-name-in-grid">
                      {{row.questionName}}
                    </div>
                    <div v-for="(column, columnNum) in inPersonWorkshop.columns" v-bind:key="columnNum" class="table-column-header">
                      <div v-if="column.type == 'text'">
                        <input class="text-input" v-model="row.answers[columnNum]">
                      </div>
                      <div v-if="column.type == 'textarea'" style="width:">
                        <textarea rows="4" cols="25" class="textarea-input" v-model="row.answers[columnNum]">
                        </textarea>
                      </div>
                      <div v-if="column.type == 'date'">
                        <input type="date" class="date-input" v-model="row.answers[columnNum]">
                      </div>
                      <div v-if="column.type == 'dropdown'">
                        <div style="font-size: 12px;">
                          <select v-model="row.answers[columnNum]">
                            <option v-for="option in column.options" v-bind:key="option">{{option}}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </draggable>
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
import draggable from 'vuedraggable'
// import RadarChart from '../chart-js/RadarChart.vue'
import RankInitiativeViewer from "../components/RankInitiativeViewer.vue"

@Component({
  components: {
    draggable,
    RankInitiativeViewer
    // RadarChart,
  }
})
export default class SOARModuleAnalysis extends Vue {
  @Prop() private appData!: AppData
  @Prop() private selectedCompany!: Company
  @Prop() private SOARModule!: string

  selectedSOARModule = this.appData.modules[this.SOARModule]
  topAnswers: any[] = []
  selectedWorkshopStage = parseInt(this.getLastVirtualWorkshopNumber())
  hasInPersonWorkshops = this.selectedCompany.hasInPersonWorkshop(this.SOARModule)
  isViewingInPersonWorkshops = this.selectedCompany.hasInPersonWorkshop(this.SOARModule)
  selectedWorkshop: string = this.getSelectedWorkshop()
  selectedInPersonWorkshopView: string = 'reranking'

  compare( a: any, b: any ) {
    if ( a.score < b.score ){
      return 1;
    }
    if ( a.score > b.score ){
      return -1;
    }
    return 0;
  }
  compareOpportunitiesNecessities (a: any, b: any) {
    const aScore = a.opportunityScore + a.necessityScore
    const bScore = b.opportunityScore + b.necessityScore
    if (aScore < bScore) {
      return 1;
    }
    if (aScore > bScore) {
      return -1;
    }
    return 0;
  }
  compareNecessities (a: any, b: any) {
    if (a.necessityScore < b.necessityScore) {
      return 1;
    }
    if (a.necessityScore > b.necessityScore) {
      return -1;
    }
    return 0;
  }
  rankAnswers (answerAnalysis: any) {
    const answers = []
    for (const answerId in answerAnalysis[this.selectedSOARModule.uuid]) {
      answers.push(Object.assign(answerAnalysis[this.selectedSOARModule.uuid][answerId], {id: answerId}))
    }
    answers.sort(this.compareOpportunitiesNecessities)
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
  compareReranking (a: any, b: any) {
    if (a.answerDetails.score < b.answerDetails.score) {
      return 1;
    }
    if (a.answerDetails.score > b.answerDetails.score) {
      return -1;
    }
    return 0;
  }
  rankAnswersForReranking (rerankingAnswers: any) {
    const answers = []
    for (const answer of rerankingAnswers) {
      answers.push(answer)
    }
    answers.sort(this.compareReranking)
    return answers
  }
  startVirtualWorkshops () {
    // Add question names by id
    this.moveToNextRound()
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
  // Create In-Person Workshops
  startInPersonWorkshops () {
    this.runStartInPersonWorkshop()
  }
  async runStartInPersonWorkshop () {
    const url = getServerUrl()
    const data = {
        company: this.selectedCompany,
        moduleId: this.selectedSOARModule.uuid
    }
    const response = await axios.post(url + "/createInPersonWorkshops", data)
    this.selectedCompany.addInPersonWorkshops(response.data.inPersonWorkshops)
    this.hasInPersonWorkshops = true
    this.isViewingInPersonWorkshops = true
    this.$forceUpdate()
  }
  // Navigation
  previousStage () {
    this.isViewingInPersonWorkshops = false
    this.selectedWorkshopStage = Math.max(this.selectedWorkshopStage - 1, 0)
  }
  nextStage () {
    this.selectedWorkshopStage = Math.min(this.selectedWorkshopStage + 1, parseInt(this.getLastVirtualWorkshopNumber()))
  }
  buildChartDataFromAnswer (answer: any) {
    const illegalKeys = ["questionName", "score", "id"]
    let labels = []
    let data = []
    for (const key in answer) {
      if (!(illegalKeys.includes(key))) {
        labels.push(key)
        data.push(answer[key])
      }
    }
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
  getRequiredColumns (columns: any) {
    let templateColumns = "grid-template-columns: 30px 300px"
    for (let column of columns) {
      if (column.type == 'textarea') {
        templateColumns = templateColumns + " var(--large-width)"
      } else {
        templateColumns = templateColumns + " var(--std-width)"
      }
    }
    templateColumns = templateColumns + ";"
    return "display: grid; gap: 15px; " + templateColumns
  }
  getVirtualWorkshopRequiredColumns (workshopQuestion: any) {
    let totalColumns = 0
    const illegalKeys = "score id questionName"
    for (let key in workshopQuestion) {
      if (!(illegalKeys.includes(key))) {
        totalColumns = totalColumns + 1
      }
    }
    let templateColumns = "grid-template-columns: 300px"
    for (let i = 0; i < totalColumns; i++) {
      templateColumns = templateColumns + " var(--large-width)"
    }
    templateColumns = templateColumns + " var(--large-width);"
    return "display: grid; gap: 25px; margin: 0 auto; font-size: 12px; width: fit-content; " + templateColumns
  }
  getVirtualWorkshopQuestions (workshopQuestion: any) {
    let totalQuestions = []
    const illegalKeys = "score id questionName"
    for (let keyName in workshopQuestion) {
      if (!(illegalKeys.includes(keyName))) {
        totalQuestions.push(keyName)
      }
    }
    return totalQuestions
  }
  getConsensusAnswer (answerTally: any) {
    let consensusAnswers: Array<any> = []
    let maxScore = 0
    for (let answer in answerTally) {
      const answerScore = answerTally[answer]
      if (answerScore === maxScore) {
        consensusAnswers.push(answer)
      }
      if (answerScore > maxScore) {
        consensusAnswers = [answer]
        maxScore = answerScore
      }
    }
    return consensusAnswers.join(", ") + " (" + maxScore + ")"
  }
  getSelectedWorkshop () :string {
    if (this.selectedCompany.hasInPersonWorkshop(this.SOARModule)) {
      const workshops: any = this.selectedCompany.inPersonWorkshops[this.SOARModule].actionPlan
      for (let workshopName in workshops) {
        return workshopName
      }
    }
    return ""
  }
  selectWorkshop (workshopName: string) {
    this.selectedWorkshop = workshopName
  }
  getSelectedWorkshopRows (selectedWorkshop: any) {
    if (selectedWorkshop.includes("Necessities")) {
      return this.selectedCompany.inPersonWorkshops[this.SOARModule].reRanking.necessities
    }
    return this.selectedCompany.inPersonWorkshops[this.SOARModule].reRanking.opportunities
  }
  async saveWorkshopState () {
    // this.syncRerankingAndActionPlanTemplates()
    const url = getServerUrl()
    const data = {
      companyId: this.selectedCompany.uuid,
      workshops: this.selectedCompany.inPersonWorkshops[this.SOARModule],
      moduleId: this.SOARModule
    }
    const response = await axios.post(url + "/saveWorkshopState", data)
    this.selectedCompany.inPersonWorkshops = response.data.inPersonWorkshops
  }
  onAssignInitiative (initiative: any, event: any) {
    initiative.oppOrNec = event.target.value
    let removeInitFromUnassign = false
    if (event.target.value == "Opportunity") {
      this.selectedCompany.inPersonWorkshops[this.SOARModule].reRanking.opportunities.push(initiative)
      removeInitFromUnassign = true
    } else if (event.target.value == "Necessity") {
      this.selectedCompany.inPersonWorkshops[this.SOARModule].reRanking.necessities.push(initiative)
      removeInitFromUnassign = true
    }
    if (removeInitFromUnassign) {
      for (let i = 0; i < this.selectedCompany.inPersonWorkshops[this.SOARModule].reRanking.unassigned.length; i++) {
        if (this.selectedCompany.inPersonWorkshops[this.SOARModule].reRanking.unassigned[i].id === initiative.id) {
          this.selectedCompany.inPersonWorkshops[this.SOARModule].reRanking.unassigned.splice(i, 1)
        }
      }
    }
  }
  unassignInitiative (initiative: any) {
    // Add the initiative back to unassigned list
    initiative.oppOrNec = 'Unselected'
    this.selectedCompany.inPersonWorkshops[this.SOARModule].reRanking.unassigned.push(initiative)
    // Remove the initiative from either the opps or necs list
    for (let i = 0; i < this.selectedCompany.inPersonWorkshops[this.SOARModule].reRanking.opportunities.length; i++) {
      if (this.selectedCompany.inPersonWorkshops[this.SOARModule].reRanking.opportunities[i].id === initiative.id) {
        this.selectedCompany.inPersonWorkshops[this.SOARModule].reRanking.opportunities.splice(i, 1)
      }
    }
    for (let i = 0; i < this.selectedCompany.inPersonWorkshops[this.SOARModule].reRanking.necessities.length; i++) {
      if (this.selectedCompany.inPersonWorkshops[this.SOARModule].reRanking.necessities[i].id === initiative.id) {
        this.selectedCompany.inPersonWorkshops[this.SOARModule].reRanking.necessities.splice(i, 1)
      }
    }
  }
  getInitialSurveyScores (initiative: any) {
    return this.selectedCompany.answerAnalysis[this.SOARModule][initiative.id]
  }
  getTotalInitiatives (rerankingObj: any) {
    let totalInitiatives = 0
    for (let iniativeType in rerankingObj) {
      totalInitiatives = totalInitiatives + rerankingObj[iniativeType].length
    }
    return totalInitiatives
  }
  countAssignedInitiatives (rerankingObj: any) {
    const totalInitiatives: any = this.getTotalInitiatives(rerankingObj)
    return totalInitiatives - rerankingObj.unassigned.length
  }
}
</script>

<style>

:root {
    --std-width: 100px;
    --large-width: 150px;
}
.table-column-header {
  font-size: 13px;
  font-weight: bold;
}

.drag-icon:hover {
  cursor: pointer;
  font-weight: bold;
}

.text-input, .date-input, .dropdown-input  {
    width: var(--std-width);
}

.textarea-input {
    width: var(--large-width);
}

.in-person-workshop-container {
  margin: 0 auto;
  width: 80%;
  overflow: scroll;
}

.initial-survey-grid {
  display: grid;
  grid-template-columns: 300px 120px 120px 120px;
  gap: 25px;
  margin: 0 auto;
  width: fit-content;
}

.question-name-in-grid {
  font-size: 12px;
  text-align: left;
}

.reranking-table-header {
  display: grid;
  grid-template-columns: 110px 330px 330px 110px 330px 110px 110px;
  /* gap: 25px; */
  margin: 0 auto;
  width: fit-content;
  margin-bottom: 10px;
  font-size: 14px;
}

.reranking-table-header > div {
  margin: 5px;
  padding-bottom: 10px;
  border-bottom: solid black 1px;
}
.reranking-table > div {
  padding: 5px;
}

.reranking-table {
  display: grid;
  grid-template-columns: 110px 110px 110px 110px 110px 110px 110px 110px 110px 110px 110px 110px 110px;
  /* gap: 25px; */
  margin: 0 auto;
  width: fit-content;
  font-size: 12px;
}

.reranking-main-column {
  max-height: 600px;
  overflow: scroll;
  margin-bottom: 40px;
}

.reassign-initative {
  width: 100%;
  text-align: right;
}

.reassign-initative-text {
  width: fit-content;
  color: var(--SOAR-color);
}

.reassign-initative-text:hover {
  cursor: pointer;
  font-weight: bold;
}

</style>
