<template>
  <div class="home">
    <div>
      <div>
        <h1>Company Details {{companyName}}</h1>
      </div>
      <div>
        Name: {{selectedCompany.name}}
      </div>
      <div>
        Size: {{selectedCompany.size}} employees
      </div>
      <div>
        Description: {{selectedCompany.description}}
      </div>
      <div>
        Category: {{selectedCompany.category}}
      </div>
    </div>
    <div>
      <div>
        <h1>Modules</h1>
      </div>
      <div v-if="selectedCompany.modules.length == 0">
        No modules yet, select one now!
        <div v-for="module in modules" v-bind:key="module.name">
          <router-link
          :to="{
            name: 'SOARModuleView',
            params: { SOARModule: module, appData: appData, selectedCompany: selectedCompany, companyName: companyName }
          }">
            {{module.name}}
          </router-link>
        </div>
      </div>
      <div v-else>
        <div v-for="module in selectedCompany.modules" v-bind:key="module.name">
          <div v-on:click="openModuleAnalysis(module.name)">{{module.name}}</div>
        </div>
        <div>
          <h2>Add another module</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
import { Company } from '../data/Company'

import { generateModuleList } from '../data/generator/modules'

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
