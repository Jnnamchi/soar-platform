<template>
  <div>
    <div class="section-title">SOAR MODULE ANALYSIS</div>
    <!-- <div class="subsection-title">{{selectedSOARModule.name}}</div> -->
    <div class="subsection-title-description">
      View your company's progress here
    </div>
    <div>
      <div v-if="!isViewingInPersonWorkshops">
        <span
          class="click-text"
          v-if="selectedWorkshopStage > 0"
          v-on:click="previousStage()"
          >&#60;</span
        >
        <span
          class="click-text"
          v-if="selectedWorkshopStage < getLastVirtualWorkshopNumber()"
          v-on:click="nextStage()"
          >&#62;</span
        >
        <span
          class="click-text"
          v-if="
            selectedWorkshopStage == getLastVirtualWorkshopNumber() &&
            hasInPersonWorkshops
          "
          v-on:click="isViewingInPersonWorkshops = true"
          >&#62;</span
        >
      </div>
      <div v-else>
        <span
          class="click-text"
          v-if="
            selectedWorkshopStage == getLastVirtualWorkshopNumber() &&
            hasInPersonWorkshops
          "
          v-on:click="isViewingInPersonWorkshops = false"
          >&#60;</span
        >
      </div>
    </div>
    <div v-if="selectedWorkshopStage === 0">
      <div>Initial Survey</div>
      <div>
        Total Questions:
        {{ selectedSOARModule.initialSurvey.countTotalQuestions() }}
      </div>
      <div>
        Completion: {{ selectedCompany.countModuleAnswers(SOARModule) }} out of
        {{ selectedCompany.participants.length }} registered participants
      </div>
      <div class="medium-space"></div>
      <div v-if="!selectedCompany.hasMovedToNextRound()">
        <div
          v-if="selectedCompany.countModuleAnswers(SOARModule) == 0"
          class="notice-message"
        >
          No answers yet, at least one response is needed to start the next
          workshop
        </div>
        <div v-else class="general-select" v-on:click="startVirtualWorkshops()">
          Start Virtual Workshops
        </div>
      </div>
      <div v-if="selectedSOARModule.answers.length == 0">No answers yet</div>
      <div class="medium-space"></div>
      <div v-if="selectedCompany.countModuleAnswers(SOARModule) > 0">
        <div style="width: 95%; margin: 0 auto">
          <div class="initial-survey-grid table-column-header">
            <div></div>
            <div>Opportunity Score</div>
            <div>Necessity Score</div>
          </div>
          <div class="medium-space"></div>
          <div
            v-for="answer in rankAnswers(selectedCompany.answerAnalysis)"
            v-bind:key="answer.id"
            style="margin-top: 20px; flex: 0 0 400px"
          >
            <div class="initial-survey-grid">
              <div class="question-name-in-grid">{{ answer.questionName }}</div>
              <div>{{ answer.opportunityScore }}</div>
              <div>{{ answer.necessityScore }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="!isViewingInPersonWorkshops">
      <div
        v-for="(workshop, workshopNum) in getVirtualWorkshop()"
        v-bind:key="workshopNum"
      >
        <div v-if="workshopNum == selectedWorkshopStage">
          <div>
            {{ workshop.title }}
          </div>
          <div>
            Completion: {{ Object.keys(workshop.moduleAnswers).length }} out of
            {{ selectedCompany.participants.length }} registered participants
          </div>
          <div v-if="workshopNum == getLastVirtualWorkshopNumber()">
            <div v-if="Object.keys(workshop.moduleAnswers).length > 0">
              <div v-if="workshop.hasNextWorkshop">
                <div class="medium-space"></div>
                <div
                  class="general-select"
                  v-on:click="moveToNextVirtualWorkshop()"
                >
                  Start Next Workshop
                </div>
                <div class="medium-space"></div>
              </div>
              <div v-else-if="!hasInPersonWorkshops">
                <div class="medium-space"></div>
                <div
                  v-on:click="startInPersonWorkshops()"
                  class="notice-message"
                >
                  Start in person workshops
                </div>
                <div class="medium-space"></div>
              </div>
            </div>
            <div v-else>
              <div class="notice-message">
                No answers yet, at least one response is needed to start the
                next workshop
              </div>
            </div>
          </div>
          <div
            style="width: 95%; margin: 0 auto"
            v-if="Object.keys(workshop.moduleAnswers).length > 0"
          >
            <div
              :style="
                getVirtualWorkshopRequiredColumns(
                  rankWorkshopAnswers(workshop.answerAnalysis)[0]
                )
              "
            >
              <div></div>
              <div
                v-for="workshopQuestion in getVirtualWorkshopQuestions(
                  rankWorkshopAnswers(workshop.answerAnalysis)[0]
                )"
                v-bind:key="workshopQuestion"
              >
                {{ workshopQuestion }}
                <div class="table-column-header">Consensus Answer</div>
              </div>
              <div>Updated Score</div>
            </div>
            <div
              v-for="answer in rankWorkshopAnswers(workshop.answerAnalysis)"
              v-bind:key="answer.id"
              style="margin-top: 20px; flex: 0 0 400px"
            >
              <div :style="getVirtualWorkshopRequiredColumns(answer)">
                <div class="question-name-in-grid">
                  {{ answer.questionName }}
                </div>
                <div
                  v-for="workshopQuestion in getVirtualWorkshopQuestions(
                    answer
                  )"
                  v-bind:key="workshopQuestion"
                >
                  {{ getConsensusAnswer(answer[workshopQuestion]) }}
                </div>
                <div style="font-size: 16px">
                  {{ answer.score }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="medium-space"></div>
      <div style="display: grid; grid-template-columns: 250px 250px; margin: 0 auto; width: fit-content;">
        <div class="general-select" v-on:click="selectedInPersonWorkshopView = 'reranking'" style="margin: 0 auto;">
          Re-ranking
        </div>
        <div class="general-select" v-on:click="selectedInPersonWorkshopView = 'actionPlans'" style="margin: 0 auto;">
          Action Plans
        </div>
      </div>
      <div class="medium-space"></div>
      <div v-if="selectedInPersonWorkshopView === 'reranking'">
        <div style="width: 70%; margin: 0 auto;">Each top initiative identified is either a great OPPORTUNITY or a NECESSITY to your business. Go through them below, discuss, and decide which group they should belong to.</div>
        <div class="medium-space"></div>
        <div>{{countAssignedInitiatives(selectedCompany.inPersonWorkshops[SOARModule].reRanking)}} of {{getTotalInitiatives(selectedCompany.inPersonWorkshops[SOARModule].reRanking)}} initiatives have been assigned</div>
        <div class="medium-space"></div>
        <div v-on:click="saveWorkshopState()">
          SAVE
        </div>
        <div class="reranking-grid">
          <div>
            <div>Opportunities</div>
            <div class="medium-space"></div>
            <div>
              <div v-for="initiative of rankAnswersForReranking(selectedCompany.inPersonWorkshops[SOARModule].reRanking.opportunities)"  v-bind:key="initiative.id">
                <div v-if="initiative.oppOrNec == 'Opportunity'">
                  <div class="standard-panel">
                    <div>{{initiative.questionName}}</div>
                    <div class="small-space"></div>
                    <div class="reassign-initative text-small" v-on:click="unassignInitiative(initiative)"><span class="reassign-initative-text">Reassign</span></div>
                  </div>
                  <div class="medium-space"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="reranking-main-column">
            <div v-for="initiative of rankAnswersForReranking(selectedCompany.inPersonWorkshops[SOARModule].reRanking.unassigned)" v-bind:key="initiative.id">
              <div class="standard-panel">
                <RankInitiativeViewer :initiativeData="initiative" :initialSurveyScores="getInitialSurveyScores(initiative)"/>
                <div>
                  <div style="font-size: 12px;">
                    <select :value="initiative.oppOrNec" @change="onAssignInitiative(initiative, $event)">
                      <option v-for="option in ['Opportunity', 'Necessity', 'Unselected']" v-bind:key="option">{{option}}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="medium-space"></div>
            </div>
          </div>
          <div>
            <div>Necessities</div>
            <div class="medium-space"></div>
            <div>
              <div v-for="initiative of rankAnswersForReranking(selectedCompany.inPersonWorkshops[SOARModule].reRanking.necessities)"  v-bind:key="initiative.id">
                <div v-if="initiative.oppOrNec == 'Necessity'">
                  <div class="standard-panel">
                    <div>{{initiative.answerDetails.score}}</div>
                    <div>{{initiative.questionName}}</div>
                    <div class="small-space"></div>
                    <div class="reassign-initative text-small" v-on:click="unassignInitiative(initiative)"><span class="reassign-initative-text">Reassign</span></div>
                  </div>
                  <div class="medium-space"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="selectedInPersonWorkshopView === 'actionPlans'">
        <div>
          <div>
            <div v-for="inPersonWorkshop in selectedCompany.inPersonWorkshops[SOARModule].actionPlan" v-bind:key="inPersonWorkshop.name">
              <div v-if="inPersonWorkshop.name == selectedWorkshop" style="font-weight: bold">{{inPersonWorkshop.name}}</div>
              <div v-else v-on:click="selectWorkshop(inPersonWorkshop.name)">{{inPersonWorkshop.name}}</div>
            </div>
          </div>
        </div>
        <div class="medium-space"></div>
        <div v-on:click="saveWorkshopState()">
          SAVE
        </div>
        <div class="medium-space"></div>
        <div v-for="[, inPersonWorkshop] in Object.entries(selectedCompany.inPersonWorkshops[SOARModule].actionPlan)" v-bind:key="inPersonWorkshop.name" >
          <div v-if="inPersonWorkshop.name == selectedWorkshop" class="in-person-workshop-container" :set="workshopRows = getSelectedWorkshopRows(selectedWorkshop)">
            <div :style="getRequiredColumns(inPersonWorkshop.columns)">
              <div></div>
              <div></div>
              <div v-for="(column, columnNum) in inPersonWorkshop.columns" v-bind:key="columnNum">
                <div class="table-column-header">{{column.title}}</div>
                <div style="font-size: 11px;">{{column.subtitle}}</div>
              </div>
            </div>
            <div class="medium-space"></div>
            <div>
              <draggable tag="ul" :list="workshopRows" class="list-group" handle=".dragPoint">
                <div
                  v-for="(row) in workshopRows"
                  :key="row.questionName"
                >
                  <div class="small-space"></div>
                  <div :style="getRequiredColumns(inPersonWorkshop.columns)">
                    <div>
                      <i class="drag-icon fa-solid fa-bars dragPoint"></i>
                    </div>
                    <div class="question-name-in-grid">
                      {{row.questionName}}
                    </div>
                    <div v-for="(column, columnNum) in inPersonWorkshop.columns" v-bind:key="columnNum" class="table-column-header">
                      <div v-if="column.type == 'text'">
                        <input class="text-input" v-model="row.answers[columnNum]">
                      </div>
                      <div v-if="column.type == 'textarea'" style="width:">
                        <textarea rows="4" cols="25" class="textarea-input" v-model="row.answers[columnNum]">
                        </textarea>
                      </div>
                      <div v-if="column.type == 'date'">
                        <input type="date" class="date-input" v-model="row.answers[columnNum]">
                      </div>
                      <div v-if="column.type == 'dropdown'">
                        <div style="font-size: 12px;">
                          <select v-model="row.answers[columnNum]">
                            <option v-for="option in column.options" v-bind:key="option">{{option}}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </draggable>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!showModal">
      <div v-on:click="scheduleVideoConference()" class="general-select">
        Schedule video conference
      </div>
    </div>
    <div class="add-conference-modal" v-if="showModal">
      <date-picker
        v-model="dateData"
        show-hour
        show-minute
        placeholder="Click to select date"
        valueType="format"
        :disabled-date="disabledRange"
      >
        ></date-picker
      >
      <date-picker
        format="hh:mm A"
        value-type="format"
        v-model="timeData"
        type="time"
        placeholder="Click to select time"
      ></date-picker>
      <input
        class="conference-name-input duration-input"
        v-model.number="duration"
        type="number"
        placeholder="Select duration"
        min="0"
        step="5"
      />
      <input
        class="conference-name-input"
        placeholder="Conference name"
        v-model="conferenceName"
      />
      <button
        class="add-conference-button"
        v-on:click="submitScheduleVideoConference"
      >
        Add New Conference
      </button>
      <button v-on:click="toggleModal" class="close-conference-modal">
        <span class="icon-cross"></span>
      </button>
    </div>
    <div v-if="conferences" class="conferences">
      <div v-for="conference in conferences" :key="conference.meeting.id">
        <div
          v-if="editList.includes(conference.id)"
          class="conference-window edit-window"
        >
          <date-picker
            show-hour
            show-minute
            placeholder="Click to select date"
            value-type="format"
            v-model="editDate"
            :disabled-date="disabledRange"
          >
            ></date-picker
          >
          <date-picker
            format="hh:mm A"
            value-type="format"
            type="time"
            placeholder="Click to select time"
            v-model="editTime"
          ></date-picker>
          <input
            class="conference-name-input duration-input"
            v-model="editDuration"
            type="number"
            placeholder="Select duration"
            min="0"
            step="5"
          />
          <input
            class="conference-name-input"
            placeholder="Conference name"
            v-model="editName"
          />
          <button
            v-on:click.prevent="doneEditing(conference.id)"
            class="edit-button"
            :disabled="confirmDisabled"
          >
            Confirm changes
          </button>
        </div>
        <div v-else class="conference-window">
          <a
            :href="conference.meeting.join_url"
            class="conference-window"
            target="_blank"
          >
            <span class="conference-date">
              <i class="fa fa-calendar"></i>
              {{ conference.meeting.start_time.substring(0, 10) }}</span
            >
            <span class="conference-date">{{
              getAMPMFormat(conference.meeting.start_time)
            }}</span>
            <span class="conference-time">
              <i class="fa fa-clock"></i>
              {{ conference.meeting.duration }} mins</span
            >
            <span class="conference-name">{{ conference.meeting.agenda }}</span>
            <button
              v-if="selectedId.includes(conference.id)"
              class="delete-conference close-conference-modal"
            >
              <div class="lds-dual-ring"></div>
            </button>
            <button
              v-else
              v-on:click.prevent="deleteZoomMeeting(conference.id)"
              class="delete-conference close-conference-modal"
            >
              <span class="icon-cross"></span>
            </button>
            <button
              v-on:click.prevent="editModeHandler(conference.id, conference)"
              :disabled="editMode"
              class="edit-button"
            >
              Edit
            </button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { AppData } from "../data/App";
import { Company } from "../data/Company";
import { getServerUrl } from "../requests/requests";

import axios from "axios";

import "../styles/text.css";
import draggable from "vuedraggable";
// import RadarChart from '../chart-js/RadarChart.vue'
//@ts-ignore:next-line
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

import RankInitiativeViewer from "../components/RankInitiativeViewer.vue"

interface Meeting {
  id: string;
  company_id: string;
  created_at: string;
  created_by: string;
  module_id: string;
  meeting: {
    agenda: string | null;
    created_at: string;
    duration: number;
    id: number;
    join_url: string;
    start_time: string;
    topic: string;
  };
}

interface createMeeting {
  created_by: string;
  start_time: string;
  topic?: string;
  agenda?: string;
  duration: number;
  company_id: string;
  module_id: string;
}

@Component({
  components: {
    draggable,
    DatePicker,
    RankInitiativeViewer,
    // RadarChart,
  },
})
export default class SOARModuleAnalysis extends Vue {
  @Prop() private appData!: AppData;
  @Prop() private selectedCompany!: Company;
  @Prop() private SOARModule!: string;

  // vars for zoom integration
  showModal: boolean = false;
  date: Date = new Date();
  dateData: null = null;
  timeData: null = null;
  conferences: Meeting[] = [];
  conferenceName: string = "";
  duration: number | null = null;
  selectedId: string[] = [];
  editList: string[] = [];
  computedTime: string = "";
  editName: string = "";
  editTime: string = "";
  editDate: string = "";
  editDuration: number | null = null;
  editMode: boolean = false;
  confirmDisabled: boolean = false;

  // Key page vars
  selectedSOARModule = this.appData.modules[this.SOARModule]
  topAnswers: any[] = []
  selectedWorkshopStage = parseInt(this.getLastVirtualWorkshopNumber())
  hasInPersonWorkshops = this.selectedCompany.hasInPersonWorkshop(
    this.SOARModule
  )
  isViewingInPersonWorkshops = this.selectedCompany.hasInPersonWorkshop(
    this.SOARModule
  )
  selectedWorkshop: string = this.getSelectedWorkshop()
  selectedInPersonWorkshopView: string = 'reranking'

  @Watch("duration")
  watchDuration(newValue: any) {
    if (newValue == "") {
      this.duration = 0;
    }
    newValue > 1440
      ? (this.duration = 1440)
      : this.duration && newValue < 0
      ? (this.duration = 0)
      : this.duration;
  }
  @Watch("editDuration")
  watchEditDuration(newValue: any) {
    if (newValue == "") {
      this.editDuration = 0;
    }
    newValue > 1440
      ? (this.editDuration = 1440)
      : this.editDuration && newValue < 0
      ? (this.editDuration = 0)
      : this.editDuration;
  }

  horizontalScroll(element: Element, eventType: WheelEvent) {
    let modifier: number = 1;
    if (eventType.deltaMode == eventType.DOM_DELTA_LINE) {
      modifier = parseInt(getComputedStyle(element).lineHeight);
    } else if (eventType.deltaMode == eventType.DOM_DELTA_PAGE) {
      modifier = element.clientHeight;
    }
    if (eventType.deltaY != 0) {
      // changing vertical scroll to horizontal
      element.scrollLeft += modifier * eventType.deltaY;
      eventType.preventDefault();
    }
  }
  mounted() {
    // horizontal scroll on conferences window functionality
    const conference = document.querySelector(".conferences");
    if (conference) {
      conference.addEventListener("wheel", (event) => {
        this.horizontalScroll(conference, event as WheelEvent);
      });
    }
    this.getZoomMeetings();
  }
  unmounted() {
    const conference = document.querySelector(".conferences");
    if (conference) {
      conference.removeEventListener("wheel", (event) => {
        this.horizontalScroll(conference, event as WheelEvent);
      });
    }
  }

  getAMPMFormat(time: string) {
    let ampmTime = new Date(time).toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    if (ampmTime.length === 7) {
      return (ampmTime = "0" + ampmTime);
    } else {
      return ampmTime;
    }
  }

  convertTime(isoTime: string) {
    var hours = parseInt(isoTime.substring(0, 2), 10),
      minutes = isoTime.substring(3, 5),
      ampm = "am";

    if (hours == 12) {
      ampm = "pm";
    } else if (hours == 0) {
      hours = 12;
    } else if (hours > 12) {
      hours -= 12;
      ampm = "pm";
    }

    return hours + ":" + minutes + " " + ampm;
  }

  //disabled range of values for date picker
  disabledRange(date: Date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  compare(a: any, b: any) {
    if (a.score < b.score) {
      return 1;
    }
    if (a.score > b.score) {
      return -1;
    }
    return 0;
  }
  compareOpportunitiesNecessities (a: any, b: any) {
    const aScore = a.opportunityScore + a.necessityScore
    const bScore = b.opportunityScore + b.necessityScore
    if (aScore < bScore) {
      return 1;
    }
    if (aScore > bScore) {
      return -1;
    }
    return 0;
  }
  compareNecessities(a: any, b: any) {
    if (a.necessityScore < b.necessityScore) {
      return 1;
    }
    if (a.necessityScore > b.necessityScore) {
      return -1;
    }
    return 0;
  }
  rankAnswers (answerAnalysis: any) {
    const answers = []
    for (const answerId in answerAnalysis[this.selectedSOARModule.uuid]) {
      answers.push(Object.assign(answerAnalysis[this.selectedSOARModule.uuid][answerId], {id: answerId}))
    }
    answers.sort(this.compareOpportunitiesNecessities)
    this.selectedSOARModule.addQuestionNamesById(answers)
    this.topAnswers = answers
    return answers
  }
  rankWorkshopAnswers (answerAnalysis: any) {
    const answers = []
    for (const answerId in answerAnalysis) {
      if (answerAnalysis[answerId].score > 0) {
        answers.push(Object.assign(answerAnalysis[answerId], {id: answerId}))
      }
    }
    answers.sort(this.compare)
    this.selectedSOARModule.addQuestionNamesById(answers)
    this.topAnswers = answers
    return answers
  }
  compareReranking (a: any, b: any) {
    if (a.answerDetails.score < b.answerDetails.score) {
      return 1;
    }
    if (a.answerDetails.score > b.answerDetails.score) {
      return -1;
    }
    return 0;
  }
  rankAnswersForReranking (rerankingAnswers: any) {
    const answers = []
    for (const answer of rerankingAnswers) {
      answers.push(answer)
    }
    answers.sort(this.compareReranking)
    return answers
  }
  startVirtualWorkshops () {
    // Add question names by id
    this.moveToNextRound()
  }
  moveToNextRound () {
    this.selectedSOARModule.addQuestionNamesById(this.topAnswers)
    this.runMoveToNextRound()
  }
  async runMoveToNextRound () {
    const url = getServerUrl()
    this.selectedCompany.addTopAnswers(this.topAnswers.slice(0, 15))
    const data = {
        company: this.selectedCompany,
        moduleId: this.selectedSOARModule.uuid
    }
    const response = await axios.post(url + "/createNextWorkshop", data)
    this.selectedCompany.virtualWorkshops = response.data.virtualWorkshops
    this.nextStage()
  }
  getVirtualWorkshop() {
    return this.selectedCompany
      ? this.selectedCompany.virtualWorkshops[this.SOARModule]
      : null;
  }
  getLastVirtualWorkshopNumber () {
    let lastVirtualWorkshopNumber = "0"
    for (const key in this.getVirtualWorkshop()) {
      if (key > lastVirtualWorkshopNumber) {
        lastVirtualWorkshopNumber = key
      }
    }
    return lastVirtualWorkshopNumber
  }
  moveToNextVirtualWorkshop () {
    this.selectedSOARModule.addQuestionNamesById(this.topAnswers)
    this.runMoveToNextRound()
  }
  async runMoveToNextVirtualWorkshop () {
    const url = getServerUrl()
    this.selectedCompany.addTopAnswers(this.topAnswers.slice(0, 15))
    const data = {
      company: this.selectedCompany,
      moduleId: this.selectedSOARModule.uuid
    }
    const response = await axios.post(url + "/createNextWorkshop", data)
    this.selectedCompany.virtualWorkshops = response.data.virtualWorkshops
    this.nextStage()
  }
  // Create In-Person Workshops
  startInPersonWorkshops() {
    this.runStartInPersonWorkshop()
  }
  async runStartInPersonWorkshop () {
    const url = getServerUrl()
    const data = {
      company: this.selectedCompany,
      moduleId: this.selectedSOARModule.uuid
    }
    const response = await axios.post(url + "/createInPersonWorkshops", data)
    this.selectedCompany.addInPersonWorkshops(response.data.inPersonWorkshops)
    this.hasInPersonWorkshops = true
    this.isViewingInPersonWorkshops = true
    this.$forceUpdate()
  }
  // Navigation
  previousStage () {
    this.isViewingInPersonWorkshops = false
    this.selectedWorkshopStage = Math.max(this.selectedWorkshopStage - 1, 0)
  }
  nextStage() {
    this.selectedWorkshopStage = Math.min(
      this.selectedWorkshopStage + 1,
      parseInt(this.getLastVirtualWorkshopNumber())
    );
  }
  buildChartDataFromAnswer(answer: any) {
    const illegalKeys = ["questionName", "score", "id"];
    let labels = [];
    let data = [];
    for (const key in answer) {
      if (!illegalKeys.includes(key)) {
        labels.push(key);
        data.push(answer[key]);
      }
    }
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "My First Dataset",
          data: data,
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(255, 99, 132)",
          pointBackgroundColor: "rgb(255, 99, 132)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(255, 99, 132)",
        },
      ],
    };
    return chartData;
  }
  getRequiredColumns (columns: any) {
    let templateColumns = "grid-template-columns: 30px 300px"
    for (let column of columns) {
      if (column.type == 'textarea') {
        templateColumns = templateColumns + " var(--large-width)"
      } else {
        templateColumns = templateColumns + " var(--std-width)"
      }
    }
    templateColumns = templateColumns + ";"
    return "display: grid; gap: 15px; " + templateColumns
  }
  getVirtualWorkshopRequiredColumns (workshopQuestion: any) {
    let totalColumns = 0
    const illegalKeys = "score id questionName"
    for (let key in workshopQuestion) {
      if (!(illegalKeys.includes(key))) {
        totalColumns = totalColumns + 1
      }
    }
    let templateColumns = "grid-template-columns: 300px"
    for (let i = 0; i < totalColumns; i++) {
      templateColumns = templateColumns + " var(--large-width)"
    }
    templateColumns = templateColumns + " var(--large-width);"
    return "display: grid; gap: 25px; margin: 0 auto; font-size: 12px; width: fit-content; " + templateColumns
  }
  getVirtualWorkshopQuestions (workshopQuestion: any) {
    let totalQuestions = []
    const illegalKeys = "score id questionName"
    for (let keyName in workshopQuestion) {
      if (!(illegalKeys.includes(keyName))) {
        totalQuestions.push(keyName)
      }
    }
    return totalQuestions
  }
  getConsensusAnswer (answerTally: any) {
    let consensusAnswers: Array<any> = []
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
  getSelectedWorkshop () :string {
    if (this.selectedCompany.hasInPersonWorkshop(this.SOARModule)) {
      const workshops: any = this.selectedCompany.inPersonWorkshops[this.SOARModule].actionPlan
      for (let workshopName in workshops) {
        return workshopName
      }
    }
    return ""
  }
  selectWorkshop (workshopName: string) {
    this.selectedWorkshop = workshopName
  }
  getSelectedWorkshopRows (selectedWorkshop: any) {
    if (selectedWorkshop.includes("Necessities")) {
      return this.selectedCompany.inPersonWorkshops[this.SOARModule].reRanking.necessities
    }
    return this.selectedCompany.inPersonWorkshops[this.SOARModule].reRanking.opportunities
  }
  async saveWorkshopState () {
    // this.syncRerankingAndActionPlanTemplates()
    const url = getServerUrl()
    const data = {
      companyId: this.selectedCompany.uuid,
      workshops: this.selectedCompany.inPersonWorkshops[this.SOARModule],
      moduleId: this.SOARModule
    }
    const response = await axios.post(url + "/saveWorkshopState", data)
    this.selectedCompany.inPersonWorkshops = response.data.inPersonWorkshops
  }
  onAssignInitiative (initiative: any, event: any) {
    initiative.oppOrNec = event.target.value
    let removeInitFromUnassign = false
    if (event.target.value == "Opportunity") {
      this.selectedCompany.inPersonWorkshops[this.SOARModule].reRanking.opportunities.push(initiative)
      removeInitFromUnassign = true
    } else if (event.target.value == "Necessity") {
      this.selectedCompany.inPersonWorkshops[this.SOARModule].reRanking.necessities.push(initiative)
      removeInitFromUnassign = true
    }
    if (removeInitFromUnassign) {
      for (let i = 0; i < this.selectedCompany.inPersonWorkshops[this.SOARModule].reRanking.unassigned.length; i++) {
        if (this.selectedCompany.inPersonWorkshops[this.SOARModule].reRanking.unassigned[i].id === initiative.id) {
          this.selectedCompany.inPersonWorkshops[this.SOARModule].reRanking.unassigned.splice(i, 1)
        }
      }
    }
  }
  unassignInitiative (initiative: any) {
    // Add the initiative back to unassigned list
    initiative.oppOrNec = 'Unselected'
    this.selectedCompany.inPersonWorkshops[this.SOARModule].reRanking.unassigned.push(initiative)
    // Remove the initiative from either the opps or necs list
    for (let i = 0; i < this.selectedCompany.inPersonWorkshops[this.SOARModule].reRanking.opportunities.length; i++) {
      if (this.selectedCompany.inPersonWorkshops[this.SOARModule].reRanking.opportunities[i].id === initiative.id) {
        this.selectedCompany.inPersonWorkshops[this.SOARModule].reRanking.opportunities.splice(i, 1)
      }
    }
    for (let i = 0; i < this.selectedCompany.inPersonWorkshops[this.SOARModule].reRanking.necessities.length; i++) {
      if (this.selectedCompany.inPersonWorkshops[this.SOARModule].reRanking.necessities[i].id === initiative.id) {
        this.selectedCompany.inPersonWorkshops[this.SOARModule].reRanking.necessities.splice(i, 1)
      }
    }
  }
  getInitialSurveyScores (initiative: any) {
    return this.selectedCompany.answerAnalysis[this.SOARModule][initiative.id]
  }
  getTotalInitiatives (rerankingObj: any) {
    let totalInitiatives = 0
    for (let iniativeType in rerankingObj) {
      totalInitiatives = totalInitiatives + rerankingObj[iniativeType].length
    }
    return totalInitiatives
  }
  countAssignedInitiatives (rerankingObj: any) {
    const totalInitiatives: any = this.getTotalInitiatives(rerankingObj)
    return totalInitiatives - rerankingObj.unassigned.length
  }

  // Zoom integration here
  scheduleVideoConference() {
    this.toggleModal();
    // TODO:
    // 1. Open a modal allowing the user to select a date and time, and an optional name for the
    // video conference meeting
    // 2. Once selected, submit button calls submitScheduleVideoConference
  }

  async getZoomMeetings() {
    const companyId = this.selectedCompany.uuid;
    const url = getServerUrl();
    const response = await axios.get(
      url + `/zoom/meeting?compny_id=${companyId}`
    );
    this.conferences = response.data.results;
  }

  async createNewMeeting(data: createMeeting) {
    const url = getServerUrl();
    await axios.post(url + "/zoom/meeting", data);
    this.getZoomMeetings();
  }

  async deleteZoomMeeting(meetingId: string) {
    this.selectedId.push(meetingId);
    const url = getServerUrl();
    await axios.delete(url + "/zoom/meeting/" + meetingId);
    await this.getZoomMeetings();
    this.selectedId = this.selectedId.filter((id) => id !== meetingId);
  }

  editModeHandler(meetingId: string, conference: Meeting) {
    this.editMode = true;
    this.editList.push(meetingId);

    this.editTime = this.getAMPMFormat(conference.meeting.start_time);
    this.editDate = conference.meeting.start_time;
    this.editDuration = conference.meeting.duration;
    this.editName = conference.meeting.agenda!;
  }

  async doneEditing(meetingId: string) {
    if (!this.editTime || !this.editDate) {
      alert("You must fill date and time fields");
    } else {
      this.confirmDisabled = true;
      let startTime = new Date(
        `${this.editDate.substring(0, 10)}T${this.convertTo24(this.editTime)}`
      ).toISOString();
      const url = getServerUrl();

      let editMeeting = {
        duration: this.editDuration,
        agenda: this.editName,
        start_time: startTime,
      };
      await axios.patch(url + "/zoom/meeting/" + meetingId, editMeeting);
      await this.getZoomMeetings();
      this.editList = this.editList.filter((id) => id !== meetingId);
      this.editMode = false;
      this.confirmDisabled = false;
    }
  }

  //convert time from am pm to 24 hours
  convertTo24(time: string) {
    let hours = Number(time.match(/^(\d+)/)![1]);
    let minutes = Number(time.match(/:(\d+)/)![1]);
    let AMPM = time.match(/\s(.*)$/)![1];
    if (AMPM === "PM" && hours < 12) hours = hours + 12;
    if (AMPM === "AM" && hours === 12) hours = hours - 12;
    let sHours = hours.toString();
    let sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    return sHours + ":" + sMinutes;
  }

  submitScheduleVideoConference() {
    if (!this.dateData || !this.timeData) {
      alert("You must select date and time");
    } else {
      let startTime = new Date(
        `${this.dateData}T${this.convertTo24(this.timeData!)}`
      ).toISOString();
      let newConference: createMeeting = {
        created_by: Object.keys(this.appData.users)[0],
        company_id: this.selectedCompany.uuid,
        start_time: startTime,
        duration: this.duration ? this.duration : 0,
        module_id: this.SOARModule,
        agenda: this.conferenceName,
      };
      this.createNewMeeting(newConference);

      this.dateData = null;
      this.timeData = null;
      this.conferenceName = "";
      this.duration = null;
    }

    // TODO:
    // 1. When
    // 2. Send request to backend scheduleVideoConference
    //    data must contain: companyId (this.selectedCompany.uuid), moduleId (this.SOARModule)
    // e.g.:
    // const data = {
    //   companyId: this.selectedCompany.uuid,
    //   moduleId: this.SOARModule,
    //   conferenceName: "Video conference 1"
    //   datetime: <selected date and time>
    // }
    // const response = await axios.post(url + "/scheduleVideoConference", data)
    // When response received, update the current selectedCompany to the received one
    // and that should contain the new "videoConferenceDate" key in the inPersonWorkshops key of
    // the company object
  }
}
</script>

