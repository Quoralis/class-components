export function transformToCSV(array: Record<string, string>[]) {
  if (array.length === 0) return '';
  const keys = Object.keys(array[0]);
  const header = keys.join(',');
  const rows = array.map((elem) => keys.map((key) => elem[key]).join(','));
  return `${header}\n${rows.join('\n')}`;
}
