import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './themeSlice.ts';

const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
