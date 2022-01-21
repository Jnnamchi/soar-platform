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
import { AppData } from '../data/App'
import { Company } from '../data/Company'

import { getCurrentUserId } from '../firebase/firebase'

@Component({
  components: {
    SurveyComponent,
  },
})
export default class SurveyView extends Vue {
  @Prop() private appData!: AppData
  @Prop() private selectedCompany!: Company
  @Prop() private SOARModule!: string

  selectedSOARModule = this.appData.modules[this.SOARModule]
  surveyData = this.selectedSOARModule.initialSurvey

  submitSOARSurvey () {
    if (this.surveyData && this.selectedSOARModule) {
      let newAnswer = this.surveyData.buildAnswerList()
      newAnswer.uid = getCurrentUserId()
      this.selectedSOARModule.addAnswer(newAnswer)
      this.$router.push('/home')
    }
  }
}
</script>
