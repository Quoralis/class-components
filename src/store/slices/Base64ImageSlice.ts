import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  base64Image: '',
};

export const addBase64ImageSlice = createSlice({
  name: 'addBase64ImageSlice',
  initialState,
  reducers: {
    addBase64: (state, action: PayloadAction<string>) => {
      state.base64Image = action.payload;
    },
  },
});

export const { addBase64 } = addBase64ImageSlice.actions;
