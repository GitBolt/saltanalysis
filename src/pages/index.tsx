import Link from 'next/link';
import Layout from '@/components/Layout';
import styles from '@/styles/Home.module.css';
import { useState, useEffect } from 'react';
import { calculateSaltFormula } from '@/utils/formula';
import { formulaToUrl } from '@/utils/encoders';
import { getGradientColors } from '@/utils/gradients';


type RandomSalt = {
  name: string;
  formula: string;
  url: string;
  cation: string;
  anion: string;
};

const getRandomSalts = async (count: number): Promise<RandomSalt[]> => {
  const cations = await fetch('/cations.json').then(res => res.json());
  const anions = await fetch('/anions.json').then(res => res.json());
  const salts = [];
  for (let i = 0; i < count; i++) {
    const cation = cations[Math.floor(Math.random() * cations.length)];
    const anion = anions[Math.floor(Math.random() * anions.length)];

    const formula = calculateSaltFormula(cation, anion);
    const urlencoding = formulaToUrl(cation.formula, anion.formula);
    const name = `${cation.name} ${anion.name}`;
    const url = `/salt/${urlencoding.toLowerCase()}/analysis`;

    salts.push({ name, formula, url, cation: cation.formula, anion: anion.formula });
  }

  return salts;
}

export default function Home() {

  const [randomSalts, setRandomSalts] = useState<RandomSalt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRandomSalts();
  }, []);

  const fetchRandomSalts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const salts = await getRandomSalts(4);
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
        <h1 className={styles.title}>Salts = Cation + Anion</h1>
        <p className={styles.subtitle}>Create any salt you want and view it's analysis</p>

        <div className={styles.buttonContainer}>
          <Link href="/lab" className={styles.createButton}>
            Create Salt
          </Link>
        </div>

        <h2 className={styles.sectionTitle}>Check Analysis</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <div className={styles.saltGrid}>
            {randomSalts.map((salt, index) => (
              <Link key={salt.formula} href={salt.url} className={styles.saltCard}>
                <div className={styles.saltBox} style={{ background: `linear-gradient(to bottom, ${getGradientColors()})` }}>
                  <span className={styles.cation}>{salt.cation}</span>
                  <span className={styles.anion}>{salt.anion}</span>
                </div>
                <p className={styles.formula}>{salt.formula}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
