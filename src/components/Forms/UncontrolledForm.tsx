import InputField from '../Input/InputField.tsx';
import SelectField from '../Select/SelectField.tsx';
import CheckboxField from '../CheckBox/CheackBoxField.tsx';
import FileInputField from '../FileInput/FileInputField.tsx';
import { useRef, useState } from 'react';
import { type DataForm, formSchema } from '../../schemes/formSchema.ts';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store.ts';
import { addForm } from '../../store/slices/addFormSlice.ts';
import { z } from 'zod';
import FormError, { type FormErrors } from '../FormError/FormError.tsx';

export default function UncontrolledForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [formErrors, setFormErrors] = useState<FormErrors>();
  const dataRef = useRef<HTMLFormElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = dataRef.current;
    if (!form) return;
    const formData = new FormData(form);
    const payload: DataForm = {
      name: String(formData.get('name')),
      age: Number(formData.get('age')),
      email: String(formData.get('email')),
      password: String(formData.get('password')),
      confirmPassword: String(formData.get('confirmPassword')),
      gender: String(formData.get('gender')),
      country: String(formData.get('country')),
      acceptTnC:
        formData.get('acceptTnC') === 'on' ? true : (undefined as never),
    };

    const result = formSchema.safeParse(payload);
    if (!result.success) {
      const formatedErrors = z.treeifyError(result.error);
      setFormErrors(formatedErrors);
    } else {
      dispatch(addForm(result.data));
    }
  };

  return (
    <form ref={dataRef} onSubmit={handleSubmit} autoComplete="on" noValidate>
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

      <InputField
        label="Country"
        name="country"
        id="country"
        type="text"
        autoComplete="country-name"
      />
      <FormError dataError={formErrors} field={'country'} />

      <CheckboxField
        label="I accept Terms and Conditions"
        name="acceptTnC"
        id="acceptTnC"
      />
      <FormError dataError={formErrors} field={'acceptTnC'} />

      <FileInputField
        name="picture"
        label="Upload your picture"
        accept="image/png,image/jpeg"
      />

      <button type="submit">Submit</button>
    </form>
  );
}
