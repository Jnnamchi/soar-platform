import { Survey } from "./Survey"

export class SOARModule {
    // Fields
    name: string
    initialSurvey: Survey
    // Constructor
	constructor(name: string, initialSurvey: Survey, size: number, description: string, category: string) {
        this.name = name
        this.initialSurvey = initialSurvey
	}
    countTotalQuestions() : number {
        let totalQuestions = 0
        return 4
    }
}