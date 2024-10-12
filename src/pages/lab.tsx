import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import styles from '@/styles/Combine.module.css';
import Link from 'next/link';
import { calculateSaltFormula, removeCharge } from '@/utils/formula';
import { Ion } from '@/types/ions';
import { formulaToUrl } from '@/utils/encoders';

export default function Combine() {
  const [anions, setAnions] = useState<Ion[]>([]);
  const [cations, setCations] = useState<Ion[]>([]);
  const [selectedAnion, setSelectedAnion] = useState<Ion | null>(null);
  const [selectedCation, setSelectedCation] = useState<Ion | null>(null);
  const [salt, setSalt] = useState<string | null>(null);
  const [anionSearch, setAnionSearch] = useState('');
  const [cationSearch, setCationSearch] = useState('');

  useEffect(() => {
    fetch('/anions.json')
      .then(response => response.json())
      .then(data => setAnions(data));
    fetch('/cations.json')
      .then(response => response.json())
      .then(data => setCations(data));
  }, []);

  const handleCombine = (ion: Ion, isAnion: boolean) => {
    if (isAnion) {
      setSelectedAnion(ion);
      if (selectedCation) {
        const saltFormula = calculateSaltFormula(selectedCation, ion);

        setSalt(saltFormula);
      }
    } else {
      setSelectedCation(ion);
      if (selectedAnion) {
        const saltFormula = calculateSaltFormula(ion, selectedAnion);
        setSalt(saltFormula);
      }
    }
  };

  const filteredAnions = anions.filter(ion => 
    ion.name.toLowerCase().includes(anionSearch.toLowerCase()) ||
    ion.formula.toLowerCase().includes(anionSearch.toLowerCase())
  );

  const filteredCations = cations.filter(ion => 
    ion.name.toLowerCase().includes(cationSearch.toLowerCase()) ||
    ion.formula.toLowerCase().includes(cationSearch.toLowerCase())
  );

  return (
    <Layout>
      <div className={styles.combineContainer}>
        <h1 className={styles.title}>Combine Ions</h1>
        <div className={styles.ionListsContainer}>
          <div className={styles.ionList}>
            <input
              type="text"
              placeholder="Search cations..."
              value={cationSearch}
              onChange={(e) => setCationSearch(e.target.value)}
              className={styles.searchInput}
            />
            <ul>
              {filteredCations.map((ion) => (
                <li key={ion.id} onClick={() => handleCombine(ion, false)} className={styles.ionButton}>
                  {ion.formula}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.resultArea}>
            {salt && (
              <div className={styles.saltResult}>
                <h2>Formed Salt:</h2>
                <p className={styles.saltFormula} dangerouslySetInnerHTML={{ __html: salt }}></p>
              </div>
            )}
          </div>
          <div className={styles.ionList}>
            <input
              type="text"
              placeholder="Search anions..."
              value={anionSearch}
              
              onChange={(e) => setAnionSearch(e.target.value)}
              className={styles.searchInput}
            />
            <ul>
              {filteredAnions.map((ion) => (
                <li key={ion.id} onClick={() => handleCombine(ion, true)} className={styles.ionButton}>
                  {removeCharge(ion.formula)}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {salt && (
          <Link href={`/salt/${formulaToUrl(selectedCation?.formula || '', selectedAnion?.formula || '')}/analysis`} className={styles.viewAnalysisButton}>
            View Analysis
          </Link>
        )}
      </div>
    </Layout>
  );
}
