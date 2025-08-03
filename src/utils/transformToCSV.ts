export function transformToCSV<T extends object>(array: T[]): string {
  if (array.length === 0) return '';
  const keys = Object.keys(array[0]);
  const header = keys.join(',');
  const rows = array.map((elem) =>
    keys.map((key) => elem[key as keyof T]).join(',')
  );
  return `${header}\n${rows.join('\n')}`;
}
