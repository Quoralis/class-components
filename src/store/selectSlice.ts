import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Item } from '../hooks/useDataCharacters.ts';

interface InitialState {
  cards: Item[];
}

const initialState: InitialState = {
  cards: [],
};
type ItemUid = Item['uid'];

const selectSlice = createSlice({
  name: 'selectSlice',
  initialState,
  reducers: {
    addCards: (state, action: PayloadAction<Item>) => {
      state.cards.push(action.payload);
    },
    removeCards(state, action: PayloadAction<ItemUid>) {
      state.cards = state.cards.filter((item) => item.uid !== action.payload);
    },
    unSelectCards(state) {
      state.cards = [];
    },
  },
});
export default selectSlice;
export const { addCards, removeCards, unSelectCards } = selectSlice.actions;
