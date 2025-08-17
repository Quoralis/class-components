// app/[locale]/about/page.tsx
import styles from './about.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import rsLogo from '../../../../public/rss-logo.svg';

export default async function AboutPage() {
  const t = await getTranslations('About');

  const featureKeys = [
    'search',
    'pagination',
    'masterDetail',
    'urlSync',
    'loading',
    'aboutPage',
  ] as const;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>{t('title')}</h1>

        <p>{t('desc')}</p>

        <h2 className={styles.subtitle}>{t('featuresTitle')}</h2>
        <ul className={styles.list}>
          {featureKeys.map((k) => (
            <li key={k}>{t(`features.${k}`)}</li>
          ))}
        </ul>

        <p>
          <strong>{t('authorLabel')}</strong> {t('author')}
        </p>

        <Link
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          <Image src={rsLogo} alt="RS School Logo" className={styles.logo} />
          RS School React Course
        </Link>
      </div>
    </div>
  );
}
