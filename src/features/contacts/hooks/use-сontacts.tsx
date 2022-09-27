import { bindActionCreators, createSelector } from '@reduxjs/toolkit'
import { useCallback, useMemo } from 'react'
import { RootState } from 'store/store'
import { phonebookAction } from '../store/phonebook-slice'
import { useAppDispatch, useAppSelector } from 'hooks/use-store'
import { fetchPhoneBookAsync } from '../store/phonebook-thunks'
import { IContacts } from '../ts/сontacts-interface'

export const useContacts = () => {
  const contactsState = useCallback((state: RootState): IContacts[] => state.phonebook.contacts, [])
  const statusState = useCallback((state: RootState): string => state.phonebook.status, [])
  const isLoading = useAppSelector(createSelector(statusState, (item): boolean => item === 'loading'))
  const status = useAppSelector(statusState)
  const contacts = useAppSelector(contactsState)
  const dispatch = useAppDispatch()
  return useMemo(() => {
    const actions = {
      ...phonebookAction,
      fetchContacts: fetchPhoneBookAsync,
    }
    return {
      ...bindActionCreators (actions, dispatch),
      contacts,
      isLoading,
      status
    }
  }, [contacts, isLoading, status, dispatch])
}