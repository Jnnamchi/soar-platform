<template>
  <div class="about">
    <SurveyComponent :surveyData="surveyData" />
    <div class="medium-space"></div>
    <div v-if="surveyData.isCompleted()"
    v-on:click="checkAnswers()"
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
import { Component, Vue, Prop } from "vue-property-decorator"
import SurveyComponent from "../components/Survey.vue"
import { AppData } from '../data/App'
import { Company } from '../data/Company'
import { CreateSurveyFromObject } from '../data/Survey'

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
  @Prop() private virtualWorkShop!: any
  @Prop() private moduleUuid!: string

  surveyData = CreateSurveyFromObject(this.virtualWorkShop.survey)

  checkAnswers () {
    const answers = this.surveyData.buildVirtualWorkshopAnswerList()
    const userId = getCurrentUserId()
    this.virtualWorkShop.moduleAnswers[userId] = answers
    this.runSubmitSoarWorkshop(userId, this.selectedCompany.uuid, this.moduleUuid, answers)
  }
  async runSubmitSoarWorkshop (userId:string, companyUuid: string, moduleUuid: string, workshopAnswers: any) {
    const url = getServerUrl()
    const data = {
        userId: userId,
        companyUuid: companyUuid,
        moduleUuid: moduleUuid,
        answers: workshopAnswers
    }
    await axios.post(url + "/updateUserWorkshopAnswers", data)
    this.$router.push('/home')
  }
}
</script>
