import { createSlice } from '@reduxjs/toolkit'
import { TStatus } from 'ts-types/status'
import { fetchLoginAsync } from './user.thunks'

const LS_USER_KEY = 'ruk'

export interface IUserState {
  user: string
  status: TStatus
}

const initialState: IUserState = {
  user: localStorage.getItem(LS_USER_KEY) || '',
  status: ''
}

const logout = (state: IUserState) => {
  state.user = ''
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
      })
      .addCase(fetchLoginAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.user = action.payload
        localStorage.setItem(LS_USER_KEY, state.user)
      })
      .addCase(fetchLoginAsync.rejected, (state) => {
        state.status = 'failed'
        logout(state)
      })
  }
})

// export const { login, logout } = userSlice.actions;
export const userAction = userSlice.actions

export default userSlice.reducer;