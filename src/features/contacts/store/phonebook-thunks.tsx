import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchPhoneBook } from './phonebook-api'

export const fetchPhoneBookAsync = createAsyncThunk(
  'phonebook/fetch',
  async (arg, { rejectWithValue }) => {
    try {
      return await fetchPhoneBook()
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)