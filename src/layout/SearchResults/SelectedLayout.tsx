import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { unSelectCards } from '../../store/selectSlice';
import styles from '../../components/SelectionBar/SelectedLayout.module.scss';
import { transformToCSV } from '../../utils/transformToCSV';
import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';

function SelectedLayout() {
  const checkBox = useSelector((state: RootState) => state.selector.cards);
  const dispatch = useDispatch();
  const { theme: actualTheme } = useTheme();
  const [downloadUrl, setDownloadUrl] = useState<string>();
  if (checkBox.length === 0) return null;

  const downloadCsv = () => {
    const csvStr = transformToCSV(checkBox);
    const blob = new Blob([csvStr], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);
  };

  return (
    <div
      className={`${styles['selected-layout']} ${actualTheme === 'dark' ? styles['selected-layout-dark'] : ''}`}
    >
      <button
        className={`${styles['btn-action']} ${actualTheme === 'dark' ? 'buttonDark' : ''}`}
        onClick={() => dispatch(unSelectCards())}
      >
        Unselect
      </button>
      <span
        className={`${styles['selected-count']} ${actualTheme === 'dark' ? styles['selected-count-dark'] : ''}`}
      >
        {`${checkBox.length > 0 ? checkBox.length : ''} item(s) are selected`}{' '}
      </span>
      <a
        type="button"
        onClick={() => {
          downloadCsv();
        }}
        href={downloadUrl}
        download={`${checkBox.length.toString()}_item(s).csv`}
        className={`${styles['btn-action']} ${actualTheme === 'dark' ? 'buttonDark' : ''}`}
      >
        Download
      </a>
    </div>
  );
}

export default SelectedLayout;
