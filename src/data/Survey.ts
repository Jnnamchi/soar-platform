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
}