<style  lang="scss">
:root {
  --std-width: 100px;
  --large-width: 150px;
}
.table-column-header {
  font-size: 13px;
  font-weight: bold;
}

.drag-icon:hover {
  cursor: pointer;
  font-weight: bold;
}

.text-input,
.date-input,
.dropdown-input {
  width: var(--std-width);
}

.textarea-input {
  width: var(--large-width);
}

.in-person-workshop-container {
  margin: 0 auto;
  width: 80%;
  overflow: scroll;
}

.initial-survey-grid {
  display: grid;
  grid-template-columns: 300px 120px 120px;
  gap: 25px;
  margin: 0 auto;
  width: fit-content;
}

.question-name-in-grid {
  font-size: 12px;
  text-align: left;
}

/* Modal styles */
.add-conference-button {
  background: #42b983;
  padding: 10px 15px;
  border: 1px solid transparent;
  outline: none;
  font-size: 22px;
  color: #fff;
  font-weight: 500;
  border-radius: 4px;
  max-width: 250px;
  cursor: pointer;
  &:hover {
    transition: all 0.5s ease-out;
    transition-property: color, background, border;
    color: #42b983;
    background-color: #fff;
    border: 1px solid #42b983;
  }
}

.add-conference-modal {
  box-shadow: 10px 10px 5px 0px rgba(201, 201, 201, 1);
  background-color: rgba(243, 243, 243, 0.356);
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 500px;
  margin: 0 auto;
  border: 1px solid rgb(219, 219, 219);
  padding: 10px;
  border-radius: 4px;

  button {
    margin: 0 auto;
    margin-top: 10px;
  }
  .mx-datepicker {
    margin: 0 auto;
    .mx-input-wrapper {
      margin-bottom: 10px;
    }
  }
  input {
    box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
    color: #555;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ccc;
    outline: none;
    height: 34px;
    margin: 0 auto;
  }
  .conference-name-input {
    padding: 6px 30px;
    padding-left: 10px;
    font-size: 14px;
  }
}
@mixin cross($size: 20px, $color: currentColor, $thickness: 1px) {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  position: relative;
  width: $size;
  height: $size;

  &:before,
  &:after {
    content: "";
    position: absolute;
    top: ($size - $thickness) / 2;
    left: 0;
    right: 0;
    height: $thickness;
    background: $color;
    border-radius: $thickness;
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }

  span {
    display: block;
  }
}

