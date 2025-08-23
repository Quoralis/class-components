import SelectField from '../Select/SelectField.tsx';
import CheckboxField from '../Inputs/CheackBoxField.tsx';
import FileInputField from '../Inputs/FileInputField.tsx';
import { useRef, useState } from 'react';
import { formScheme } from '../../schemes/formScheme.ts';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store.ts';
import {
  addForm,
  setLastAddedByEmail,
} from '../../store/slices/addFormSlice.ts';
import { z } from 'zod';
import FormError, { type FormErrors } from '../FormError/FormError.tsx';
import ButtonAction from '../Buttons/ButtonAction.tsx';
import InputField from '../Inputs/InputField.tsx';
import CountyInputField from '../Inputs/CountyInputField.tsx';
import { fileToBase64 } from '../../utils/fileToBase64.ts';

interface Props {
  close: () => void;
}

export default function UncontrolledForm({ close }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [formErrors, setFormErrors] = useState<FormErrors>();
  const [isValid, setIsValid] = useState<boolean>(false);
  const dataRef = useRef<HTMLFormElement>(null);
  const [image, setImage] = useState<string>();

  const getPayload = () => {
    const form = dataRef.current;
    if (!form) return;
    const formData = new FormData(form);
    return {
      name: String(formData.get('name')),
      age: Number(formData.get('age')),
      email: String(formData.get('email')),
      password: String(formData.get('password')),
      confirmPassword: String(formData.get('confirmPassword')),
      gender: String(formData.get('gender')),
      country: String(formData.get('country')),
      acceptTnC:
        formData.get('acceptTnC') === 'on' ? true : (undefined as never),
      file: formData.get('file'),
    };
  };

  const initValidation = () => {
    const payload = getPayload();
    const result = formScheme.safeParse(payload);
    if (!result.success) {
      const formatedErrors = z.treeifyError(result.error);
      setIsValid(false);
      setFormErrors(formatedErrors);
    } else {
      setIsValid(true);
    }
    return result;
  };

  const onInputValidation = () => {
    initValidation();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = initValidation();
    if (result && result.success) {
      dispatch(addForm({ ...result.data, image }));
      dispatch(setLastAddedByEmail(result.data.email));
      close();
    }
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const result = await fileToBase64(e);
      setImage(result);
    } catch (err) {
      console.error('Error reading:', err);
    }
  };

  return (
    <form
      className="p-3 position-relative"
      ref={dataRef}
      onInput={onInputValidation}
      onSubmit={handleSubmit}
      autoComplete="on"
      noValidate
    >
      <h2 className="mb-4 text-center text-primary fw-semibold">
        Uncontrolled Form
      </h2>

      <InputField
        label="Username"
        name="name"
        id="username"
        type="text"
        autoComplete="username"
      />

      <FormError dataError={formErrors} field={'name'} />

      <InputField label="Age" name="age" id="age" type="number" />

      <FormError dataError={formErrors} field={'age'} />

      <InputField
        label="Email"
        name="email"
        id="email"
        type="email"
        autoComplete="email"
      />

      <FormError dataError={formErrors} field={'email'} />

      <InputField
        label="Password"
        name="password"
        id="password"
        type="password"
        autoComplete="new-password"
      />

      <FormError dataError={formErrors} field={'password'} />

      <InputField
        label="Confirm password"
        name="confirmPassword"
        id="confirmPassword"
        type="password"
        autoComplete="new-password"
      />

      <FormError dataError={formErrors} field={'confirmPassword'} />

      <SelectField
        label="Gender"
        name="gender"
        options={[
          { value: '', label: 'Select gender' },
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
        ]}
      />

      <FormError dataError={formErrors} field={'gender'} />

      <CountyInputField label="Country" name="country" id="country" />

      <FormError dataError={formErrors} field={'country'} />

      <CheckboxField
        label="I accept Terms and Conditions"
        name="acceptTnC"
        id="acceptTnC"
      />

      <FormError dataError={formErrors} field={'acceptTnC'} />

      <FileInputField
        name="file"
        label="Upload your picture"
        accept="image/png,image/jpeg"
        onChange={(e) => {
          handleFileChange(e);
        }}
      />

      <FormError dataError={formErrors} field={'file'} />

      <div className="d-flex justify-content-between mt-4">
        <ButtonAction
          className="btn-primary mt-3"
          type="submit"
          disabled={!isValid}
          name={'Submit'}
        />
        <ButtonAction
          onClick={close}
          className="btn-primary mt-3"
          type="button"
          disabled={false}
          name={'Cancel'}
        />
      </div>
    </form>
  );
}
