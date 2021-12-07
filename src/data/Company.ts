import { User } from "./User"
import { SOARModule } from "./SOARModule"

export class Company {
    // Fields
    uuid: string
    name: string
    size: number
    description: string
    category: string
    admins: string[]
    participants: string[]
    modules: SOARModule[]
    // Constructor
	constructor(uuid: string, name: string, size: number, description: string, category: string, admins: string[], participants: string[]) {
        this.uuid = uuid
        this.name = name
        this.size = size
        this.description = description
        this.category = category
        this.admins = admins
        this.participants = participants
        this.modules = []
	}
    addAdmin (user: User) {
        this.admins.push(user.uuid)
    }
    addParticipant (user: User) {
        this.participants.push(user.uuid)
    }
    isOwndeBy(user: User) {
        for (const adminId of this.admins) {
            if (adminId == user.uuid) {
                return true
            }
        }
        return false
    }
    isParticipating(user: User) {
        for (const participantId of this.participants) {
            if (participantId == user.uuid) {
                return true
            }
        }
        return false
    }
    addSOARModule (module: SOARModule) {
        this.modules.push(module)
    }
}