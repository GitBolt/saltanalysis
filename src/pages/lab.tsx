import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import styles from '@/styles/Combine.module.css';
import Link from 'next/link';
import { calculateSaltFormula, removeCharge } from '@/utils/formula';
import { Ion } from '@/types/ions';
import { formulaToUrl } from '@/utils/encoders';
import IonList from '@/components/IonList';
import SaltResult from '@/components/SaltResult';

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
          <IonList
            title="Cations"
            ions={filteredCations}
            selectedIon={selectedCation}
            onIonSelect={(ion) => handleCombine(ion, false)}
            searchValue={cationSearch}
            onSearchChange={(e) => setCationSearch(e.target.value)}
          />
          <SaltResult
            selectedCation={selectedCation}
            selectedAnion={selectedAnion}
            salt={salt}
          />
          <IonList
            title="Anions"
            ions={filteredAnions}
            selectedIon={selectedAnion}
            onIonSelect={(ion) => handleCombine(ion, true)}
            searchValue={anionSearch}
            onSearchChange={(e) => setAnionSearch(e.target.value)}
          />
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
