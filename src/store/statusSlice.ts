import { createSlice } from '@reduxjs/toolkit';
import { characterApi } from './characterApi.ts';

interface StatusState {
  isLoading: boolean;
  isError: null | boolean;
}

const initialState: StatusState = { isLoading: false, isError: null };

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    clearStatus: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      characterApi.endpoints.getCharacters.matchPending,
      (state) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      characterApi.endpoints.getCharacters.matchFulfilled,
      (state) => {
        state.isLoading = false;
      }
    );
    builder.addMatcher(
      characterApi.endpoints.getCharacters.matchRejected,
      (state) => {
        state.isLoading = false;
        state.isError = true;
      }
    );
    builder.addMatcher(
      characterApi.endpoints.getCharacterById.matchPending,
      (state) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      characterApi.endpoints.getCharacterById.matchFulfilled,
      (state) => {
        state.isLoading = false;
      }
    );
    builder.addMatcher(
      characterApi.endpoints.getCharacterById.matchRejected,
      (state) => {
        state.isLoading = false;
        state.isError = true;
      }
    );
  },
});

export default statusSlice;
