import type { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

export type FormErrors = {
  errors: string[];
  properties?: {
    [key: string]: {
      errors: string[];
      properties?: FormErrors['properties'];
    };
  };
};

type FormErrorProps = {
  dataError?: FormErrors;
  field: string;
  rhfErrors?:
    | string
    | string[]
    | FieldError
    | Merge<FieldError, FieldErrorsImpl>;
};

export default function FormError({
  dataError,
  field,
  rhfErrors,
}: FormErrorProps) {
  let error: string[] = [];

  if (rhfErrors) {
    if (typeof rhfErrors === 'string') {
      error = [rhfErrors];
    } else if (Array.isArray(rhfErrors)) {
      error = rhfErrors;
    } else if (
      typeof rhfErrors === 'object' &&
      'message' in rhfErrors &&
      typeof rhfErrors.message === 'string'
    ) {
      error = [rhfErrors.message];
    }
  } else if (field && dataError?.properties?.[field]?.errors?.length) {
    error = dataError.properties[field].errors;
  }

  return (
    <div
      className="text-danger"
      style={{
        fontSize: '0.54rem',
        minHeight: '1.5rem',
        maxHeight: '2rem',
        overflowY: 'auto',
      }}
    >
      {error.map((err, i) => (
        <p key={i} className="mb-0">
          {err}
        </p>
      ))}
    </div>
  );
}
