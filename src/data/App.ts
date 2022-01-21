import { Company } from './Company'
import { SOARModule } from './SOARModule'
import { User } from './User'

export class AppData {
  // Fields
  companies: { [key: string]: Company }
  modules: { [key: string]: SOARModule }
  users: { [key: string]: User }
  // Constructor
  constructor() {
    this.companies = {}
    this.modules = {}
    this.users = {}
  }
  clearCompanies () {
    this.companies = {}
  }
  addCompany (company : Company) {
    this.companies[company.uuid] = company
  }
  clearModules () {
    this.modules = {}
  }
  addModule (module : SOARModule) {
    this.modules[module.uuid] = module
  }
  clearUsers () {
    this.users = {}
  }
  addUser (user : User) {
    this.users[user.uuid] = user
  }
  getUserName (userUuid : string) {
    return this.users[userUuid].name
  }
  getUserEmail (userUuid : string) {
    return this.users[userUuid].email
  }
  getModuleName (moduleId : string) {
    return this.modules[moduleId].name
  }
  replaceCompany (company : Company) {
    this.companies[company.uuid] = company
  }
}