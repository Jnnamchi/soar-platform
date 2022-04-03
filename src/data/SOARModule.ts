import { Survey, CreateSurveyFromObject } from "./Survey"
import { SurveyAnswer } from "./SurveyAnswer"

export class SOARModule {
  // Fields
  uuid: string
  name: string
  initialSurvey: Survey
  answers: any
  // Constructor
  constructor(uuid: string, name: string, initialSurvey: Survey) {
    this.uuid = uuid
    this.name = name
    this.initialSurvey = initialSurvey
    this.answers = {}
  }
  hasBeenCompletedBy (userUid: string) {
    for (const answer of this.answers) {
      if (answer.uid == userUid) {
        return true
      }
    }
    return false
  }
  addAnswer (answer: SurveyAnswer) {
    this.answers[answer.uuid] = answer.answers
  }
  addQuestionNamesById (answers : any) {
    for (const answer of answers) {
      answer["questionName"] = this.initialSurvey.getQuestionNameById(answer.id)
    }
  }
}

export function CreateModuleFromObject (moduleObj: any): SOARModule {
  // Create the survey first
  const newSurvey = CreateSurveyFromObject(moduleObj.survey)
  const newModule = new SOARModule(moduleObj.uuid, moduleObj.name, newSurvey)
  return newModule
}