import { addForm, setLastAddedByEmail } from '../store/slices/addFormSlice';
import type { AppDispatch } from '../store/store';
import type { DataForm } from '../schemes/formScheme';

type SubmitDeps = {
  dispatch: AppDispatch;
  close: () => void;
};

export function submitUser(values: DataForm, deps: SubmitDeps, image: string) {
  const { dispatch, close } = deps;

  dispatch(addForm({ ...values, image }));
  dispatch(setLastAddedByEmail(values.email));
  close();
}
