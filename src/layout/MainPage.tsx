import styles from './mainPage.module.scss';
import UncontrolledForm from '../components/Forms/UncontrolledForm.tsx';

export default function MainPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <button>Open Uncontrolled Form</button>
        <button>React Hook Form</button>
      </div>

      {/* TEMP: render uncontrolled, will move to modal later */}
      <UncontrolledForm />
    </main>
  );
}
