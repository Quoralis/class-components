import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('Main');
  return (
    <div className="welcomeMessage">
      <p>{t('welcome')}</p>
    </div>
  );
}
