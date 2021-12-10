<template>
  <div class="about">
    <SurveyComponent :surveyData="surveyData" />
    <div class="medium-space"></div>
    <div v-on:click="submitSOARSurvey()" class="general-select">SUBMIT</div>
    <div class="large-space"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
import SurveyComponent from "../components/Survey.vue"
import { Company } from '../data/Company'

import { getCurrentUserId } from '../firebase/firebase'

@Component({
  components: {
    SurveyComponent,
  },
})
export default class SurveyView extends Vue {
  @Prop() private appData!: Company[]
  @Prop() private companyName!: string
  @Prop() private SOARModuleName!: string

  selectedSOARModule = this.getSelectedSOARModule()
  surveyData = this.getSurveyData()
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
  getSurveyData () {
    const SOARModule = this.getSelectedSOARModule()
    if (SOARModule) {
      return SOARModule.initialSurvey
    }
  }
  submitSOARSurvey () {
    if (this.surveyData && this.selectedSOARModule) {
      let newAnswer = this.surveyData.buildAnswerList()
      newAnswer.uid = getCurrentUserId()
      this.selectedSOARModule.addAnswer(newAnswer)
      console.log(newAnswer)
      this.$router.push('/home')
    }
  }
}
</script>
