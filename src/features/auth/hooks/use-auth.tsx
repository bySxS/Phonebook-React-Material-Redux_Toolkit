import { bindActionCreators, createSelector } from '@reduxjs/toolkit'
import { useCallback, useMemo } from 'react'
import { RootState } from 'store/store'
import { userAction } from '../store/user.slice'
import { useAppDispatch, useAppSelector } from 'hooks/use-store'
import { fetchLoginAsync } from '../store/user.thunks'

export const useAuth = () => {
  const userState = useCallback((state: RootState): string => state.user.user, [])
  const statusState = useCallback((state: RootState): string => state.user.status, [])
  const isAuth = useAppSelector(createSelector(userState, (item): boolean => item !== ''))
  const isLoading = useAppSelector(createSelector(statusState, (item): boolean => item === 'loading'))
  const user = useAppSelector(userState)
  const status = useAppSelector(statusState)
  const dispatch = useAppDispatch()
  return useMemo(() => {
    const actions = {
      ...userAction,
      login: fetchLoginAsync
    }
    return {
      ...bindActionCreators (actions, dispatch),
      isAuth,
      user,
      isLoading,
      status
    }
  }, [isAuth, user, status, isLoading, dispatch])
}