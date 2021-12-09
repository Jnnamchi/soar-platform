export class SurveyAnswer {
  // Fields
  uid: string
  answer: string[]
  // Constructor
  constructor(id: string) {
    this.uid = id
	this.answer = []
  }
}