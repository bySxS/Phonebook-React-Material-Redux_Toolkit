import { IContacts } from '../ts/сontacts-interface'

export const fetchPhoneBook = () => {
    return new Promise<IContacts[]>((resolve, reject) => {
      setTimeout(() => {
        fetch('/phones.json')
          .then(res => resolve(res.json()))
          .catch(reason => {
            reject(Error(`${reason.message}. Details see to log`).message)
          })
      }, 1000)
    })
}