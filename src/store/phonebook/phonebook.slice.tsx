import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'store/store'
import { IContacts } from 'ts-types/Contacts.interface'
import { fetchPhoneBook } from './phonebook.api';

export interface IUserState {
  contacts: IContacts[]
  status: 'loading' | 'idle' | 'failed' | ''
}

const initialState: IUserState = {
  contacts: [],
  status: ''
}

export const fetchPhoneBookAsync = createAsyncThunk(
  'phonebook/fetch',
  async () => {
    const response = await fetchPhoneBook()
    return response.json()
  }
)

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
      state.status = 'loading';
    })
    .addCase(fetchPhoneBookAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.contacts += action.payload;
    })
    .addCase(fetchPhoneBookAsync.rejected, (state) => {
      state.status = 'failed';
    })
  }
})

// export const { addContact, editContact, deleteContact } = phonebookSlice.actions;
export const phonebookAction = phonebookSlice.actions;

export const selectContacts = (state: RootState) => state.phonebook.contacts;
export const selectLoading = (state: RootState) => state.phonebook.status;

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

export default phonebookSlice.reducer;