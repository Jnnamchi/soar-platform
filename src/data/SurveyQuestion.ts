
export class SurveyQuestion {
    // Fields
    name: string
    type: string
    choices: any[]
    columns: any[]
    rows:    any[]
    items:   any[]
    answer: any
	// Constructor
	constructor(name: string, type: string, choices: any[], columns: any[], rows: any[], items: any[], answer: any) {
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
            const answers = []
            for (const row of this.rows) {
                answers.push(row.answer)
            }
            return answers
        } else {
            return this.answer
        }
        return "This is the question"
    }
}