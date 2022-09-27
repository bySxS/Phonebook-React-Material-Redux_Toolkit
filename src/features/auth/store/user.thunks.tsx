import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchLoginAsync = createAsyncThunk(
  'user/login',
  ({ email }: { email: string, password?: string }): Promise<string> => {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(email)
      }, 1000)
    })
  }
)