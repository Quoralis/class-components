import styles from './Pagination.module.scss';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (currentPage: number) => void;
}

function Pagination(props: PaginationProps) {
  const actualTheme = useSelector((state: RootState) => state.theme.theme);

  return (
    <div key={'pagination'} className={styles['pagination']}>
      <button
        className={`${props.currentPage === 0 ? styles.disable : ''} ${actualTheme === 'dark' ? 'buttonDark' : ''}`}
        onClick={() => props.onPageChange(props.currentPage - 1)}
      >
        « Prev
      </button>
      <span>
        Page {props.currentPage + 1} of {props.totalPages}
      </span>
      <button
        className={`${props.currentPage === props.totalPages - 1 ? styles.disable : ''} ${actualTheme === 'dark' ? 'buttonDark' : ''}`}
        onClick={() => props.onPageChange(props.currentPage + 1)}
      >
        Next »
      </button>
    </div>
  );
}

export default Pagination;
