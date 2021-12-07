import { SurveyQuestion } from "./SurveyQuestion"
import { Survey, SurveySection } from "./Survey"
import { Company } from "./Company"
import { User } from "./User"

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
    },
    {
      name: "Growing Wallet Share",
      questions: [
        {
          name: "Getting a bigger share of existing customer spending dollars.",
          type: "matrix",
          columns: [
            "Significant OPPORTUNITY", "Modest OPPORTUNITY", "Significant NECESSITY", "Modest NECESSITY", "LITTLE OR NO OPPORTUNITY OR NECESSITY", "Don't Know", "NOT APPLICABLE OR RELEVANT"
          ],
          rows: [
            {
              question: "Selling more of the same products or services those customers ARE currently buying from us",
              answer: "",
            },
            {
              question: "Selling existing products or services those customers ARE NOT currently buying from us",
              answer: "",
            },
            {
              question: "Expanding our product line to sell products or services we DON'T currently offer to existing customers",
              answer: "",
            },
            {
              question: "Improving focus on up-selling - to encourage customers to expand the size of their purchases",
              answer: "",
            },
          ],
          answer: [],
          choices: [],
          items: []
        }
      ]
    },
    {
      name: "Expanding Market Share",
      questions: [
        {
          name: "Growing by securing new customers in existing markets.",
          type: "matrix",
          columns: [
            "Significant OPPORTUNITY", "Modest OPPORTUNITY", "Significant NECESSITY", "Modest NECESSITY", "LITTLE OR NO OPPORTUNITY OR NECESSITY", "Don't Know", "NOT APPLICABLE OR RELEVANT"
          ],
          rows: [
            {
              question: "Pursuing and selling to new Customersm- in existing markets, segments, geographies and channels",
              answer: "",
            },
            {
              question: "Enhancing the company's Value Proposition - to make it more attractive to new customers",
              answer: "",
            },
            {
              question: "Improving marketing and advertising to increase new customer awareness and perception of the company",
              answer: "",
            },
            {
              question: "Improving sales force effectiveness to increase ability to identify and land new customers",
              answer: "",
            },
          ],
          answer: [],
          choices: [],
          items: []
        }
      ]
    },
    {
      name: "Growth From New Products",
      questions: [
        {
          name: "Using product development & upgrades to grow sales revenue.",
          type: "matrix",
          columns: [
            "Significant OPPORTUNITY", "Modest OPPORTUNITY", "Significant NECESSITY", "Modest NECESSITY", "LITTLE OR NO OPPORTUNITY OR NECESSITY", "Don't Know", "NOT APPLICABLE OR RELEVANT"
          ],
          rows: [
            {
              question: "Doing product upgrades and/or technological improvements/innovation to facilitate relaunching the product with new & improved features & benefits (Example: Increasing battery power of a mobile phone)",
              answer: "",
            },
            {
              question: "Developing and/or sourcing new products that are extensions to current product lines (Example: Coke introducing Cherry Coke)",
              answer: "",
            },
            {
              question: "Developing and/or sourcing new products where the changes are more extensive than product extensions but ARE connected to the core business and/or current product lines (Example: Coke introducing bottled water)",
              answer: "",
            },
            {
              question: "Developing and/or sourcing new products are where the changes are more extensive than product extensions and are NOT connected to the core business and/or current product lines (completely new) (Example: Amazon offering cloud data storage services in its AWS division)",
              answer: "",
            },
            {
              question: "Developing or introducing new products - in the form of existing products that are re-positioned to generate growth from new customers or markets (Example: aspirin being used for heart health)",
              answer: "",
            },
            {
              question: "Developing or introducing new products and/or product lines - that are completely new to the world (Example: 3M's development of Post-It-Notes)",
              answer: "",
            },
            {
              question: "Changing product technology, delivery mechanism, cost structure or customer experience - to leapfrog or obsolete existing players (Examples: Cell phones, Netflix, Uber, Starbucks, Southwest Airlines)",
              answer: "",
            },
          ],
          answer: [],
          choices: [],
          items: []
        }
      ]
    },
    {
      name: "Growth From New Segments, Locations, Geographies, Channels",
      questions: [
        {
          name: "Stretching from current comfort zone.",
          type: "matrix",
          columns: [
            "Significant OPPORTUNITY", "Modest OPPORTUNITY", "Significant NECESSITY", "Modest NECESSITY", "LITTLE OR NO OPPORTUNITY OR NECESSITY", "Don't Know", "NOT APPLICABLE OR RELEVANT"
          ],
          rows: [
            {
              question: "Selling into new Market SEGMENTS - using predominantly current products or technologies (perhaps with some modifications to adapt to the new segments)",
              answer: "",
            },
            {
              question: "Opening new locations - in existing geographies",
              answer: "",
            },
            {
              question: "Opening new locations in (or selling into) new Geographies - that ARE close to existing geographies",
              answer: "",
            },
            {
              question: "Opening new locations in (or selling into) new Geographies - that ARE NOT close to existing geographies",
              answer: "",
            },
            {
              question: "Selling through new Channels of Distribution",
              answer: "",
            },
            {
              question: "Selling via E- Commerce - via platforms like Amazon",
              answer: "",
            },
            {
              question: "Selling via E- Commerce - via the portals of retailers like Walmart, Target, Wayfair, etc",
              answer: "",
            },
            {
              question: "Selling via E- Commerce - direct to consumers via the company's own site",
              answer: "",
            },
          ],
          answer: [],
          choices: [],
          items: []
        }
      ]
    },
    {
      name: "Non-Organic Growth",
      questions: [
        {
          name: "External Ways to Grow",
          type: "matrix",
          columns: [
            "Significant OPPORTUNITY", "Modest OPPORTUNITY", "Significant NECESSITY", "Modest NECESSITY", "LITTLE OR NO OPPORTUNITY OR NECESSITY", "Don't Know", "NOT APPLICABLE OR RELEVANT"
          ],
          rows: [
            {
              question: "Acquiring, or merging with, another business",
              answer: "",
            },
            {
              question: "Acquiring product lines and/or customer lists from another business",
              answer: "",
            },
            {
              question: "Vertical integration - acquire (or develop) supplier or customer's business",
              answer: "",
            },
            {
              question: "Strategic hires - hire one or more people who can bring a significant customer base, unique expertise or access to markets or supply chains",
              answer: "",
            },
            {
              question: "Entering into Joint Ventures or Alliances - to enhance ability to offer new capabilities, technologies, products, - expand ability to penetrate new markets, segments, geographies or channels",
              answer: "",
            },
            {
              question: "Entering into Franchising and/or Licensing Agreements - to enhance ability to offer new capabilities, technologies, products, - expand ability to penetrate new markets, segments, geographies or channels",
              answer: "",
            },
          ],
          answer: [],
          choices: [],
          items: []
        }
      ]
    },
    {
      name: "Margins",
      questions: [
        {
          name: "Improve Gross Profit Margins",
          type: "matrix",
          columns: [
            "Significant OPPORTUNITY", "Modest OPPORTUNITY", "Significant NECESSITY", "Modest NECESSITY", "LITTLE OR NO OPPORTUNITY OR NECESSITY", "Don't Know", "NOT APPLICABLE OR RELEVANT"
          ],
          rows: [
            {
              question: "Raising prices on some or all products and/or customers",
              answer: "",
            },
            {
              question: "Reducing discount s and allowances given to customers",
              answer: "",
            },
            {
              question: "Reducing rebates to customers",
              answer: "",
            },
            {
              question: "Reducing margin leakage - from customers who buy at prices that are not justified by the volume of purchases or other factors - when compared with other similar customers",
              answer: "",
            },
            {
              question: "Reducing margin leakage - customers who are given discounts and/or rebates that are not justified by the volume of purchases or other factors - when compared with other similar customers",
              answer: "",
            },
            {
              question: "Reducing margin leakage - customers who are under charged for freight, shipping and handling or other support or services that are not justified by the volume of purchases or other factors - when compared with other similar customers",
              answer: "",
            },
            {
              question: "Reducing margin leakage - by quickly passing on supply chain, labor & other cost increases",
              answer: "",
            },
            {
              question: "Improving analysis of the \"Cost-to- Serve\" customers - and using this information to maximize pricing and true customer profitability after taking Cost-to- Serve into account. (Cost-to-Serve are the costs derived from extra service, service and expenses incurred to serve specific customers - that are not captured in Cost of Goods sold).",
              answer: "",
            },
          ],
          answer: [],
          choices: [],
          items: []
        },
        {
          name: "Other Ways to Improve Profitability & Gross Profit Margins",
          type: "matrix",
          columns: [
            "Significant OPPORTUNITY", "Modest OPPORTUNITY", "Significant NECESSITY", "Modest NECESSITY", "LITTLE OR NO OPPORTUNITY OR NECESSITY", "Don't Know", "NOT APPLICABLE OR RELEVANT"
          ],
          rows: [
            {
              question: "Improve product mix to focus on higher margin products",
              answer: "",
            },
            {
              question: "Reducing the complexity, inefficiency & cost of estimating, quoting, order entry, picking, staging, fulfilling and shipping orders",
              answer: "",
            },
            {
              question: "Improve supply chain to reduce costs and improve terms and conditions",
              answer: "",
            },
            {
              question: "Improve raw material and/or product yields",
              answer: "",
            },
            {
              question: "Reduce waste, scrap & inventory obsolescence",
              answer: "",
            },
            {
              question: "Enhance value engineering and/or product redesign to reduce materials, labor or overhead costs or enhance value proposition",
              answer: "",
            },
            {
              question: "Improve team member engagement, teamwork and morale - to facilitate improvement in productivity, sales growth, profitability and margin improvment",
              answer: "",
            },
            {
              question: "Improve focus on continuous improvement and/or customer service/satisfaction - to facilitate improvement in productivity, sales growth, profitability and margin improvment",
              answer: "",
            },
            {
              question: "Improve IT and/or information systems - to facilitate improvement in productivity, sales growth, profitability and margin improvment",
              answer: "",
            },
          ],
          answer: [],
          choices: [],
          items: []
        }
      ]
    },
    {
      name: "Details About You",
      questions: [
        {
          name: "What is your first and last name (optional)?",
          type: "text",
          columns: [],
          rows: [],
          answer: "",
          choices: [],
          items: []
        },
        {
          name: "What is your work email address (optional)?",
          type: "text",
          columns: [],
          rows: [],
          answer: "",
          choices: [],
          items: []
        },
        {
          name: "What department are you in (optional)?",
          type: "text",
          columns: [],
          rows: [],
          answer: "",
          choices: [],
          items: []
        },
        {
          name: "What location do you work in (optional)?",
          type: "text",
          columns: [],
          rows: [],
          answer: "",
          choices: [],
          items: []
        },
        {
          name: "What is your title (optional)?",
          type: "text",
          columns: [],
          rows: [],
          answer: "",
          choices: [],
          items: []
        },
        {
          name: "How long have you worked for the company (optional)?",
          type: "radio",
          columns: [],
          rows: [],
          answer: "",
          choices: [
            "Less than a year",
            "1 - 2 years",
            "3 - 5 years",
            "6 - 10 years",
            "11 - 20 years",
            "More than 20 years"
          ],
          items: []
        },
        {
          name: "Describe the position in the organization that best fits your role (Required)",
          type: "radio",
          columns: [],
          rows: [],
          answer: "",
          choices: [
            "C-Suite, including CEO, President, COO, Board Member, Owner",
            "Executive Management, including General Manager, Senior/Executive Vice President",
            "Vice President",
            "Director",
            "Manager",
            "Supervisor",
            "Non-manager - hourly",
            "Non-manager - salary",
            "Other"
          ],
          items: []
        }
      ]
    },
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

export function generateTestUser (): User {
    return new User("ab3b453", "John Nnamchi", "john.nnamchi@simvo.io")
}

export function generateTestCompany (): Company {
    return new Company("12345", "Bloomberg LP", 20000, "Financial Information and News Company", "Finance", [], [])
}

export function generateTestCompanies (user: User): Company[] {
    const newCompany = generateTestCompany()
    if (user) {
        newCompany.addAdmin(user)
        newCompany.addParticipant(user)
    }
    return [newCompany]
}

export function generateHomePageDataState () {

}