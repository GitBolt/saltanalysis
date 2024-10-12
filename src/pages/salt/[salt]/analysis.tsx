import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import styles from '@/styles/Analysis.module.css';
import { calculateSaltFormula } from '@/utils/formula';
import { urlToFormula } from '@/utils/encoders';
import { Ion, Test } from '@/types/ions';


interface AnalysisProps {
  anion: Ion;
  cation: Ion;
}

const Analysis: React.FC<AnalysisProps> = ({ anion, cation }) => {
  const renderTests = (tests: Test[]) => {
    return tests.map((test, index) => (
      <React.Fragment key={index}>
        {test.confirmatory && (
          <tr>
            <td className={styles.confirmatoryTest}>
              <span className={styles.underline}>Confirmatory Test</span>
              {test.name && (
                <>
                  <br />
                  <span className={styles.blueUnderline}>{test.name}</span>
                </>
              )}
            </td>
            <td></td>
            <td></td>
          </tr>
        )}
        <tr>
          <td>{test.experiment}</td>
          <td>{test.observation}</td>
          <td>{test.inference}</td>
        </tr>
      </React.Fragment>
    ));
  };

  return (
    <div className={styles.notebook}>
      <h1 className={styles.experimentTitle}>Experiment No. 1</h1>
      <h2 className={styles.saltName}>Analysis of {calculateSaltFormula(cation, anion)}</h2>
      
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Aim</h2>
        <p className={styles.blueText}>To determine the presence of anion and cation in the given salt</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Preliminary Test</h2>
        <ul className={styles.blueText}>
          <li>Odor: Odorless</li>
          <li>Texture: Crystalline</li>
          <li>Color: White</li>
          <li>Solubility: Soluble in water</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Test of Anion</h2>
        <table className={styles.testTable}>
          <thead>
            <tr>
              <th>Experiment</th>
              <th>Observation</th>
              <th>Inference</th>
            </tr>
          </thead>
          <tbody>
            {renderTests(anion.tests)}
          </tbody>
        </table>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Test of Cation</h2>
        <table className={styles.testTable}>
          <thead>
            <tr>
              <th>Experiment</th>
              <th>Observation</th>
              <th>Inference</th>
            </tr>
          </thead>
          <tbody>
            {renderTests(cation.tests)}
          </tbody>
        </table>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Result</h2>
        <p className={styles.blueText}>The given salt is Sodium Sulphate (Na2SO4)</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Precautions</h2>
        <ol className={styles.blueText}>
          <li>Always wear safety goggles and gloves while handling chemicals.</li>
          <li>Perform the experiments in a well-ventilated area.</li>
          <li>Dispose of the chemicals properly as per laboratory guidelines.</li>
        </ol>
      </div>
    </div>
  );
};



export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const salt = params?.salt as string;
  const { cation: decodedCation, anion: decodedAnion } = urlToFormula(salt);

  console.log(decodedCation, decodedAnion);
  const anionsResponse = await fetch('http://localhost:3000/anions.json');
  const cationsResponse = await fetch('http://localhost:3000/cations.json');

  const anionsData: Ion[] = await anionsResponse.json();
  const cationsData: Ion[] = await cationsResponse.json();

  const anion = anionsData.find(a => a.formula === decodedAnion);
  const cation = cationsData.find(c => c.formula === decodedCation);

  console.log(anion, cation);
  if (!anion || !cation) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      anion,
      cation,
    },
  };
};


export default Analysis;
