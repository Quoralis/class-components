import { createSlice } from '@reduxjs/toolkit';
import type { Item } from '../hooks/useDataCharacters.ts';

interface initialState {
  cards: Item[];
}

const initialState: initialState = {
  cards: [],
};

const selectSlice = createSlice({
  name: 'selectSlice',
  initialState,
  reducers: {
    addCards: (state, action) => {
      state.cards.push(action.payload);
    },
    removeCards(state, action) {
      state.cards = state.cards.filter((item) => item.uid !== action.payload);
    },
    unSelectCards(state) {
      state.cards = [];
    },
  },
});
export default selectSlice;
export const { addCards, removeCards, unSelectCards } = selectSlice.actions;
