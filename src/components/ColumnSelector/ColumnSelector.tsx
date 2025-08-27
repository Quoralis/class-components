import CheckboxField from '../Inputs/CheckBox';
import { CHECKBOX_FIELDS } from '../../constants/co2Fields.ts';
import * as React from 'react';

interface Props {
  close: (e: React.MouseEvent) => void;
}

export default function ColumnSelector({ close }: Props) {
  const handleSubmit = (e: React.MouseEvent) => {
    // временно
    e.preventDefault();
    console.log('click submit');
  };

  return (
    <form>
      {CHECKBOX_FIELDS.map((field) => (
        <CheckboxField
          fieldName={field.fieldKey}
          label={field.label}
          key={field.fieldKey}
        />
      ))}
      <button
        type="submit"
        onClick={handleSubmit}
        className="btn btn-dark text-warning border-warning me-2"
      >
        Submit
      </button>
      <button type="button" onClick={close} className="btn btn-outline-warning">
        Cancel
      </button>
    </form>
  );
}
