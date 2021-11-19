import { SurveyQuestion } from "./SurveyQuestion"
import { Survey, SurveySection } from "./Survey"

const surveyData = {
  title: "Growth Module",
  pages: [
    {
      name: "Base Business Evolution",
      questions: [
        {
          name: "Growing by taking advantage of market conditions & momentum - before pursuing any significant new strategic initiatives.",
          type: "matrix",
          columns: [
            "Significant OPPORTUNITY", "Modest OPPORTUNITY", "Significant NECESSITY", "Modest NECESSITY", "LITTLE OR NO OPPORTUNITY OR NECESSITY", "Don't Know", "NOT APPLICABLE OR RELEVANT"
          ],
          rows: [
            {
              question: "Achieving significant sales growth in the next few years by riding the wave of growth in market demand",
              answer: "",
            },
            {
              question: "Achieving significant sales growth in the next few years - because market forces will allow us to raise prices on some or all products/services and/or customers",
              answer: "",
            },
          ],
          answer: [],
          choices: [],
          items: []
        }
      ]
    }
  ]
}


export function generateTestData (): Survey {

  const surveyPages = []
  for (const section of surveyData.pages) {
    const sectionQuestions = []
    for (const question of section.questions) {
      sectionQuestions.push(new SurveyQuestion(question.name, question.type, question.choices, question.columns, question.rows, question.items, question.answer))
    }
    surveyPages.push(new SurveySection(section.name, sectionQuestions))
  }

  return new Survey(surveyData.title, surveyPages)
}