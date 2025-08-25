import { render, screen, fireEvent } from '@testing-library/react';
import FileInputField from './FileInputField';
import { describe, expect, test } from 'vitest';

describe('FileInputField', () => {
  test('renders file input with label', () => {
    render(
      <FileInputField label="Upload file" id="upload" accept=".png,.jpg" />
    );
    expect(screen.getByLabelText(/Upload file/i)).toBeInTheDocument();
  });

  test('accepts file upload', () => {
    render(<FileInputField label="Upload file" id="upload" />);
    const input = screen.getByLabelText(/Upload file/i) as HTMLInputElement;

    const file = new File(['dummy'], 'example.png', { type: 'image/png' });
    fireEvent.change(input, { target: { files: [file] } });

    expect(input.files?.[0]).toBe(file);
    expect(input.files).toHaveLength(1);
  });
});
