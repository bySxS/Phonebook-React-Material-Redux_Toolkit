import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IContacts } from 'features/contacts/ts/сontacts-interface'
import { TStatus } from 'ts-types/status'
import { sortContacts } from '../utils/sort'
import { fetchPhoneBookAsync } from './phonebook-thunks'

export interface IUserState {
  contacts: IContacts[]
  status: TStatus
  error: string
}

const initialState: IUserState = {
  contacts: [],
  status: '',
  error: ''
}

export const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<IContacts>) => {
      state.contacts.push(action.payload)
      state.contacts = sortContacts(state.contacts)
    },
    editContact: (state, action: PayloadAction<IContacts>) => {
      const { payload } = action
      state.contacts = state.contacts.map(o => {
        if (o.id === payload.id) {
          return payload
        }
        return o
      })
      state.contacts = sortContacts(state.contacts)
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter(o => o.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchPhoneBookAsync.pending, (state) => {
      state.status = 'loading'
      state.error = ''
    })
    .addCase(fetchPhoneBookAsync.fulfilled, (state, action) => {
      state.status = 'idle'
      state.error = ''
      const prevContacts = state.contacts ?? []
      const ids = new Set(prevContacts.map(o => o.id))
      const contacts: IContacts[] = [
        ...prevContacts,
        ...(action.payload ? action.payload.filter(o => !ids.has(o.id)) : [])
      ]
      state.contacts = sortContacts(contacts)
    })
    .addCase(fetchPhoneBookAsync.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.payload as string
    })
  }
})

// export const { addContact, editContact, deleteContact } = phonebookSlice.actions;
export const phonebookAction = phonebookSlice.actions

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//     (dispatch, getState) => {
//       const currentValue = selectCount(getState());
//       if (currentValue % 2 === 1) {
//         dispatch(incrementByAmount(amount));
//       }
//     };

export default phonebookSlice.reducer