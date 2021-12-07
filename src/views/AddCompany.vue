<template>
  <div>
    Here we add a company
    <SurveyComponent :surveyData="companySurvey" />
    {{companySurvey}}

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { generateAddCompanySurvey } from "../data/generator/addCompanySurvey"

import SurveyComponent from "../components/Survey.vue"

@Component({
  components: {
      SurveyComponent
  },
  data () {
    return {
      companySurvey: generateAddCompanySurvey(),
    }
  },
  methods: {
    runTest () {
    }
  },
  mounted () {
    // this.runTest("HIHI")
  },
})
export default class Home extends Vue {}
</script>
