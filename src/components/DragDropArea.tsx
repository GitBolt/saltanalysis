import React from 'react';
import styles from '../styles/Combine.module.css';

interface Ion {
  id: number;
  name: string;
  formula: string;
  charge: number;
}

interface DragDropAreaProps {
  selectedCation: Ion | null;
  selectedAnion: Ion | null;
  onDrop: (droppedIon: Ion, isAnion: boolean) => void;
}

const DragDropArea: React.FC<DragDropAreaProps> = ({ selectedCation, selectedAnion, onDrop }) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const ionData = JSON.parse(e.dataTransfer.getData('text/plain'));
    onDrop(ionData.ion, ionData.isAnion);
  };

  return (
    <div
      className={styles.dropZone}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {selectedCation || selectedAnion ? (
        <div className={styles.selectedIons}>
          {selectedCation && <div className={styles.selectedIon}>{selectedCation.name}</div>}
          {selectedAnion && <div className={styles.selectedIon}>{selectedAnion.name}</div>}
        </div>
      ) : (
        <p>Drop ions here</p>
      )}
    </div>
  );
};

export default DragDropArea;
