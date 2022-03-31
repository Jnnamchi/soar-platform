import { Survey, SurveySection } from "../Survey"
import { SurveyQuestion } from "../SurveyQuestion"

const surveyData = {
    title: "Add New Company",
    pages: [
        {
            name: "Company Details",
            questions: [
                {
                    name: "Company Name",
                    type: "text",
                    columns: [],
                    rows: [],
                    answer: "",
                    choices: [],
                    items: []
                },
                {
                    name: "Company Description",
                    type: "text",
                    columns: [],
                    rows: [],
                    answer: "",
                    choices: [],
                    items: []
                },
                {
                    name: "Company Size",
                    type: "radio",
                    columns: [],
                    rows: [],
                    answer: "",
                    choices: [
                        "0 - 10 employees",
                        "10 - 50 employees",
                        "50 - 100 employees",
                        "100 - 500 employees",
                        "500 - 1000 employees",
                        "1000 - 5000 employees",
                        "More than 5000 employees"
                    ],
                    items: []
                },
                {
                    name: "Company Category (e.g. Finance)",
                    type: "text",
                    columns: [],
                    rows: [],
                    answer: "",
                    choices: [],
                    items: []
                },
            ]
        },
    ]
}

export function generateAddCompanySurvey (): Survey {
    const surveyPages = []
    for (const section of surveyData.pages) {
      const sectionQuestions = []
      for (const question of section.questions) {
        sectionQuestions.push(new SurveyQuestion("", question.name, question.type, question.choices, question.columns, question.rows, question.items, question.answer))
      }
      surveyPages.push(new SurveySection(section.name, sectionQuestions))
    }
    return new Survey(surveyData.title, surveyPages)
}