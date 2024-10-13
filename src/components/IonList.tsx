import React from 'react';
import styles from '@/styles/Combine.module.css';
import { Ion } from '@/types/ions';
import { removeCharge } from '@/utils/formula';

interface IonListProps {
  title: string;
  ions: Ion[];
  selectedIon: Ion | null;
  onIonSelect: (ion: Ion) => void;
  searchValue: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const IonList: React.FC<IonListProps> = ({
  title,
  ions,
  selectedIon,
  onIonSelect,
  searchValue,
  onSearchChange,
}) => {
  return (
    <div className={styles.ionList}>
      <h2>{title}</h2>
      <input
        type="text"
        placeholder={`Search ${title.toLowerCase()}...`}
        value={searchValue}
        onChange={onSearchChange}
        className={styles.searchInput}
      />
      <div className={styles.ionGrid}>
        {ions.map((ion) => (
          <button
            key={ion.id}
            onClick={() => onIonSelect(ion)}
            className={`${styles.ionButton} ${selectedIon?.id === ion.id ? styles.selected : ''}`}
          >
            {removeCharge(ion.formula)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default IonList;