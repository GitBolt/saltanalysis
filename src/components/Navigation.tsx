import Link from 'next/link';
import styles from '@/styles/Navigation.module.css';
import mixpanel from 'mixpanel-browser';

const Navigation: React.FC = () => {
  const handleNavClick = (page: string) => {
    mixpanel.track('Navigation Clicked', {
      page,
    });
  };

  return (
    <>
      <nav className={styles.navigation}>
        <div className={styles.leftSection}>
          <Link href="/" className={styles.navItem} onClick={() => handleNavClick('Home')}>
            Home
          </Link>
          <Link href="/lab" className={styles.navItem} onClick={() => handleNavClick('Lab')}>
            Lab
          </Link>
        </div>
      </nav>
      <div className={styles.builtByContainer}>
        <span>
          Built by{' '}
          <a href="https://twitter.com/0xBolt" target="_blank" rel="noopener noreferrer" className={styles.boltLink}>
            Aabis
          </a>
        </span>
      </div>
    </>
  );
};

export default Navigation;