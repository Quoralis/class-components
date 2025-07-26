import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (currentPage: number) => void;
}

function Pagination(props: PaginationProps) {
  return (
    <div key={'pagination'} className={styles['pagination']}>
      <button onClick={() => props.onPageChange(props.currentPage - 1)}>
        « Prev
      </button>
      <span>
        Page {props.currentPage + 1} of {props.totalPages}
      </span>
      <button onClick={() => props.onPageChange(props.currentPage + 1)}>
        Next »
      </button>
    </div>
  );
}

export default Pagination;
