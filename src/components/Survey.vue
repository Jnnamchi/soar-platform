<template>
  <div class="hello">
    <div>
      {{surveyData.title}}
    </div>
    <div v-for="page in surveyData.pages" v-bind:key="page.name">
      {{page.name}}
      <div v-for="question in page.questions" v-bind:key="question.name">
        {{question.name}}
        <div v-if="question.type == 'matrix'">
          is matrix
          <div>
            <span v-for="column in question.columns" v-bind:key="column">
              {{column}}, 
            </span>
            <div v-for="row in question.rows" v-bind:key="row.question">
              {{row.question}}: {{row.answer}}
              <div v-for="column in question.columns.length - 1" v-bind:key="column">
                <input type="radio" id="html" :name="row.question" :value="question.columns[column - 1]"  v-model="row.answer">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { Survey } from "../data/Survey"

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
