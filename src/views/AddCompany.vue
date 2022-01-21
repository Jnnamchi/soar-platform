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

import { AppData } from '../data/App'
import { Survey } from '../data/Survey'
import { CreateCompanyFromSurvey } from '../data/Company'
import { getCurrentUserId } from '../firebase/firebase'

import SurveyComponent from '../components/Survey.vue'

import { getServerUrl } from '../requests/requests'

import axios from 'axios'

@Component({
  components: {
      SurveyComponent,
  },
  methods: {
      getCurrentUserId,
  }
})
export default class Home extends Vue {
    @Prop() private appData!: AppData

    companySurvey = generateAddCompanySurvey()
    companyDetailsPageName = "Company Details"

    submitAddCompanySurvey (companySurvey : Survey) {
        let newCompany = CreateCompanyFromSurvey(companySurvey)
        newCompany.addAdmin(getCurrentUserId())
        newCompany.addParticipant(getCurrentUserId())

        let url = getServerUrl()
        // let userId = getCurrentUserId()
        axios.post(url + "/addUserCompany", newCompany)
        .then(response => {
            // Replace all chart data with new data
            console.log(response.data)
            this.$router.push("/home")
        }).catch(error => {
            if (error) {
                console.log("There was an error")
                console.log(error)
            }
            alert("Error fetching data")
        })
    }
}
</script>
