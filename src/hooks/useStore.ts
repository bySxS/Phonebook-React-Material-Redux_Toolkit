import { bindActionCreators } from '@reduxjs/toolkit'
import {
  TypedUseSelectorHook, useDispatch, useSelector
} from 'react-redux';
import {
  phonebookAction
} from 'features/contacts/store/phonebook.slice'
import type { RootState, AppDispatch } from 'store/store';
import { userAction } from 'features/auth/store/user.slice'
import { fetchPhoneBookAsync } from 'features/contacts/store/phonebook.thunks'
import { fetchLoginAsync } from 'features/auth/store/user.thunks'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppActions = () => {
  const dispatch = useAppDispatch()
  const actions = {
    ...phonebookAction,
    ...userAction,
    fetchPhoneBookAsync,
    fetchLoginAsync
  }
  return bindActionCreators(actions, dispatch)
}
