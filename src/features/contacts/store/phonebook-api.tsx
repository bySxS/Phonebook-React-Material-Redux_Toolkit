import { IContacts } from '../ts/сontacts-interface'

export const fetchPhoneBook = () => {
    return new Promise<IContacts[]>((resolve, reject) => {
      setTimeout(() => {
        try {
          fetch('/phones.json')
            .then(res => resolve(res.json()))
        } catch (e) {
          reject((e as Error).message)
        }
      }, 1000)
    })
}