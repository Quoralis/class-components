import { createSlice } from '@reduxjs/toolkit';
import { popularCountries } from '../constants/popularCountries.ts';

type initStateCountries = {
  list: string[];
};

const initialState: initStateCountries = {
  list: popularCountries,
};

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});
