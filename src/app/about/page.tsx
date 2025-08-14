import styles from './about.module.scss';
import rsLogo from '../rss-logo.svg';
import { appDescription, features, author } from './aboutContent';
import { NavMenu } from '../../components';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <NavMenu />
      <div className={styles.card}>
        <h1 className={styles.title}>About the Application</h1>
        <p>{appDescription}</p>
        <p style={{ whiteSpace: 'pre-line' }}>{features}</p>
        <p>
          <strong>{author}</strong>
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
