import styles from "@/styles/SaltAnalysisFlow.module.css";
import { Ion, Test } from "@/types/ions";
import { calculateSaltFormula } from "@/utils/formula";

interface SaltAnalysisFlowProps {
  anion: Ion;
  cation: Ion;
}

const orderedTests = (ion: Ion): Test[] => [
  ...ion.tests.filter((test) => !test.confirmatory),
  ...ion.tests.filter((test) => test.confirmatory),
];

const TestCard = ({ test }: { test: Test }) => (
  <article
    className={`${styles.card} ${test.confirmatory ? styles.confirmatory : ""}`}
  >
    {test.confirmatory && <p className={styles.badge}>Confirmatory</p>}
    {test.name && <h4 className={styles.testName}>{test.name}</h4>}
    <p>
      <span>Experiment</span>
      {test.experiment}
    </p>
    <p>
      <span>Observation</span>
      {test.observation}
    </p>
    <p>
      <span>Inference</span>
      {test.inference}
    </p>
  </article>
);

const Column = ({
  label,
  ion,
}: {
  label: string;
  ion: Ion;
}) => {
  const tests = orderedTests(ion);

  return (
    <div className={styles.column}>
      <div className={styles.branch}>
        {label}: {ion.name} [{ion.formula}]
      </div>
      {tests.map((test, index) => (
        <div key={`${test.experiment}-${index}`}>
          <div className={styles.arrow} aria-hidden>
            ↓
          </div>
          <TestCard test={test} />
        </div>
      ))}
    </div>
  );
};

const SaltAnalysisFlow: React.FC<SaltAnalysisFlowProps> = ({
  anion,
  cation,
}) => {
  const formula = calculateSaltFormula(cation, anion);

  return (
    <div className={styles.chart}>
      <div className={styles.saltHead}>Analysis of {formula}</div>
      <div className={styles.arrow} aria-hidden>
        ↓
      </div>
      <div className={styles.columns}>
        <Column label="Cation" ion={cation} />
        <Column label="Anion" ion={anion} />
      </div>
    </div>
  );
};

export default SaltAnalysisFlow;
