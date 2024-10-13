import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import styles from '@/styles/Combine.module.css';
import Link from 'next/link';
import { calculateSaltFormula } from '@/utils/formula';
import { Ion } from '@/types/ions';
import { formulaToUrl } from '@/utils/encoders';
import IonList from '@/components/IonList';
import SaltResult from '@/components/SaltResult';
import mixpanel from 'mixpanel-browser';

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
        mixpanel.track('Salt Created', {
          cation: selectedCation.formula,
          anion: ion.formula,
          formula: saltFormula,
        });
      }
    } else {
      setSelectedCation(ion);
      if (selectedAnion) {
        const saltFormula = calculateSaltFormula(ion, selectedAnion);
        setSalt(saltFormula);
        mixpanel.track('Salt Created', {
          cation: ion.formula,
          anion: selectedAnion.formula,
          formula: saltFormula,
        });
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
      <div className={styles.labContainer}>
        <h1 className={styles.title}>Create Salt To View Analysis</h1>
        <p className={styles.subtitle}>Click on the anion and cation to create a salt</p>
        <div className={styles.ionListsContainer}>
          <IonList
            title="Cations"
            ions={filteredCations}
            selectedIon={selectedCation}
            onIonSelect={(ion) => handleCombine(ion, false)}
            searchValue={cationSearch}
            onSearchChange={(e) => setCationSearch(e.target.value)}
            className={styles.ionListColumn}
          />
          <div className={styles.centerColumn}>
            <SaltResult
              selectedCation={selectedCation}
              selectedAnion={selectedAnion}
              salt={salt}
            />
            {salt && (
              <div className={styles.buttonContainer}>
                <Link href={`/salt/${formulaToUrl(selectedCation?.formula || '', selectedAnion?.formula || '')}/analysis`} className={styles.viewAnalysisButton}>
                  View Analysis
                </Link>
              </div>
            )}
          </div>
          <IonList
            title="Anions"
            ions={filteredAnions}
            selectedIon={selectedAnion}
            onIonSelect={(ion) => handleCombine(ion, true)}
            searchValue={anionSearch}
            onSearchChange={(e) => setAnionSearch(e.target.value)}
            className={styles.ionListColumn}
          />
        </div>
      </div>
    </Layout>
  );
}
