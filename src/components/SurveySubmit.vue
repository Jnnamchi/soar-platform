<template>
  <div>
    <div v-if="surveyData.isCompleted()" class="general-select">
        SUBMIT HERE
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
import { Survey } from '../data/Survey'

@Component({
  components: {
  },
})
export default class SurveySubmitView extends Vue {
    @Prop() private surveyData!: Survey
}

</script>
