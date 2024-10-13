import React from 'react';
import styles from '@/styles/Combine.module.css';
import { Ion } from '@/types/ions';

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
        <p className={styles.selectedIon}>Nothing Selected</p>
      )}
    </div>
  );
};

export default SaltResult;
