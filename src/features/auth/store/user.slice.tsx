import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'store/store'
import { fetchLoginAsync } from './user.thunks'

const LS_IS_AUTH_KEY = 'risAk'

export interface IUserState {
  isAuth: boolean
  status: 'loading' | 'idle' | 'failed' | ''
}

const initialState: IUserState = {
  isAuth: localStorage.getItem(LS_IS_AUTH_KEY) === '1',
  status: ''
}

const logout = (state: IUserState) => {
  state.isAuth = false
  localStorage.removeItem(LS_IS_AUTH_KEY)
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
        state.isAuth = action.payload
        localStorage.setItem(LS_IS_AUTH_KEY, '1')
      })
      .addCase(fetchLoginAsync.rejected, (state) => {
        state.status = 'failed'
        logout(state)
      })
  }
})

// export const { login, logout } = userSlice.actions;
export const userAction = userSlice.actions

export const selectIsAuth = (state: RootState): boolean => state.user.isAuth

export default userSlice.reducer;