import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchLoginAsync = createAsyncThunk(
  'user/login',
  ({ email, password }: { email: string, password: string }) => {
    console.log(email, password)
    return true
  }
)