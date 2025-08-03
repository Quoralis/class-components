export function transformToCSV(array: object[]) {
  const keys: string[] = [];
  const values: string[] = [];
  array.forEach((element) => {
    keys.push(...Object.keys(element));
    values.push(...Object.values(element));
  });
  const header = keys.join(',');
  const rows = values.join(',');
  return `${header}\n${rows}`;
}
