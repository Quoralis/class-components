'use client';
import styles from './Pagination.module.scss';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

function Pagination(props: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`${pathname}?${params.toString()}`);
  };
  const t = useTranslations();

  return (
    <div key={'pagination'} className={styles['pagination']}>
      <button
        className={`${props.currentPage === 1 ? styles.disable : ''}`}
        onClick={() => setPage(props.currentPage - 1)}
      >
        {t('Buttons.prev')}
      </button>
      <span>
        {t('Texts.page')} {props.currentPage} of {props.totalPages}
      </span>
      <button
        className={`${props.currentPage === props.totalPages ? styles.disable : ''} `}
        onClick={() => setPage(props.currentPage + 1)}
      >
        {t('Buttons.next')} »
      </button>
    </div>
  );
}

export default Pagination;
