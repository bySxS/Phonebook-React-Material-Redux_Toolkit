import { useMemo } from 'react'
import { selectContacts, selectLoading } from '../store/phonebook.slice'
import { useAppSelector } from 'hooks/useStore'

export const useContacts = () => {
  const contacts = useAppSelector(selectContacts)
  const loadingContacts = useAppSelector(selectLoading)
  return useMemo(() => ({
    contacts, loadingContacts
  }), [contacts, loadingContacts])
}