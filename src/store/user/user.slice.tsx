import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'store/store'

const LS_IS_AUTH_KEY = 'risAk'

export interface IUserState {
  isAuth: boolean
}

const initialState: IUserState = {
  isAuth: localStorage.getItem(LS_IS_AUTH_KEY) === '1'
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state) => {
      state.isAuth = true
      localStorage.setItem(LS_IS_AUTH_KEY, '1')
    },
    logout: (state) => {
      state.isAuth = false
      localStorage.removeItem(LS_IS_AUTH_KEY)
    }
  }
});

// export const { login, logout } = userSlice.actions;
export const userAction = userSlice.actions;

export const selectIsAuth = (state: RootState) => state.user.isAuth;

export default userSlice.reducer;