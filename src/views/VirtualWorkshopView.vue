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
// import { getServerUrl } from '../requests/requests'
// import axios from 'axios'

@Component({
  components: {
    SurveyComponent,
  },
})
export default class SurveyView extends Vue {
  @Prop() private appData!: AppData
  @Prop() private selectedCompany!: Company
  @Prop() private virtualWorkShop!: any

  surveyData = CreateSurveyFromObject(this.virtualWorkShop.survey)

  checkAnswers () {
    const answerList = this.surveyData.buildVirtualWorkshopAnswerList(getCurrentUserId())
    console.log(answerList)
  }
  CreateSurvey (surveyObj: any) {
    return CreateSurveyFromObject(surveyObj)
  }
//   async runSubmitSoarSurvey (selectedSOARModule: SOARModule, surveyAnswer: SurveyAnswer) {
//     const url = getServerUrl()
//     const data = {
//         companyUuid: this.selectedCompany.uuid,
//         moduleUuid: selectedSOARModule.uuid,
//         uuid: surveyAnswer.uuid,
//         answers: surveyAnswer.answers
//     }
//     await axios.post(url + "/updateUserSurveyAnswer", data)
//     this.$router.push('/home')
//   }
}
</script>
