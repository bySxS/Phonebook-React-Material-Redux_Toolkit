import { IValidatorUserResults, IValidatorUser } from 'ts-types/Validator.interface'

export const validateUser = ({ email, password }: IValidatorUser): IValidatorUserResults => {
  let isValid = true
  let emailErr
  if ((typeof email !== 'undefined') &&
    email.trim() === '') {
    emailErr = 'Please enter your e-mail'
    isValid = false
  } else if ((typeof email !== 'undefined') &&
    !email.match('(\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,6})')) {
    emailErr = 'Please enter a valid e-mail'
    isValid = false
  }

  let passwordErr
  if ((typeof password !== 'undefined') &&
    password.trim() === '') {
    passwordErr = 'Please enter a password'
    isValid = false
  } else if ((typeof password !== 'undefined') &&
    !password.match('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,20})')) {
    passwordErr = 'Password must be at least 8 characters, at least 1 number, 1 capital letter and 1 small letter'
    isValid = false
  }

  return {
    success: isValid,
    errors: {
      email: emailErr,
      password: passwordErr,
    }
  }
}