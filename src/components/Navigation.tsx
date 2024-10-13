import Link from 'next/link';
import styles from '@/styles/Navigation.module.css';

const Navigation: React.FC = () => {
  return (
    <nav className={styles.navigation}>
      <div className={styles.leftSection}>
        <Link href="/" className={styles.navItem}>Home</Link>
        <Link href="/lab" className={styles.navItem}>Lab</Link>
      </div>
      <div className={styles.separator}></div>
      <div className={styles.rightSection}>
        Built by <a href="https://twitter.com/0xBolt" target="_blank" rel="noopener noreferrer" className={styles.boltLink}>Aabis</a>
      </div>
    </nav>
  );
};

export default Navigation;
