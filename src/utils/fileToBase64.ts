export function fileToBase64(
  e: React.ChangeEvent<HTMLInputElement>
): Promise<string> {
  return new Promise((resolve, reject) => {
    const file = e.target.files?.[0];
    if (!file) return reject(new Error('No file selected'));

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read file as string'));
      }
    };
    reader.onerror = reject;

    reader.readAsDataURL(file); // ⬅ запускаем чтение
  });
}
