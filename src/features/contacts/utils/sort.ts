import { IContacts } from '../ts/сontacts-interface'

export function sortContacts (contacts: IContacts[]): IContacts[] {
  return contacts.sort((a, b) => {
    const nameA = a.name.first.toLowerCase()
    const nameB = b.name.first.toLowerCase()
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    return 0
  })
}