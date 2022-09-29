import { createSlice } from '@reduxjs/toolkit'
import { TStatus } from 'ts-types/status'
import { fetchLoginAsync } from './user.thunks'

const LS_USER_KEY = 'ruk'

export interface IUserState {
  user: string
  status: TStatus
  error: string
}

const initialState: IUserState = {
  user: localStorage.getItem(LS_USER_KEY) || '',
  status: '',
  error: ''
}

const logout = (state: IUserState) => {
  state.user = ''
  state.status = ''
  state.error = ''
  localStorage.removeItem(LS_USER_KEY)
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    logout
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginAsync.pending, (state) => {
        state.status = 'loading'
        state.error = ''
      })
      .addCase(fetchLoginAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.user = action.payload
        state.error = ''
        localStorage.setItem(LS_USER_KEY, state.user)
      })
      .addCase(fetchLoginAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
      })
  }
})

// export const { login, logout } = userSlice.actions;
export const userAction = userSlice.actions

export default userSlice.reducer;