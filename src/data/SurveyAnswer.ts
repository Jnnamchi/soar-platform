export class SurveyAnswer {
  // Fields
  uid: string
  answer: string[][]
  // Constructor
  constructor(id: string, answers: string[][]) {
    this.uid = id
    if (answers.length > 0) {
      this.answer = answers
    } else {
      this.answer = []
    }
  }
}