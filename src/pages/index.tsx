import Link from 'next/link';
import Layout from '@/components/Layout';
import styles from '@/styles/Home.module.css';
import { useState, useEffect } from 'react';
import { calculateSaltFormula } from '@/utils/formula';
import { Ion } from '@/types/ions';
import { formulaToUrl } from '@/utils/encoders';


async function getRandomSalts(count: number): Promise<{ name: string; formula: string; url: string }[]> {
  const cations = await fetch('/cations.json').then(res => res.json());
  const anions = await fetch('/anions.json').then(res => res.json());
  console.log(cations, anions);
  const salts = [];
  for (let i = 0; i < count; i++) {
    const cation = cations[Math.floor(Math.random() * cations.length)];
    const anion = anions[Math.floor(Math.random() * anions.length)];

    const formula = calculateSaltFormula(cation, anion);
    const urlencoding = formulaToUrl(cation.formula, anion.formula);
    const name = `${cation.name} ${anion.name}`;
    const url = `/salt/${urlencoding.toLowerCase()}/analysis`;

    salts.push({ name, formula, url });
  }

  return salts;
}


export default function Home() {
  const [randomSalts, setRandomSalts] = useState<Array<{ name: string; formula: string; url: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRandomSalts();
  }, []);

  const fetchRandomSalts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const salts = await getRandomSalts(5);
      setRandomSalts(salts);
    } catch (err) {
      console.error('Error fetching random salts:', err);
      setError('Failed to fetch random salts. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Salt Analyzer</h1>

        <Link href="/lab" className={styles.createButton}>
          Create Your Salt
        </Link>

        <h2 className={styles.subtitle}>Explore Random Salts:</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <div className={styles.saltGrid}>
            {randomSalts.map((salt) => (
              <Link key={salt.formula} href={salt.url} className={styles.saltCard}>
                <h3>{salt.name}</h3>
                <p>{salt.formula}</p>
              </Link>
            ))}
          </div>
        )}

        <button onClick={fetchRandomSalts} className={styles.refreshButton}>
          Refresh Salts
        </button>
      </div>
    </Layout>
  );
}
