<template>
  <div>
    <SurveyComponent :surveyData="companySurvey" />
    <div class="medium-space"></div>


    <div v-if="companySurvey.isCompleted()"
    v-on:click="submitAddCompanySurvey(companySurvey)"
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
import { generateAddCompanySurvey } from "../data/generator/addCompanySurvey"

import { Company } from '../data/Company'
import { Survey } from '../data/Survey'
import { CreateCompanyFromSurvey } from '../data/Company'
import { getCurrentUserId } from '../firebase/firebase'

@Component({
  components: {},
})
export default class Home extends Vue {
    @Prop() private companyData!: Company[]

    companySurvey = generateAddCompanySurvey()
    companyDetailsPageName = "Company Details"

    submitAddCompanySurvey (companySurvey : Survey) {
        let newCompany = CreateCompanyFromSurvey(companySurvey)
        newCompany.addAdmin(getCurrentUserId())
        newCompany.addParticipant(getCurrentUserId())
        this.$router.push("/home")
    }
}
</script>
