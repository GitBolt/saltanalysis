import { useEffect } from 'react';
import Head from 'next/head';
import Navigation from '@/components/Navigation';
import styles from '@/styles/Home.module.css';
import Script from 'next/script';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <div className={styles.container}>
      <Head>
        <Script>
          {`
            mixpanel.init("ba825f5e38a7350fa16056217a546586", { debug: true, track_pageview: true, persistence: 'localStorage' });
          `}
        </Script>
        <title>Salt Analysis</title>
        <meta name="description" content="Get Practical Writeup for Analysis of any Salt" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1a1a2e" />
      </Head>
      <Navigation />
      <main>{children}</main>
    </div>
  );
};

export default Layout;