.close-conference-modal {
  margin: 0;
  border: 0;
  padding: 0;
  background: #42b983;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  position: absolute;
  right: 10px;
  top: 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 150ms;

  .icon-cross {
    @include cross(22px, #fff, 3px);
  }

  &:hover,
  &:focus {
    transform: rotateZ(90deg);
    background: #42b983;
  }
}

.conferences {
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 30px;
  display: flex;
  overflow-x: auto;
  padding: 10px 0;
  border-radius: 4px;
}

.conference-link {
  text-decoration: none;
  height: 100%;
}

.conference-window {
  height: 100%;
  color: #000;
  text-decoration: none;
  margin-right: 10px;
  width: 200px;
  display: flex;
  flex-direction: column;
  min-width: 220px;
  min-height: 200px;
  cursor: pointer;
  box-shadow: 5px 5px 5px 0px rgba(201, 201, 201, 1);
  position: relative;
  &:hover {
    box-shadow: 5px 5px 5px 0px rgb(152, 253, 165);
    transition-property: box-shadow;
    transition-duration: 0.5s;
  }
}

.conference-name,
.conference-date,
.conference-time {
  font-size: 20px;
  font-weight: 700;
  padding-bottom: 10px;
  background-color: rgb(218, 218, 218);
  border-bottom: 1px solid rgb(168, 168, 168);
  padding: 20px;
}

.conference-date,
.conference-time {
  font-size: 16px;
  padding: 15px;
}

.conference-time {
  height: 100%;
  border-bottom: none;
}

.conferences::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}

