import { createSlice } from '@reduxjs/toolkit';

interface initialState {
  idCards: string[];
}

const initialState: initialState = {
  idCards: [],
};

const selectSlice = createSlice({
  name: 'selectSlice',
  initialState,
  reducers: {
    addCards: (state, action) => {
      state.idCards.push(action.payload);
    },
    removeCards(state, action) {
      state.idCards = state.idCards.filter(
        (itemId) => itemId !== action.payload
      );
      console.log(state.idCards);
    },
  },
});
export default selectSlice;
export const { addCards, removeCards } = selectSlice.actions;
