import { useMemo } from 'react'
import { selectIsAuth } from '../store/user.slice'
import { useAppSelector } from 'hooks/useStore'

export const useAuth = () => {
  const isAuth = useAppSelector(selectIsAuth)
  return useMemo(() => ({
    isAuth
  }), [isAuth])
}