.conferences::-webkit-scrollbar {
  width: 12px;
  height: 7px;
  background-color: #f5f5f5;
}

.conferences::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #42b983;
}

.delete-conference {
  right: 10px;
  top: 10px;
  background: #a7a7a7;
  transform: scale(0.7);
  .icon-cross {
    @include cross(22px, #fff, 3px);
  }

  &:hover,
  &:focus {
    transform: rotateZ(90deg);
    background: #fca5a5;
  }
}

.duration-input::-webkit-inner-spin-button,
.duration-input::-webkit-outer-spin-button {
  padding: 15px;
  margin-right: -30px;
}

.duration-input {
  margin-bottom: 10px !important;
}
//loader
.lds-dual-ring {
  display: inline-block;
  width: 30px;
  height: 30px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 16px;
  height: 16px;

  border-radius: 50%;
  border: 6px solid rgb(255, 255, 255);
  border-color: rgb(255, 0, 0) transparent rgb(255, 0, 0) transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.edit-window {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding-right: 5px;
  input {
    height: 50px;
    padding: 0 25px 0 10px;
  }
  .mx-datepicker {
    width: 100%;
  }
  .conference-name-input {
    margin-bottom: 0 !important;
  }
}

.edit-button {
  background-color: #42b983;
  border: 1px solid transparent;
  outline: none;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  padding: 5px 0;
  cursor: pointer;
  &:hover {
    border: 1px solid #42b983;
    background-color: #fff;
    color: #42b983;
    transition: border 0.3s, color 0.3s;
  }
}

.edit-button:disabled,
.edit-button[disabled] {
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
  cursor: no-drop;
}
</style>
