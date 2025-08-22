import InputField from '../Input/InputField.tsx';
import SelectField from '../Select/SelectField.tsx';
import CheckboxField from '../CheckBox/CheackBoxField.tsx';
import FileInputField from '../FileInput/FileInputField.tsx';
import { useRef, useState } from 'react';
import { formSchema } from '../../schemes/formSchema.ts';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store.ts';
import {
  addForm,
  setLastAddedByEmail,
} from '../../store/slices/addFormSlice.ts';
import { z } from 'zod';
import FormError, { type FormErrors } from '../FormError/FormError.tsx';
import ButtonAction from '../Buttons/ButtonAction.tsx';

interface Props {
  close: () => void;
}

export default function UncontrolledForm({ close }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [formErrors, setFormErrors] = useState<FormErrors>();
  const [isValid, setIsValid] = useState<boolean>(false);
  const dataRef = useRef<HTMLFormElement>(null);

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
    const result = formSchema.safeParse(payload);
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
      dispatch(addForm(result.data));
      dispatch(setLastAddedByEmail(result.data.email));
      close();
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
      <div style={{ minHeight: '1.5rem' }}>
        <FormError dataError={formErrors} field={'name'} />
      </div>

      <InputField label="Age" name="age" id="age" type="number" />
      <div style={{ minHeight: '1.5rem' }}>
        <FormError dataError={formErrors} field={'age'} />
      </div>

      <InputField
        label="Email"
        name="email"
        id="email"
        type="email"
        autoComplete="email"
      />
      <div style={{ minHeight: '1.5rem' }}>
        <FormError dataError={formErrors} field={'email'} />
      </div>

      <InputField
        label="Password"
        name="password"
        id="password"
        type="password"
        autoComplete="new-password"
      />
      <div style={{ minHeight: '1.5rem' }}>
        <FormError dataError={formErrors} field={'password'} />
      </div>

      <InputField
        label="Confirm password"
        name="confirmPassword"
        id="confirmPassword"
        type="password"
        autoComplete="new-password"
      />
      <div style={{ minHeight: '1.5rem' }}>
        <FormError dataError={formErrors} field={'confirmPassword'} />
      </div>

      <SelectField
        label="Gender"
        name="gender"
        options={[
          { value: '', label: 'Select gender' },
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
        ]}
      />
      <div style={{ minHeight: '1.5rem' }}>
        <FormError dataError={formErrors} field={'gender'} />
      </div>

      <InputField
        label="Country"
        name="country"
        id="country"
        type="text"
        autoComplete="country-name"
      />
      <div style={{ minHeight: '1.5rem' }}>
        <FormError dataError={formErrors} field={'country'} />
      </div>

      <CheckboxField
        label="I accept Terms and Conditions"
        name="acceptTnC"
        id="acceptTnC"
      />
      <div style={{ minHeight: '1.5rem' }}>
        <FormError dataError={formErrors} field={'acceptTnC'} />
      </div>

      <FileInputField
        name="file"
        label="Upload your picture"
        accept="image/png,image/jpeg"
      />
      <div style={{ minHeight: '1.5rem' }}>
        <FormError dataError={formErrors} field={'file'} />
      </div>

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
