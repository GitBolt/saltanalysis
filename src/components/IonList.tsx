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
  className?: string;
}

const IonList: React.FC<IonListProps> = ({
  title,
  ions,
  selectedIon,
  onIonSelect,
  searchValue,
  onSearchChange,
  className,
}) => {
  return (
    <div className={`${styles.ionList} ${className || ''}`}>
      <h2>{title}</h2>
      <input
        type="text"
        placeholder={`Search by name or formula`}
        value={searchValue}
        onChange={onSearchChange}
        className={styles.searchInput}
      />
      {ions.map((ion) => (
        <button
          key={ion.formula}
          onClick={() => onIonSelect(ion)}
          className={`${styles.ionButton} ${selectedIon?.formula === ion.formula ? styles.selected : ''}`}
        >
          {ion.name} 
          <br />
          ({ion.formula})
        </button>
      ))} 

    </div>
  );
};

export default IonList;
