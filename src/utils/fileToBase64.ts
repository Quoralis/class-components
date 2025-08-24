export function fileToBase64(
  input: File | React.ChangeEvent<HTMLInputElement>
): Promise<string> {
  return new Promise((resolve, reject) => {
    let file: File | undefined;

    if (input instanceof File) {
      file = input;
    } else if ('target' in input && input.target.files?.[0]) {
      file = input.target.files[0];
    }

    if (!file) return reject(new Error('No file provided'));

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read file as string'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
