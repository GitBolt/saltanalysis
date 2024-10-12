import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import SearchBar from '@/components/SearchBar';
import SaltList from '@/components/SaltList';

interface Salt {
  id: number;
  name: string;
  formula: string;
}

export default function Home() {
  const [salts, setSalts] = useState<Salt[]>([]);
  const [filteredSalts, setFilteredSalts] = useState<Salt[]>([]);

  useEffect(() => {
    fetch('/salts.json')
      .then(response => response.json())
      .then(data => {
        setSalts(data);
        setFilteredSalts(data);
      });
  }, []);

  const handleSearch = (query: string) => {
    const filtered = salts.filter(salt =>
      salt.name.toLowerCase().includes(query.toLowerCase()) ||
      salt.formula.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSalts(filtered);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Salt Analysis</title>
        <meta name="description" content="Interactive Salt Analysis Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Salt Analysis</h1>
        <SearchBar onSearch={handleSearch} />
        <SaltList salts={filteredSalts} />
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  );
}