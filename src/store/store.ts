import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import phonebookReducer from './phonebook/phonebook.slice'
import userReducer from './user/user.slice'

export const store = configureStore({
  reducer: {
    phonebook: phonebookReducer,
    user: userReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
