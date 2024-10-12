import Head from 'next/head';
import Navigation from '@/components/Navigation';
import styles from '@/styles/Home.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Salt Analysis</title>
        <meta name="description" content="Interactive Salt Analysis Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>© 2023 Salt Analysis. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;