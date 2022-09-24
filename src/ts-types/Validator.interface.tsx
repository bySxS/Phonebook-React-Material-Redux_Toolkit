export interface IValidatorUser {
  email?: string
  password?: string
}

export interface IValidatorUserResults {
  success: boolean
  errors: IValidatorUser
}