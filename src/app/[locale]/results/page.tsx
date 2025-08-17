import { getTranslations } from 'next-intl/server';
import styles from './page.module.scss';
export default async function Page() {
  const t = await getTranslations('Results');
  return (
    <div className={styles.text}>
      <p>{t('p')}</p>
    </div>
  );
}
