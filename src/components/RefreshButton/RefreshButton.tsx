import styles from './Refresh.module.scss';
import { useDispatch } from 'react-redux';
import { characterApi } from '../../store/characterApi.ts';

export function RefreshButton() {
  const dispatch = useDispatch();
  const refresh = () => {
    dispatch(characterApi.util.invalidateTags([{ type: 'Characters' }]));
  };

  return (
    <button
      className={styles.refreshButton}
      onClick={() => {
        refresh();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0114.13-3.36L23 10M1 14l5.36 5.36A9 9 0 0020.49 15" />
      </svg>
    </button>
  );
}
