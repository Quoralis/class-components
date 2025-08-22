import { configureStore } from '@reduxjs/toolkit';
import { addFormSlice } from './slices/addFormSlice.ts';
import { countriesSlice } from './slices/countriesSlice.ts';

export const store = configureStore({
  reducer: {
    addForm: addFormSlice.reducer,
    countries: countriesSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
