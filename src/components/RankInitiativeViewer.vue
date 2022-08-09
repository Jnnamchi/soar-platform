<template>
  <div class="initiativeviewer-main-container">
    <div>
      <div>
        {{initiativeData.answerDetails.score}}
      </div>
      <div>
        {{initiativeData.questionName}}
      </div>
      <!-- Opp vs Nec Scoring -->
      <div>
        <div class="initial-score-summary">
          <div class="viewer-item">
            <div> {{initialSurveyScores.opportunityScore}}</div>
            <div>Opportunity Score</div>
          </div>
          <div class="viewer-item">
            <div> {{initialSurveyScores.necessityScore}}</div>
            <div>Necessity Score</div>
          </div>
        </div>
      </div>
      <!-- Virtual Workshop Scoring -->
      <div class="virtual-workshop-analysis-container">
        <div v-for="[answerTallyQ, consensusAnswers] of  Object.entries(getAnswerTallies(initiativeData.answerDetails))" v-bind:key="answerTallyQ" class="virtual-workshop-analysis viewer-item">
          <div class="text-very-small" style="font-weight: bold">{{consensusAnswers}}</div>
          <div class="text-small">{{answerTallyQ}}</div>
        </div>
      </div>
    </div>

    <!-- {{initialSurveyScores.necessityScore}}
   {{initiativeData}} and {{testData}} -->
  </div>
</template>

<script>

export default {
  name: 'RankInitiativeViewer',
  props: {
    initiativeData: Object,
    initialSurveyScores: Object,
  },
  mounted: function () {
  },
  data () {
    return {
      testData: "hello world",
      nonAnswerKeys: ["id", "questionName", "score"]
    }
  },
  methods: {
    getAnswerTallies (initativeDetails) {
      let answerTallies = {}
      for (let [virtualWorkshopQ, virtualWorkshopQValue] of Object.entries(initativeDetails)) {
        if (!this.nonAnswerKeys.includes(virtualWorkshopQ)) {
          answerTallies[virtualWorkshopQ] = this.getConsensusAnswer(virtualWorkshopQValue)
        }
      }
      return answerTallies
    },
    getConsensusAnswer (answerTally) {
      let consensusAnswers = []
      let maxScore = 0
      for (let answer in answerTally) {
        const answerScore = answerTally[answer]
        if (answerScore === maxScore) {
          consensusAnswers.push(answer)
        }
        if (answerScore > maxScore) {
          consensusAnswers = [answer]
          maxScore = answerScore
        }
      }
      return consensusAnswers.join(", ") + " (" + maxScore + ")"
    }
  }
}
</script>

<style scoped>
.chart-container{
  width: 100%;
  height: 100%;
  /* height: calc(100% - 20px); */
}
.initiativeviewer-main-container {
  width: 100%;
  margin: 0 auto;
}
.standard-panel {
  padding: 25px;
  background-color: #f9f6f4 !important;
  box-shadow: var(--standard-shadow);
  border-radius: 5px;
}
.initial-score-summary {
  width: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
  gap: auto;
}
.viewer-item {
  background-color: white !important;
  border-radius: 5px;
  margin: 5px;
}
.virtual-workshop-analysis-container {
  display: flex;
  justify-content: space-around;
  max-width: 100%;
  flex-wrap: wrap;
}
.virtual-workshop-analysis {
  padding: 5px;
  flex: 1 0 30%;
}
</style>
