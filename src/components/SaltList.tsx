import styles from '../styles/Home.module.css';

interface Salt {
  id: number;
  name: string;
  formula: string;
}

interface SaltListProps {
  salts: Salt[];
}

const SaltList: React.FC<SaltListProps> = ({ salts }) => {
  return (
    <div className={styles.saltList}>
      {salts.map(salt => (
        <div key={salt.id} className={styles.saltItem}>
          <h3>{salt.name}</h3>
          <p>{salt.formula}</p>
        </div>
      ))}
    </div>
  );
};

export default SaltList;