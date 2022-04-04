import { SurveyQuestion, CreateSurveyQuestionsFromObject } from "./SurveyQuestion"
import { SurveyAnswer } from "./SurveyAnswer"

export class SurveySection {
  // Fields
  name: string
  questions: SurveyQuestion[]
  // Constructor
	constructor(name: string, questions: SurveyQuestion[]) {
    this.name = name
		this.questions = questions
	}
}

export class Survey {
  // Fields
  title: string
  pages: SurveySection[]
  // Constructor
	constructor(title: string, pages: SurveySection[]) {
    this.title = title
		this.pages = pages
	}
  countTotalQuestions() : number {
    let totalQuestions = 0
    for (const page of this.pages) {
      for (const question of page.questions) {
        if (question.isMatrix()) {
          totalQuestions += question.rows.length
        } else {
          totalQuestions++
        }
      }
    }
    return totalQuestions
  }
  countAnsweredQuestions () : number {
    let totalAnswers = 0
    for (const page of this.pages) {
      for (const question of page.questions) {
        totalAnswers += question.countAnswers()
      }
    }
    return totalAnswers
  }
  isCompleted (): boolean {
    return this.countTotalQuestions() === this.countAnsweredQuestions()
  }
  buildAnswerList (userId: string) :SurveyAnswer {
    const answers = {}
    for (const page of this.pages) {
      for (const question of page.questions) {
        Object.assign(answers, question.getAnswer())
      }
    }
    return new SurveyAnswer(userId, answers)
  }
  buildVirtualWorkshopAnswerList () :SurveyAnswer {
    const answers: any = {}
    let num: number = 1
    for (const page of this.pages) {
      const key = "question" + num
      answers[key] = {}
      for (const question of page.questions) {
        Object.assign(answers[key], question.getAnswer())
      }
      num++
    }
    return answers
  }
  getQuestionNameById (questionId: string) {
    for (const page of this.pages) {
      for (const question of page.questions) {
        if (question.isMatrix()) {
          for (const matrixQ of question.rows) {
            if (matrixQ.id == questionId) {
              return matrixQ.question
            }
          }
        } else if (question.id == questionId) {
          return question.name
        }
      }
    }
    return "Could not find question"
  }
}

export function CreateSurveySectionsFromObject (surveyPagesList: any[]) :SurveySection[] {
  const newSurveySections: SurveySection[] = []
  for (const page of surveyPagesList) {
    const newSurveyPage = new SurveySection(page.name, CreateSurveyQuestionsFromObject(page.questions))
    newSurveySections.push(newSurveyPage)
  }
  return newSurveySections
}

export function CreateSurveyFromObject (surveyObj: any) :Survey {
  // Create the survey and sections first
  const newSurveySections = CreateSurveySectionsFromObject(surveyObj.pages)
  const newSurvey = new Survey("", newSurveySections)

  // Base fields
  newSurvey.title = surveyObj.title

  return newSurvey
}