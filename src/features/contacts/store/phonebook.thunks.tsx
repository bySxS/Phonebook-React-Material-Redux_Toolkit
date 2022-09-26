import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchPhoneBook } from './phonebook.api'

export const fetchPhoneBookAsync = createAsyncThunk(
  'phonebook/fetch',
  async () => {
    const response = await fetchPhoneBook()
    return response.json()
  }
)