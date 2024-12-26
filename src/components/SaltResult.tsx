import React from 'react';
import styles from '@/styles/Combine.module.css';
import { Ion } from '@/types/ions';
import Link from 'next/link';
import { formulaToUrl } from '@/utils/encoders';

interface SaltResultProps {
  selectedCation: Ion | null;
  selectedAnion: Ion | null;
  salt: string | null;
}

const SaltResult: React.FC<SaltResultProps> = ({
  selectedCation,
  selectedAnion,
  salt,
}) => {
  const getFlowUrl = () => {
    if (!selectedCation || !selectedAnion) return '';
    return `/salt/${formulaToUrl(selectedCation.formula, selectedAnion.formula)}/flow`;
  };

  return (
    <div className={styles.resultArea}>
      {salt && (
        <div className={styles.saltResult}>
          <p className={styles.saltFormula} dangerouslySetInnerHTML={{ __html: salt }}></p>
        </div>
      )}
      {(selectedCation || selectedAnion) && (
        <div className={styles.selectedIons}>
          {selectedCation && (
            <span className={styles.selectedIon}>{selectedCation.name}</span>
          )}
          {selectedAnion && (
            <span className={styles.selectedIon}>{selectedAnion.name}</span>
          )}
        </div>
      )}
      {(!selectedCation && !selectedAnion) && (
        <>
          <div className={styles.selectedIons}>
            <span className={styles.selectedIon}>Nothing</span>
            <span className={styles.selectedIon}>Selected</span>
          </div>
        </>
      )}
      {salt && (
        <div className={styles.buttonContainer}>
          <Link 
            href={`/salt/${formulaToUrl(selectedCation?.formula || '', selectedAnion?.formula || '')}/analysis`} 
            className={styles.viewAnalysisButton}
          >
            View Analysis
          </Link>
          <Link 
            href={getFlowUrl()} 
            className={`${styles.viewAnalysisButton} ${styles.flowButton}`}
          >
            View Flow Diagram
          </Link>
        </div>
      )}
    </div>
  );
};

export default SaltResult;
