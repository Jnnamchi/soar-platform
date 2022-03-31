export class SurveyAnswer {
  // Fields
  uuid: string
  answers: any
  // Constructor
  constructor(id: string, answers: any) {
    this.uuid = id
    this.answers = answers
  }
}