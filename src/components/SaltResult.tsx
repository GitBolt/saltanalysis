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
      {(selectedCation || selectedAnion) && (
        <div className={styles.selectedIons}>
          {selectedCation && (
            <span className={styles.selectedCation}>{selectedCation.name}</span>
          )}
          {selectedAnion && (
            <span className={styles.selectedAnion}>{selectedAnion.name}</span>
          )}
        </div>
      )}
      {salt && (
        <div className={styles.saltResult}>
          <h2>Formed Salt:</h2>
          <p className={styles.saltFormula} dangerouslySetInnerHTML={{ __html: salt }}></p>
        </div>
      )}
    </div>
  );
};

export default SaltResult;