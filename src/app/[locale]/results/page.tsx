import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('Results');
  return (
    <div>
      <p>{t('p')}</p>
    </div>
  );
}
