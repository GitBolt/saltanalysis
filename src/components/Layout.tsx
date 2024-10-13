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
        <meta name="description" content="Get Practical Writeup for Analysis of any Salt" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1a1a2e" />
      </Head>
      <main className={styles.main}>{children}</main>
      <Navigation />
    </div>
  );
};

export default Layout;