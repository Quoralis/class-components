import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { unSelectCards } from '../../store/selectSlice';
import styles from './SelectedLayout.module.scss';
import { downloadCsv } from '../../utils/downloadCsv';

function SelectedLayout() {
  const checkBox = useSelector((state: RootState) => state.selector.cards);
  const dispatch = useDispatch();
  const actualTheme = useSelector((state: RootState) => state.theme.theme);
  if (checkBox.length === 0) return null;
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

      <button
        onClick={() => downloadCsv(checkBox, checkBox.length)}
        className={`${styles['btn-action']} ${actualTheme === 'dark' ? 'buttonDark' : ''}`}
      >
        Download
      </button>
    </div>
  );
}

export default SelectedLayout;
