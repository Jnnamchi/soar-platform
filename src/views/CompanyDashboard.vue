<template>
  <div>
    <div class="section-title">{{companyName}}</div>
    <div>
      <div>{{selectedCompany.size}} employees</div>
      <div>{{selectedCompany.description}}</div>
      <div>Category: {{selectedCompany.category}}</div>
    </div>
    <div class="medium-space"></div>
    <div class="subsection">
      <div class="subsection-title">Currently enrolled modules</div>
      <div class="subsection-title-description">Select a module to view the company's progress</div>
      <div v-if="selectedCompany.modules.length == 0">
        No modules yet, select one below!
      </div>
      <div v-else>
        <div v-for="module in selectedCompany.modules" v-bind:key="module.name">
          <div v-on:click="openModuleAnalysis(module.name)" class="company-select">{{module.name}}</div>
        </div>
      </div>
    </div>
    <div class="subsection">
      <div class="subsection-title">Add another module</div>
      <span v-if="selectedCompany.modules.length == 0" class="">
        <span v-for="module in modules" v-bind:key="module.name">
          <router-link
          :to="{
            name: 'SOARModuleView',
            params: { SOARModule: module, appData: appData, selectedCompany: selectedCompany, companyName: companyName }
          }"
          class="company-select">
            {{module.name}}
          </router-link>
        </span>
      </span>
      <div class="company-select">Margin Module</div>
      <div class="company-select">Sales Module</div>
      <div class="company-select">HR Module</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
import { Company } from '../data/Company'

import { generateModuleList } from '../data/generator/modules'
import '../styles/positions.css'

@Component
export default class CompanyDashboard extends Vue {
  @Prop() private appData!: Company[]
  @Prop() private companyName!: string

  modules = generateModuleList()

  selectedCompany = this.getSelectedCompany()
  getSelectedCompany () {
    for (const company of this.appData) {
      if (company.name == this.companyName) {
        return company
      }
    }
  }
  openModuleAnalysis (SOARModuleName: string) {
    this.$router.push({name: 'SOARModuleAnalysis', params: {companyName: this.companyName, SOARModuleName: SOARModuleName}})
  }
}
</script>
