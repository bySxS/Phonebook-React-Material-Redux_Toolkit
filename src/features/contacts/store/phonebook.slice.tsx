import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'store/store'
import { IContacts } from 'features/contacts/ts/Contacts.interface'
import { fetchPhoneBookAsync } from './phonebook.thunks'

export interface IUserState {
  contacts: IContacts[]
  status: 'loading' | 'idle' | 'failed' | ''
}

const initialState: IUserState = {
  contacts: [],
  status: ''
}

export const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<IContacts>) => {
      state.contacts.push(action.payload)
    },
    editContact: (state, action: PayloadAction<IContacts>) => {
      const { payload } = action
      state.contacts = state.contacts.map(o => {
        if (o.id === payload.id) {
          return payload
        }
        return o
      })
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter(o => o.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchPhoneBookAsync.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(fetchPhoneBookAsync.fulfilled, (state, action) => {
      state.status = 'idle'
      const contacts: IContacts[] = action.payload
      state.contacts = contacts.sort((a, b) => {
      const nameA = a.name.first.toLowerCase()
      const nameB = b.name.first.toLowerCase()
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }
      return 0
      })
    })
    .addCase(fetchPhoneBookAsync.rejected, (state) => {
      state.status = 'failed'
    })
  }
})

// export const { addContact, editContact, deleteContact } = phonebookSlice.actions;
export const phonebookAction = phonebookSlice.actions

export const selectContacts = (state: RootState): IContacts[] => state.phonebook.contacts
export const selectLoading = (state: RootState): string => state.phonebook.status

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