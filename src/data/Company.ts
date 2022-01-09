import { SOARModule } from "./SOARModule"
import { Survey } from "./Survey"

export class Company {
    // Fields
    uuid: string
    name: string
    size: string
    description: string
    category: string
    admins: string[]
    participants: string[]
    modules: SOARModule[]
    // Constructor
	constructor(uuid: string, name: string, size: string, description: string, category: string, admins: string[], participants: string[]) {
        this.uuid = uuid
        this.name = name
        this.size = size
        this.description = description
        this.category = category
        this.admins = admins
        this.participants = participants
        this.modules = []
	}
    addAdmin (uuid: string) {
        this.admins.push(uuid)
    }
    addParticipant (uuid: string) {
        this.participants.push(uuid)
    }
    isOwndeBy(uuid: string) {
        for (const adminId of this.admins) {
            if (adminId == uuid) {
                return true
            }
        }
        return false
    }
    isParticipating(uuid: string) {
        for (const participantId of this.participants) {
            if (participantId == uuid) {
                return true
            }
        }
        return false
    }
    addSOARModule (module: SOARModule) {
        this.modules.push(module)
    }
}

export function CreateCompanyFromSurvey (survey : Survey) {
    const newCompany = new Company("", "", "", "", "", [], [])
    for (const page of survey.pages) {
        if (page.name === "Company Details") {
            for (const question of page.questions) {
                if (question.name == "Company Name") {
                    newCompany.name = question.answer
                }
                if (question.name == "Company Description") {
                    newCompany.description = question.answer
                }
                if (question.name == "Company Size") {
                    newCompany.size = question.answer
                }
                if (question.name == "Company Category (e.g. Finance)") {
                    newCompany.category = question.answer
                }
            }
        }
    }
    return newCompany
}