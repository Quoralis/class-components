import { transformToCSV } from './transformToCSV.ts';

export function downloadCsv(array: object[], name: number) {
  const csvStr = transformToCSV(array); // получаем строку CSV
  const blob = new Blob([csvStr], { type: 'text/csv' }); // передаём массив строк!
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${name.toString()}_item(s).csv`;
  a.click();
  URL.revokeObjectURL(url);
}
