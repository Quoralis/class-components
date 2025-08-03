import { configureStore } from '@reduxjs/toolkit';
import selectSlice from './selectSlice';

const store = configureStore({
  reducer: {
    selector: selectSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
