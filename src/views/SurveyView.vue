<template>
  <div class="about">
    <SurveyComponent :surveyData="surveyData" />
    <div class="medium-space"></div>
    <div v-if="surveyData.isCompleted()"
    v-on:click="submitSOARSurvey()"
    class="general-select">
        SUBMIT
    </div>
    <div v-else class="disable-select">
        SUBMIT
    </div>
    <div class="large-space"></div>
  </div>
</template>

<script lang="ts">
import { SOARModule } from "@/data/SOARModule"
import { SurveyAnswer } from "@/data/SurveyAnswer"
import { Component, Vue, Prop } from "vue-property-decorator"
import SurveyComponent from "../components/Survey.vue"
import { AppData } from '../data/App'
import { Company } from '../data/Company'

import { getCurrentUserId } from '../firebase/firebase'
import { getServerUrl } from '../requests/requests'
import axios from 'axios'

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
      const userId = getCurrentUserId()
      let newAnswer = this.surveyData.buildAnswerList(userId)
      this.selectedSOARModule.addAnswer(newAnswer)
      this.runSubmitSoarSurvey(this.selectedSOARModule, newAnswer)
      this.$router.push('/home')
    }
  }
  async runSubmitSoarSurvey (selectedSOARModule: SOARModule, surveyAnswer: SurveyAnswer) {
    const url = getServerUrl()
    const data = {
        companyUuid: this.selectedCompany.uuid,
        moduleUuid: selectedSOARModule.uuid,
        uuid: surveyAnswer.uuid,
        answers: surveyAnswer.answers
    }
    axios.post(url + "/updateUserSurveyAnswer", data)
  }
}
</script>
