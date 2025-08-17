import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function NotFound() {
  const t = await getTranslations('NotFound');

  return (
    <main style={{ padding: '2rem' }}>
      <h1>{t('title')}</h1>
      <p>{t('desc')}</p>
      <p>
        <Link href="/">{t('backHome')}</Link>
      </p>
    </main>
  );
}
