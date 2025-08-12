import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  search: string;
}

const initialState: SearchState = {
  search: localStorage.getItem('search') ?? '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
});
export default searchSlice;
export const { setSearchTerm } = searchSlice.actions;
