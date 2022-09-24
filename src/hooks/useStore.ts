import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { phonebookAction, selectContacts, selectLoading } from 'store/phonebook/phonebook.slice'
import type { RootState, AppDispatch } from 'store/store';
import { selectIsAuth, userAction } from 'store/user/user.slice'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppActions = () => {
  const dispatch = useAppDispatch()
  const actions = {
    ...phonebookAction,
    ...userAction
  }
  return bindActionCreators(actions, dispatch)
}

export const useAuth = () => {
  const isAuth = useAppSelector(selectIsAuth)
  return useMemo(() => ({
    isAuth
  }), [isAuth])
}

export const useContacts = () => {
  const contacts = useAppSelector(selectContacts)
  const loadingContacts = useAppSelector(selectLoading)
  return useMemo(() => ({
    contacts, loadingContacts
  }), [contacts, loadingContacts])
}
