
export class SurveyQuestion {
    // Fields
    name: string
    type: string
    choices: (Object | string | number)[]
    columns: (Object | string | number)[]
    rows:    (Object | string | number)[]
    items:   (Object | string | number)[]
    answer: any
	// Constructor
	constructor(name: string, type: string, choices: (Object | string | number)[], columns: (Object | string | number)[], rows: (Object | string | number)[], items: (Object | string | number)[], answer: any) {
        this.name = name //uuidv4()
		this.type = type
        this.choices = choices
        this.columns = columns
        this.rows = rows
        this.items = items
        this.answer = answer
	}
}