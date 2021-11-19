<template>
  <div class="about">
    <h1>This the survey section</h1>
    <SurveyComponent :surveyData="surveyData" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import SurveyComponent from "../components/Survey.vue"
import { generateTestData } from "../data/dataGenerator"

@Component({
  components: {
    SurveyComponent,
  },
  data () {
    return {
      surveyData: generateTestData()
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
export default class SurveyView extends Vue {}
</script>
