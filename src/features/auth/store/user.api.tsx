import { IUserLogin } from '../ts/user.interface'

export const requestLoginUser = (args: IUserLogin) => {
  const { password, email } = args
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        if (!email || !password || password === '000000aA') { // for TEST
          reject(Error('Login or password is not indicated').message)
        }
        resolve(email)
      }, 1000)
    })
  }
