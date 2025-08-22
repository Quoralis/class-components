import { configureStore } from '@reduxjs/toolkit';
import { addFormSlice } from './slices/addFormSlice.ts';
import { countriesSlice } from './slices/countriesSlice.ts';
import { addBase64ImageSlice } from './slices/Base64ImageSlice.ts';

export const store = configureStore({
  reducer: {
    addForm: addFormSlice.reducer,
    countries: countriesSlice.reducer,
    Base64Image: addBase64ImageSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
