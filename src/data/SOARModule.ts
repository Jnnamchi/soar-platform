import { Survey } from "./Survey"
import { SurveyAnswer } from "./SurveyAnswer"

export class SOARModule {
  // Fields
  name: string
  initialSurvey: Survey
  answers: SurveyAnswer[]
  // Constructor
	constructor(name: string, initialSurvey: Survey) {
    this.name = name
    this.initialSurvey = initialSurvey
    this.answers = []
	}
  hasBeenCompletedBy (userUid: string) {
    for (const answer of this.answers) {
      if (answer.uid == userUid) {
        return true
      }
    }
    return false
  }
}