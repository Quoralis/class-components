'use client';

import styles from './SearchBar.module.scss';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import { useRouter, useSearchParams } from 'next/navigation';

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

  return (
    <div className={styles['search-bar']}>
      <form onSubmit={onSubmit}>
        <input
          name="search"
          type="search"
          defaultValue={search}
          // onKeyDown={(e) => {
          //   if (e.key === 'Enter') handleSearch();
          // }}
          className={'inputClass'}
          placeholder="Enter name character.."
          aria-label="Search character"
        />
        <button type="submit">Search</button>
        <ThemeSwitcher />
      </form>
    </div>
  );
}
