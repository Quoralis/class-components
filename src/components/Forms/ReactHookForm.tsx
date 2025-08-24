import InputField from '../Inputs/InputField.tsx';
import SelectField from '../Inputs/SelectField.tsx';
import CountyInputField from '../Inputs/CountyInputField.tsx';
import CheckboxField from '../Inputs/CheackBoxField.tsx';
import FileInputField from '../Inputs/FileInputField.tsx';
import ButtonAction from '../Buttons/ButtonAction.tsx';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { type DataForm, formScheme } from '../../schemes/formScheme.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import FormError from '../FormError/FormError.tsx';
import { submitUser } from '../../features/userForm.actions.ts';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store.ts';
import { fileToBase64 } from '../../utils/fileToBase64.ts';

interface Props {
  close: () => void;
}

export default function ReactHookForm({ close }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<DataForm>({
    resolver: zodResolver(formScheme),
    mode: 'onChange',
    defaultValues: {
      name: 'Max',
      age: 23,
      email: 'max@gmail.com',
      password: '!Qwer2',
      confirmPassword: '!Qwer2',
      gender: '',
      country: '',
      acceptTnC: true,
    },
  });
  const dispatch = useDispatch<AppDispatch>();

  const submit: SubmitHandler<DataForm> = async (data) => {
    let base64Image: string | undefined = undefined;

    const fileList = watch('file');
    const file = fileList?.[0]; // потому что file — это FileList

    if (file) {
      try {
        base64Image = await fileToBase64(file);
        if (base64Image) submitUser(data, { dispatch, close }, base64Image);
        close();
      } catch (err) {
        console.error('Base64 error:', err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} noValidate>
      <h2 className="mb-4 text-center text-primary fw-semibold">
        React Hook Form
      </h2>

      <InputField
        label="Username"
        id="username"
        autoComplete="username"
        register={register('name')}
      />

      <FormError rhfErrors={errors.name?.message} field={'name'} />

      <InputField
        label="Age"
        id="age"
        type="number"
        register={register('age', { valueAsNumber: true })}
      />

      <FormError rhfErrors={errors.age?.message} field={'age'} />

      <InputField
        label="Email"
        id="email"
        type="email"
        autoComplete="email"
        register={register('email')}
      />

      <FormError rhfErrors={errors.email?.message} field={'email'} />

      <InputField
        label="Password"
        id="password"
        type="password"
        autoComplete="new-password"
        register={register('password')}
      />

      <FormError rhfErrors={errors.password?.message} field={'password'} />

      <InputField
        label="Confirm password"
        id="confirmPassword"
        type="password"
        autoComplete="new-password"
        register={register('confirmPassword')}
      />

      <FormError
        rhfErrors={errors.confirmPassword?.message}
        field={'confirmPassword'}
      />

      <SelectField
        label="Gender"
        options={[
          { value: '', label: 'Select gender' },
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
        ]}
        register={register('gender')}
      />

      <FormError rhfErrors={errors.gender?.message} field={'gender'} />

      <CountyInputField
        label="Country"
        id="country"
        register={register('country')}
      />

      <FormError rhfErrors={errors.country?.message} field={'country'} />

      <CheckboxField
        label="I accept Terms and Conditions"
        id="acceptTnC"
        register={register('acceptTnC')}
      />

      <FormError rhfErrors={errors.acceptTnC?.message} field={'acceptTnC'} />

      <FileInputField
        label="Upload your picture"
        accept="image/png,image/jpeg"
        register={register('file')}
      />

      <FormError rhfErrors={errors.file?.message} field={'file'} />

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
