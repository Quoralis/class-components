import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './themeSlice';
import selectSlice from './selectSlice';

const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    selector: selectSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
