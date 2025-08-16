'use client';
import styles from './SelectionBar.module.scss';
import ClearSelectionButton from '../Buttons/ClearSelectionButton';
import DownloadCsvButton from '../Buttons/DownloadCsvButton';

export default function SelectionBar() {
  return (
    <div className={styles.results__wrapper}>
      <ClearSelectionButton />
      <span>Кол-во выделенных элементов</span>
      <DownloadCsvButton />
    </div>
  );
}
