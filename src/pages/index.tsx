import Link from 'next/link';
import Layout from '@/components/Layout';
import styles from '@/styles/Home.module.css';
import { useState, useEffect } from 'react';
import { calculateSaltFormula } from '@/utils/formula';
import { formulaToUrl } from '@/utils/encoders';
import { getGradientColors } from '@/utils/gradients';
import mixpanel from 'mixpanel-browser';
import dynamic from 'next/dynamic';

const SaltAnalysisFlow = dynamic(() => import('@/components/SaltAnalysisFlow'), {
  ssr: false
});

type RandomSalt = {
  name: string;
  formula: string;
  url: string;
  cation: string;
  anion: string;
  fullCation: any; // for flow diagram
  fullAnion: any; // for flow diagram
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

    salts.push({ 
      name, 
      formula, 
      url, 
      cation: cation.formula, 
      anion: anion.formula,
      fullCation: cation,
      fullAnion: anion
    });
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

  const handleSaltClick = (salt: RandomSalt) => {
    mixpanel.track('Salt Clicked', {
      formula: salt.formula,
      name: salt.name,
    });
  };

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
        <div className={styles.leftSection}>
          <h1 className={styles.title}>Salts = Cation + Anion</h1>
          <p className={styles.subtitle}>Create any salt you want and view it's analysis</p>

          <div className={styles.buttonContainer}>
            <Link href="/lab" className={styles.createButton}>
              Create Salt
            </Link>
          </div>

          <h2 className={styles.sectionTitle}>Quick Analysis</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className={styles.error}>{error}</p>
          ) : (
            <div className={styles.saltGrid}>
              {randomSalts.map((salt, index) => (
                <Link
                  key={salt.formula} href={salt.url}
                  className={styles.saltCard}
                  onClick={() => handleSaltClick(salt)}
                >
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

        <div className={styles.rightSection}>
          {!isLoading && randomSalts.length > 0 && (
            <div className={styles.flowPreview}>
              <h2 className={styles.flowTitle}>Analysis Flow Preview</h2>
              <div className={styles.flowContainer}>
                <SaltAnalysisFlow 
                  anion={randomSalts[0].fullAnion} 
                  cation={randomSalts[0].fullCation} 
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
