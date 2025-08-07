import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CharacterDataResponse } from './types/types.ts';
interface InitialState {
  cards: CharacterDataResponse[];
}

const initialState: InitialState = {
  cards: [],
};
type ItemUid = CharacterDataResponse['uid'];

const selectSlice = createSlice({
  name: 'selectSlice',
  initialState,
  reducers: {
    addCards: (state, action: PayloadAction<CharacterDataResponse>) => {
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
