import { Survey } from "./Survey"

export class Company {
  // Fields
  uuid: string
  name: string
  size: string
  description: string
  category: string
  admins: string[]
  participants: string[]
  modules: string[]
  moduleAnswers: { [key: string]: Object }
  answerAnalysis: any
  topAnswers: any[]
  virtualWorkshops: any
  // Constructor
  constructor(uuid: string, name: string, size: string, description: string, category: string, admins: string[], participants: string[], virtualWorkshops: any) {
    this.uuid = uuid
    this.name = name
    this.size = size
    this.description = description
    this.category = category
    this.admins = admins
    this.participants = participants
    this.modules = []
    this.moduleAnswers = {}
    this.answerAnalysis = {}
    this.topAnswers = []
    this.virtualWorkshops = virtualWorkshops
  }
  addAdmin (uuid: string) {
    this.admins.push(uuid)
  }
  addParticipant (uuid: string) {
    this.participants.push(uuid)
  }
  isOwndeBy(uuid: string) {
    for (const adminId of this.admins) {
      if (adminId == uuid) {
        return true
      }
    }
    return false
  }
  isParticipating(uuid: string) {
    for (const participantId of this.participants) {
      if (participantId == uuid) {
        return true
      }
    }
    return false
  }
  hasMovedToNextRound () {
    return Object.keys(this.virtualWorkshops).length > 0
  }
  addSOARModule (moduleUuid: string) {
    this.modules.push(moduleUuid)
    this.moduleAnswers[moduleUuid] = {}
  }
  userHasCompletedAllModules (userUuid: string) {
    for (const module of this.modules) {
      if (!this.userHasCompletedModule(userUuid, module)) {
        return false
      }
      if (!this.userHasCompletedVirtualWorkshops(userUuid, module)) {
        return false
      }
    }
    return true
  }
  userHasCompletedModule (userUuid: string, moduleUuid: string) {
    if (!(moduleUuid in this.moduleAnswers)) {
      return false
    }
    return userUuid in this.moduleAnswers[moduleUuid]
  }
  userHasCompletedVirtualWorkshops (userUuid: string, moduleUuid: string) {
    if (!(moduleUuid in this.virtualWorkshops)) {
      return true
    }
    const lastVirtualWorkshop = this.getLastVirtualWorkshop(moduleUuid)
    if (!("moduleAnswers" in lastVirtualWorkshop)) {
      return false
    }
    return userUuid in lastVirtualWorkshop.moduleAnswers
  }
  getLastVirtualWorkshop (moduleUuid: string) {
    let lastVirtualWorkshopNumber = "0"
    for (const key in this.virtualWorkshops[moduleUuid]) {
      if (key > lastVirtualWorkshopNumber) {
        lastVirtualWorkshopNumber = key
      }
    }
    if (lastVirtualWorkshopNumber == "0") {
      return {}
    }
    return this.virtualWorkshops[moduleUuid][lastVirtualWorkshopNumber]
  }
  countModuleAnswers (moduleId : string) {
    if (!(moduleId in this.moduleAnswers)) {
      return 0
    }
    return Object.keys(this.moduleAnswers[moduleId]).length
  }
  getModuleAnswerAnalysis (moduleId : string) {
    if (moduleId in this.answerAnalysis) {
      return this.answerAnalysis[moduleId]
    }
    return {}
  }
  addTopAnswers(topAnswers : any[]) {
    this.topAnswers = topAnswers
  }
}

export function CreateCompanyFromObject (companyObj: any): Company {
  const newCompany = new Company("", "", "", "", "", [], [], {})

  // Base fields
  newCompany.uuid = companyObj.uuid
  newCompany.name = companyObj.name
  newCompany.size = companyObj.size
  newCompany.description = companyObj.description
  newCompany.category = companyObj.category
  newCompany.modules = companyObj.modules
  newCompany.moduleAnswers = companyObj.moduleAnswers
  newCompany.answerAnalysis = companyObj.answerAnalysis
  newCompany.virtualWorkshops = companyObj.virtualWorkshops

  // List fields
  for (const admin of companyObj.admins) {
    newCompany.addAdmin(admin)
  }
  for (const participant of companyObj.participants) {
    newCompany.addParticipant(participant)
  }
  return newCompany
}

export function CreateCompanyFromSurvey (survey : Survey): Company {
  const newCompany = new Company("", "", "", "", "", [], [], {})
  for (const page of survey.pages) {
    if (page.name === "Company Details") {
      for (const question of page.questions) {
        if (question.name == "Company Name") {
          newCompany.name = question.answer
        }
        if (question.name == "Company Description") {
          newCompany.description = question.answer
        }
        if (question.name == "Company Size") {
          newCompany.size = question.answer
        }
        if (question.name == "Company Category (e.g. Finance)") {
          newCompany.category = question.answer
        }
      }
    }
  }
  return newCompany
}