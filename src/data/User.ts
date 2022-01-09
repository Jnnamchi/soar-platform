import { v4 as uuidv4 } from 'uuid';

export class User {
    // Fields
    uuid: string
    name: string
    email: string
    // Constructor
	constructor(uuid: string, name: string, email: string) {
        this.uuid = uuid
        this.name = name
        this.email = email
	}
    isAdmin(uuids: string[]) : boolean {
        for (const uuid of uuids) {
            if (uuid == this.uuid) {
                return true
            }
        }
        return false
    }
}

export function GenerateUniqueID () :string {
    return uuidv4()
}