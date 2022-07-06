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
      <div>
        <div>Workshops:</div>
        <div>
          <div
            v-for="inPersonWorkshop in selectedCompany.inPersonWorkshops[
              SOARModule
            ]"
            v-bind:key="inPersonWorkshop.name"
          >
            <div
              v-if="inPersonWorkshop.name == selectedWorkshop"
              style="font-weight: bold"
            >
              {{ inPersonWorkshop.name }}
            </div>
            <div v-else v-on:click="selectWorkshop(inPersonWorkshop.name)">
              {{ inPersonWorkshop.name }}
            </div>
          </div>
        </div>
        <div class="medium-space"></div>
        <div
          v-if="
            'videoConferenceDate' in
            selectedCompany.inPersonWorkshops[SOARModule]
          "
          class="notice-message"
        >
          In-person workshop scheduled for: (include zoom link to workshop)
        </div>
        <!-- <div
          v-else
          v-on:click="scheduleVideoConference()"
          class="general-select"
        >
          Schedule video conference
        </div> -->
      </div>
      <div class="medium-space"></div>
      <div v-on:click="saveWorkshopState()">SAVE</div>
      <div class="medium-space"></div>
      <div
        v-for="inPersonWorkshop in selectedCompany.inPersonWorkshops[
          SOARModule
        ]"
        v-bind:key="inPersonWorkshop.name"
      >
        <div
          v-if="inPersonWorkshop.name == selectedWorkshop"
          class="in-person-workshop-container"
        >
          <div :style="getRequiredColumns(inPersonWorkshop.columns)">
            <div></div>
            <div></div>
            <div
              v-for="(column, columnNum) in inPersonWorkshop.columns"
              v-bind:key="columnNum"
            >
              <div class="table-column-header">{{ column.title }}</div>
              <div style="font-size: 11px">{{ column.subtitle }}</div>
            </div>
          </div>
          <div class="medium-space"></div>
          <div>
            <draggable
              tag="ul"
              :list="inPersonWorkshop.rows"
              class="list-group"
              handle=".dragPoint"
            >
              <div v-for="row in inPersonWorkshop.rows" :key="row.questionName">
                <div class="small-space"></div>
                <div :style="getRequiredColumns(inPersonWorkshop.columns)">
                  <div>
                    <i class="drag-icon fa-solid fa-bars dragPoint"></i>
                  </div>
                  <div class="question-name-in-grid">
                    {{ row.questionName }}
                  </div>
                  <div
                    v-for="(column, columnNum) in inPersonWorkshop.columns"
                    v-bind:key="columnNum"
                    class="table-column-header"
                  >
                    <div v-if="column.type == 'text'">
                      <input
                        class="text-input"
                        v-model="row.answers[columnNum]"
                      />
                    </div>
                    <div v-if="column.type == 'textarea'" style="width: ">
                      <textarea
                        rows="4"
                        cols="25"
                        class="textarea-input"
                        v-model="row.answers[columnNum]"
                      >
                      </textarea>
                    </div>
                    <div v-if="column.type == 'date'">
                      <input
                        type="date"
                        class="date-input"
                        v-model="row.answers[columnNum]"
                      />
                    </div>
                    <div v-if="column.type == 'dropdown'">
                      <div style="font-size: 12px">
                        <select v-model="row.answers[columnNum]">
                          <option
                            v-for="option in column.options"
                            v-bind:key="option"
                          >
                            {{ option }}
                          </option>
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
      <a
        target="_blank"
        :href="conference.meeting.join_url"
        class="conference-window"
        v-for="conference in conferences"
        :key="conference.meeting.id"
      >
        <span class="conference-date">
          <i class="fa fa-calendar"></i>
          {{ conference.meeting.start_time.substring(0, 10) }}</span
        >
        <span class="conference-date">{{
          new Date(conference.meeting.start_time).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })
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
      </a>
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
    // RadarChart,
  },
})
export default class SOARModuleAnalysis extends Vue {
  @Prop() private appData!: AppData;
  @Prop() private selectedCompany!: Company;
  @Prop() private SOARModule!: string;

