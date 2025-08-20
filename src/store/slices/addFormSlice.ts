import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { DataForm } from '../../schemes/formSchema.ts';

interface FormState {
  dataUser: DataForm[];
}

const initialState: FormState = {
  dataUser: [],
};

export const addFormSlice = createSlice({
  name: 'addForm',
  initialState,
  reducers: {
    addForm: (state, action: PayloadAction<DataForm>) => {
      state.dataUser.push(action.payload);
    },
  },
});

export const { addForm } = addFormSlice.actions;
