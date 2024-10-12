import React from 'react';
import styles from '../styles/Ions.module.css';

interface Ion {
  id: number;
  name: string;
  formula: string;
  charge: number;
}

interface IonListProps {
  title: string;
  ions: Ion[];
  onIonSelect: (ion: Ion) => void;
}

const IonList: React.FC<IonListProps> = ({ title, ions, onIonSelect }) => {
  const handleDragStart = (e: React.DragEvent, ion: Ion) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ ion, isAnion: title === 'Anions' }));
  };

  return (
    <div className={styles.ionListContainer}>
      <h2>{title}</h2>
      <div className={styles.ionList}>
        {ions.map(ion => (
          <div
            key={ion.id}
            className={styles.ionItem}
            draggable
            onDragStart={(e) => handleDragStart(e, ion)}
            onClick={() => onIonSelect(ion)}
          >
            <h3>{ion.name}</h3>
            <p>{ion.formula}</p>
            <p>Charge: {ion.charge}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IonList;
