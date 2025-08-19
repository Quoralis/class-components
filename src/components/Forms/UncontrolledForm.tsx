import InputField from '../Input/InputField.tsx';
import SelectField from '../Select/SelectField.tsx';
import CheckboxField from '../CheckBox/CheackBoxField.tsx';
import FileInputField from '../FileInput/FileInputField.tsx';

export default function UncontrolledForm() {
  return (
    <form autoComplete="on" noValidate>
      <InputField
        label="Username"
        name="username"
        id="username"
        type="text"
        autoComplete="username"
      />

      <InputField label="Age" name="age" id="age" type="number" />

      <InputField
        label="Email"
        name="email"
        id="email"
        type="email"
        autoComplete="email"
      />

      <InputField
        label="Password"
        name="password"
        id="password"
        type="password"
        autoComplete="new-password"
      />

      <InputField
        label="Confirm password"
        name="confirmPassword"
        id="confirmPassword"
        type="password"
        autoComplete="new-password"
      />

      <SelectField
        label="Gender"
        name="gender"
        options={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Other' },
        ]}
      />

      <InputField
        label="Country"
        name="country"
        id="country"
        type="text"
        autoComplete="country-name"
      />

      <CheckboxField
        label="I accept Terms and Conditions"
        name="acceptTnC"
        id="acceptTnC"
      />

      <FileInputField
        name="picture"
        label="Upload your picture"
        accept="image/png,image/jpeg"
      />
    </form>
  );
}
