import { configureStore } from '@reduxjs/toolkit';
import selectSlice from './selectSlice';
import { characterApi } from './characterApi';

export const store = configureStore({
  reducer: {
    selector: selectSlice.reducer,
    [characterApi.reducerPath]: characterApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(characterApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
