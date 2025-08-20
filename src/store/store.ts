import { configureStore } from '@reduxjs/toolkit';
import { addFormSlice } from './slices/addFormSlice.ts';

export const store = configureStore({
  reducer: {
    addForm: addFormSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
