export interface IAuthData {
  email: string
  password: string
}

export interface IUserData {
  email?: string
  id?: string
  first_name?: string
  last_name?: string
  role?: string
}

export interface IAuthVerificationData {
  id: string
  code: string
}

export interface IAdminData extends IAuthData {
  first_name: string
  last_name: string
  job_title: string
  phone: string
  company_name: string
  organization_size: string
  industry: string
}

export interface IChangePassword {
  id: string
  password: string
}
