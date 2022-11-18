import { v4 as uuidv4 } from 'uuid'

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
  isAdmin(uuids: string[]): boolean {
    for (const uuid of uuids) {
      if (uuid == this.uuid) {
        return true
      }
    }
    return false
  }
}

export function GenerateUniqueID(): string {
  return uuidv4()
}

export function CreateUserFromObject(userObj: any): User {
  return new User(userObj.uuid, userObj.name, userObj.email)
}
export interface IUser {
  email: string
  first_name: string
  password: string
  last_name: string
  job_title: string
  phone: string
  company_name: string
  organization_size: string
  industry: string
}
