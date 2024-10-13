import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import styles from '@/styles/Analysis.module.css';
import { calculateSaltFormula } from '@/utils/formula';
import { urlToFormula } from '@/utils/encoders';
import { Ion, Test } from '@/types/ions';
import { useState } from 'react';
import Layout from '@/components/Layout';


interface AnalysisProps {
  anion: Ion;
  cation: Ion;
}

const Analysis: React.FC<AnalysisProps> = ({ anion, cation }) => {
  const [isNotebookTheme, setIsNotebookTheme] = useState(false);

  const renderTests = (tests: Test[]) => {
    let isConfirmatoryHeaderRendered = false;

    return tests.map((test, index) => (
      <React.Fragment key={index}>
        {test.confirmatory && !isConfirmatoryHeaderRendered && (
          <tr>
            <td className={styles.confirmatoryTest} colSpan={3}>
              <span className={styles.underline}>Confirmatory Test{tests.filter(t => t.confirmatory).length > 1 ? 's' : ''}</span>
            </td>
          </tr>
        )}
        {test.confirmatory && (isConfirmatoryHeaderRendered = true)}
        <tr>
          <td>
            {test.confirmatory && test.name && (
              <>
                <b className={styles.blueUnderline}>{test.name}</b>
                <br />
              </>
            )}
            {test.experiment}
          </td>
          <td>{test.observation}</td>
          <td>{test.inference}</td>
        </tr>
      </React.Fragment>
    ));
  };

  return (
    <Layout>
    <div className={`${styles.notebook} ${isNotebookTheme ? styles.lightTheme : ''}`}>
      <div className={styles.themeToggle}>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={isNotebookTheme}
            onChange={() => setIsNotebookTheme(!isNotebookTheme)}
          />
          <span className={styles.slider}></span>
        </label>
        <span>Notebook Theme</span>
      </div>
      
      <h1 className={styles.experimentTitle}>Experiment No. N</h1>
      <h2 className={styles.saltName}>Analysis of {calculateSaltFormula(cation, anion)}</h2>
      
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Aim</h2>
        <p className={styles.blueText}>To determine the presence of anion and cation in the given salt</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Preliminary Test</h2>
        <ul className={styles.blueText}>
          <i style={{fontWeight: 800, opacity: 0.5, marginLeft: '-2rem'}}>In Progress</i>
          {/* <li>Odor: Odorless</li>
          <li>Texture: Crystalline</li>
          <li>Color: White</li>
          <li>Solubility: Soluble in water</li> */}
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
        <p className={styles.blueText}>
          The given salt contains {cation.formula} ions as cation and {anion.formula} ions as anion. 
          The salt is {calculateSaltFormula(cation, anion)}.
        </p>

      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Precautions</h2>
        <ol className={styles.blueText}>
          <li>Handle the chemicals with care.</li>
          <li>Don't use excess of chemicals.</li>
          <li>Keep the mouth of the test tube away from the face.</li>
        </ol>
      </div>
    </div>
    </Layout>
  );
};



export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const salt = params?.salt as string;
  const { cation: decodedCation, anion: decodedAnion } = urlToFormula(salt);

  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const host = req.headers.host || 'localhost:3000';
  const baseUrl = `${protocol}://${host}`;

  console.log(decodedCation, decodedAnion);
  const anionsResponse = await fetch(`${baseUrl}/anions.json`);
  const cationsResponse = await fetch(`${baseUrl}/cations.json`);

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
