'use client';
import styles from './SelectionBar.module.scss';
import ClearSelectionButton from '../Buttons/ClearSelectionButton';
import DownloadCsvButton from '../Buttons/DownloadCsvButton';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store.ts';

export default function SelectionBar() {
  const selectedCards = useSelector((state: RootState) => state.selector.cards);

  return (
    <div
      className={
        selectedCards.length > 0
          ? `${styles.results__wrapper}`
          : `${styles.display_none}`
      }
    >
      <ClearSelectionButton />
      <span className={styles.selected_count}>
        {`${selectedCards.length > 0 ? selectedCards.length : ''} item(s) are selected`}{' '}
      </span>
      <DownloadCsvButton />
    </div>
  );
}
