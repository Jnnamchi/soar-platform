<template>
  <div>
    <div class="section-title">{{surveyData.title}}</div>
    <div>
      <div>Page {{selectedSurveyPage + 1}} of {{surveyData.pages.length}}</div>
      <div>Completed {{surveyData.countAnsweredQuestions()}} of {{surveyData.countTotalQuestions()}} questions</div>
      <div class="survey-progress-bar" :style="styleProgressBar()"></div>
    </div>
    <div v-for="pageNum in surveyData.pages.length" v-bind:key="pageNum" class="survey-section">
      <div v-if="pageNum - 1 == selectedSurveyPage">
        <div class="survey-section-name">{{surveyData.pages[pageNum - 1].name}}</div>
        <div v-for="question in surveyData.pages[pageNum - 1].questions" v-bind:key="question.name">
          <div class="survey-question-name">{{question.name}}</div>
          <!-- MATRIX QUESTION TYPE -->
          <div v-if="question.isMatrix()" class="matrix">
            <div class="matrix-grid">
              <div class="matrix-column-header">
                <div class="matrix-column-header-empty"></div>
                <div v-for="column in question.columns" v-bind:key="column" class="matrix-column-header-item">
                    <div class="matrix-column-header-item-text">
                    {{column}}
                    </div>
                </div>
              </div>
              <div v-for="row in question.rows" v-bind:key="row.question" class="matrix-row">
                <div class="matrix-row-header">
                  {{row.question}}
                </div>
                <div v-for="column in question.columns.length" v-bind:key="column" class="matrix-row-item">
                  <div class="matrix-row-item-choice">
                    <input type="radio" id="html" :name="row.question" :value="question.columns[column - 1]"  v-on:click="updateRender()" v-model="row.answer" class="radio-button">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- TEXT QUESTION TYPE -->
          <div v-if="question.isText()" class="text">
            <div>
              <input v-model="question.answer" class="text-input">
            </div>
          </div>
          <!-- RADIO QUESTION TYPE -->
          <div v-if="question.isRadio()" class="radio">
            <div v-for="choice in question.choices" v-bind:key="choice" class="radio-option">
              <input type="radio" :value="choice" :id="choice" v-model="question.answer">
              <label :for="choice" class="radio-label">{{choice}}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <span class="survey-nav-button"
      v-if="hasPreviousPage()"
      v-on:click="goToPreviousPage()">Previous</span>
      <span v-if="hasPreviousPage() && hasNextPage()"> | </span>
      <span class="survey-nav-button"
      v-if="hasNextPage()"
      v-on:click="goToNextPage()">Next</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
import { Survey } from "../data/Survey"

import '../styles/surveyStyles.css'

@Component
export default class SurveyComponent extends Vue {
  @Prop() private surveyData!: Survey

  selectedSurveyPage: number = 0

  hasPreviousPage () {
    return this.selectedSurveyPage > 0
  }
  goToPreviousPage () {
    this.selectedSurveyPage = Math.max(0, this.selectedSurveyPage - 1)
    window.scrollTo(0, 0)
  }
  hasNextPage () {
    return this.selectedSurveyPage < this.surveyData.pages.length - 1
  }
  goToNextPage () {
    this.selectedSurveyPage = Math.min(this.surveyData.pages.length - 1, this.selectedSurveyPage + 1)
    window.scrollTo(0, 0)
  }
  styleProgressBar () {
    let cutoffValue = Math.round(100 * (this.surveyData.countAnsweredQuestions() / this.surveyData.countTotalQuestions()))
    return "background: linear-gradient(to right, #19B393 " + cutoffValue + "%, #eee " + cutoffValue + "%);"
  }
  updateRender () {
    setTimeout(this.forceUpdate, 10);
  }
  forceUpdate () {
    this.$forceUpdate()
  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
