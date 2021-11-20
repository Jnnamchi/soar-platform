<template>
  <div class="hello">
    <div>
      {{surveyData.title}}
    </div>
    <div v-for="page in surveyData.pages" v-bind:key="page.name" class="survey-section">
      <div class="survey-section-name">{{page.name}}</div>
      <div v-for="question in page.questions" v-bind:key="question.name">
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
                        <input type="radio" id="html" :name="row.question" :value="question.columns[column - 1]"  v-model="row.answer">
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
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { Survey } from "../data/Survey"

import '../styles/surveyStyles.css'

@Component({
  props: {
    surveyData: Survey,
  },
  components: {
  },
  data () {
    return {

    }
  }
})

export default class SurveyComponent extends Vue {
  // @Prop() private surveyData!: Survey
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