  showModal: boolean = false;
  date: Date = new Date();
  dateData: null = null;
  timeData: null = null;
  conferences: Meeting[] = [];
  conferenceName: string = "";
  duration: number | null = null;
  selectedId: string[] = [];
  loading: boolean = false;

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

  selectedSOARModule = this.appData.modules[this.SOARModule];
  topAnswers: any[] = [];
  selectedWorkshopStage = parseInt(this.getLastVirtualWorkshopNumber());
  hasInPersonWorkshops = this.selectedCompany.hasInPersonWorkshop(
    this.SOARModule
  );
  isViewingInPersonWorkshops = this.selectedCompany.hasInPersonWorkshop(
    this.SOARModule
  );
  selectedWorkshop: string = this.getSelectedWorkshop();

  compare(a: any, b: any) {
    if (a.score < b.score) {
      return 1;
    }
    if (a.score > b.score) {
      return -1;
    }
    return 0;
  }
  compareOpportunities(a: any, b: any) {
    if (a.opportunityScore < b.opportunityScore) {
      return 1;
    }
    if (a.opportunityScore > b.opportunityScore) {
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
  rankAnswers(answerAnalysis: any) {
    const answers = [];
    for (const answerId in answerAnalysis[this.selectedSOARModule.uuid]) {
      if (answerAnalysis[this.selectedSOARModule.uuid][answerId].score > 0) {
        answers.push(
          Object.assign(
            answerAnalysis[this.selectedSOARModule.uuid][answerId],
            { id: answerId }
          )
        );
      }
    }
    answers.sort(this.compareOpportunities);
    this.selectedSOARModule.addQuestionNamesById(answers);
    this.topAnswers = answers;
    return answers;
  }
  rankWorkshopAnswers(answerAnalysis: any) {
    const answers = [];
    for (const answerId in answerAnalysis) {
      if (answerAnalysis[answerId].score > 0) {
        answers.push(Object.assign(answerAnalysis[answerId], { id: answerId }));
      }
    }
    answers.sort(this.compare);
    this.selectedSOARModule.addQuestionNamesById(answers);
    this.topAnswers = answers;
    return answers;
  }
  startVirtualWorkshops() {
    // Add question names by id
    this.moveToNextRound();
  }
  moveToNextRound() {
    this.selectedSOARModule.addQuestionNamesById(this.topAnswers);
    this.runMoveToNextRound();
  }
  async runMoveToNextRound() {
    const url = getServerUrl();
    this.selectedCompany.addTopAnswers(this.topAnswers.slice(0, 15));
    const data = {
      //     company: this.selectedCompany,
      moduleId: this.selectedSOARModule.uuid,
    };
    const response = await axios.post(url + "/createNextWorkshop", data);
    this.selectedCompany.virtualWorkshops = 12;
    this.selectedCompany.virtualWorkshops = response.data.virtualWorkshops;
    this.nextStage();
  }
  getVirtualWorkshop() {
    return this.selectedCompany
      ? this.selectedCompany.virtualWorkshops[this.SOARModule]
      : null;
  }
  getLastVirtualWorkshopNumber() {
    let lastVirtualWorkshopNumber = "0";
    for (const key in this.getVirtualWorkshop()) {
      if (key > lastVirtualWorkshopNumber) {
        lastVirtualWorkshopNumber = key;
      }
    }
    return lastVirtualWorkshopNumber;
  }
  moveToNextVirtualWorkshop() {
    this.selectedSOARModule.addQuestionNamesById(this.topAnswers);
    // console.log(this.topAnswers)
    this.runMoveToNextRound();
  }
  async runMoveToNextVirtualWorkshop() {
    const url = getServerUrl();
    this.selectedCompany.addTopAnswers(this.topAnswers.slice(0, 15));
    const data = {
      company: this.selectedCompany,
      moduleId: this.selectedSOARModule.uuid,
    };
    const response = await axios.post(url + "/createNextWorkshop", data);
    this.selectedCompany.virtualWorkshops = response.data.virtualWorkshops;
    this.nextStage();
  }
  // Create In-Person Workshops
  startInPersonWorkshops() {
    this.runStartInPersonWorkshop();
  }
  async runStartInPersonWorkshop() {
    const url = getServerUrl();
    const data = {
      company: this.selectedCompany,
      moduleId: this.selectedSOARModule.uuid,
    };
    const response = await axios.post(url + "/createInPersonWorkshops", data);
    this.selectedCompany.addInPersonWorkshops(response.data.inPersonWorkshops);
    this.hasInPersonWorkshops = true;
    this.isViewingInPersonWorkshops = true;
    this.$forceUpdate();
  }
  // Navigation
  previousStage() {
    this.isViewingInPersonWorkshops = false;
    this.selectedWorkshopStage = Math.max(this.selectedWorkshopStage - 1, 0);
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
  getRequiredColumns(columns: any) {
    let templateColumns = "grid-template-columns: 30px 300px";
    for (let column of columns) {
      if (column.type == "textarea") {
        templateColumns = templateColumns + " var(--large-width)";
      } else {
        templateColumns = templateColumns + " var(--std-width)";
      }
    }
    templateColumns = templateColumns + ";";
    return "display: grid; gap: 15px; " + templateColumns;
  }
  getVirtualWorkshopRequiredColumns(workshopQuestion: any) {
    let totalColumns = 0;
    const illegalKeys = "score id questionName";
    for (let key in workshopQuestion) {
      if (!illegalKeys.includes(key)) {
        totalColumns = totalColumns + 1;
      }
    }
    let templateColumns = "grid-template-columns: 300px";
    for (let i = 0; i < totalColumns; i++) {
      templateColumns = templateColumns + " var(--large-width)";
    }
    templateColumns = templateColumns + " var(--large-width);";
    return (
      "display: grid; gap: 25px; margin: 0 auto; font-size: 12px; width: fit-content; " +
      templateColumns
    );
  }
  getVirtualWorkshopQuestions(workshopQuestion: any) {
    let totalQuestions = [];
    const illegalKeys = "score id questionName";
    for (let keyName in workshopQuestion) {
      if (!illegalKeys.includes(keyName)) {
        totalQuestions.push(keyName);
      }
    }
    return totalQuestions;
  }
  getConsensusAnswer(answerTally: any) {
    let consensusAnswers: Array<any> = [];
    let maxScore = 0;
    for (let answer in answerTally) {
      const answerScore = answerTally[answer];
      if (answerScore === maxScore) {
        consensusAnswers.push(answer);
      }
      if (answerScore > maxScore) {
        consensusAnswers = [answer];
        maxScore = answerScore;
      }
    }
    return consensusAnswers.join(", ") + " (" + maxScore + ")";
  }
  getSelectedWorkshop(): string {
    if (this.selectedCompany.hasInPersonWorkshop(this.SOARModule)) {
      const workshops: any =
        this.selectedCompany.inPersonWorkshops[this.SOARModule];
      for (let workshop of workshops) {
        return workshop.name;
      }
    }
    return "";
  }
  selectWorkshop(workshopName: string) {
    this.selectedWorkshop = workshopName;
  }
  async saveWorkshopState() {
    const url = getServerUrl();
    const data = {
      companyId: this.selectedCompany.uuid,
      workshops: this.selectedCompany.inPersonWorkshops[this.SOARModule],
      moduleId: this.SOARModule,
    };
    const response = await axios.post(url + "/saveWorkshopState", data);
    this.selectedCompany.inPersonWorkshops = response.data.inPersonWorkshops;
  }
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
    let newdate = `${this.dateData}T${this.convertTo24(this.timeData!)}`;
    let startTime = new Date(newdate).toISOString();
    console.log(startTime);

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

.conference-window {
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
</style>
