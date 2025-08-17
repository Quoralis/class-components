'use client';

import styles from './SearchBar.module.scss';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('search') ?? '';

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    const data = new FormData(e.currentTarget);
    const actualSearch = data.get('search')?.toString();

    params.set('search', actualSearch ?? '');
    router.push(`?${params}`);
  };
  const t = useTranslations();

  return (
    <div className={styles['search-bar']}>
      <form onSubmit={onSubmit}>
        <input
          name="search"
          type="search"
          defaultValue={search}
          className={'inputClass'}
          placeholder={t('Search.placeholder')}
          aria-label="Search character"
        />
        <button type="submit">{t('Buttons.search')}</button>
        <ThemeSwitcher />
      </form>
    </div>
  );
}
