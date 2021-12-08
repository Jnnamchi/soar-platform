import { SurveyQuestion } from "./SurveyQuestion"

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
}
