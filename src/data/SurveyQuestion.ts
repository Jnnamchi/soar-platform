export class SurveyQuestion {
    // Fields
    id: string
    name: string
    type: string
    choices: any[]
    columns: any[]
    rows: any[]
    items: any[]
    answer: any
	// Constructor
	constructor(id: string, name: string, type: string, choices: any[], columns: any[], rows: any[], items: any[], answer: any) {
    this.id = id
    this.name = name //uuidv4()
		this.type = type
    this.choices = choices
    this.columns = columns
    this.rows = rows
    this.items = items
    this.answer = answer
	}
  isMatrix (): boolean {
    return this.type == "matrix"
  }
  isText (): boolean {
    return this.type == "text"
  }
  isRadio (): boolean {
    return this.type == "radio"
  }
  countAnswers (): number {
    let totalAnswers = 0
    if (this.isMatrix()) {
      for (const row of this.rows) {
        if (row.answer != "") {
          totalAnswers++
        }
      }
    } else {
      if (this.answer != "") {
        return 1
      }
    }
    return totalAnswers
  }
  getAnswer (): any {
    if (this.isMatrix()) {
      const answers: { [key: string]: string; } = {};
      for (const row of this.rows) {
        answers[row.id] = row.answer
      }
      return answers
    }
    return { [this.id]: this.answer}
  }
}

export function CreateSurveyQuestionsFromObject (surveyQuestionsList: any[]) :SurveyQuestion[] {
  const newSurveyQuestions: SurveyQuestion[] = []
  for (const question of surveyQuestionsList) {
    const newSurveyQuestion = new SurveyQuestion(question.id, question.name, question.type, question.choices, question.columns, question.rows, question.items, question.answer)
    newSurveyQuestions.push(newSurveyQuestion)
  }
  return newSurveyQuestions
}
