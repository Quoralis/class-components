import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { DataForm } from '../../schemes/formScheme.ts';

interface FormState {
  dataUser: DataForm[];
  lastAddedEmail: string | null;
}

const initialState: FormState = {
  dataUser: [],
  lastAddedEmail: null,
};

export const addFormSlice = createSlice({
  name: 'addForm',
  initialState,
  reducers: {
    addForm: (state, action: PayloadAction<DataForm>) => {
      state.dataUser.push(action.payload);
      state.lastAddedEmail = action.payload.email;
    },
    setLastAddedByEmail: (state, action: PayloadAction<string>) => {
      state.lastAddedEmail = action.payload;
    },
  },
});

export const { addForm, setLastAddedByEmail } = addFormSlice.actions;
