import styles from './AboutPage.module.scss';
import rsLogo from '../../assets/rss-logo.svg';
import { appDescription, features, author } from './aboutContent';

function AboutPage() {
  return (
    <div className={styles.card}>
      <h1 className={styles.title}>About the Application</h1>
      <p>{appDescription}</p>
      <p style={{ whiteSpace: 'pre-line' }}>{features}</p>
      <p>
        <strong>{author}</strong>
      </p>
      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noreferrer"
        className={styles.link}
      >
        <img src={rsLogo} alt="RS School Logo" className={styles.logo} />
        RS School React Course
      </a>
    </div>
  );
}

export default AboutPage;
