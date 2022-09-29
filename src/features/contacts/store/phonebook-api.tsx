import { IContacts } from '../ts/сontacts-interface'

export const fetchPhoneBook = () => {
    return new Promise<IContacts[]>((resolve, reject) => {
      setTimeout(() => {
        fetch('/phones.json')
          .then(res => {
            res.json()
              .then(value => resolve(value))
              .catch(reason => reject(Error(`Error json in fetchPhoneBook. ${reason.message}`).message))
          })
          .catch(reason => {
            reject(Error(`${reason.message}. Details see to log`).message)
          })
      }, 1000)
    })
}