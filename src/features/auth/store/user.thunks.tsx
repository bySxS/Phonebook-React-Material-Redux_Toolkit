import { createAsyncThunk } from '@reduxjs/toolkit'
import { IUserLogin } from '../ts/user.interface'
import { requestLoginUser } from './user.api'

export const fetchLoginAsync = createAsyncThunk(
  'user/login',
  async (args: IUserLogin, { rejectWithValue }) => {
    try {
      return await requestLoginUser(args)
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)