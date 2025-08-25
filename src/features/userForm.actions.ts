import { addForm, setLastAddedByEmail } from '../store/slices/addFormSlice';
import type { AppDispatch } from '../store/store';
import type { DataForm } from '../schemes/formScheme';

type SubmitDeps = {
  dispatch: AppDispatch;
  close: () => void;
};

export function submitUser(values: DataForm, deps: SubmitDeps, image: string) {
  const { dispatch, close } = deps;
  const payload = { ...values, file: null, image }; //   удаляем файл из объекта, чтобы не  попадал в  redux
  dispatch(addForm(payload));
  dispatch(setLastAddedByEmail(values.email));
  close();
}
