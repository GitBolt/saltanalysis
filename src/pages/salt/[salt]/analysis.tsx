import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import styles from '@/styles/Analysis.module.css';
import { calculateSaltFormula } from '@/utils/formula';
import { urlToFormula, formulaToUrl } from '@/utils/encoders';
import { Ion, Test } from '@/types/ions';
import { useState } from 'react';
import Layout from '@/components/Layout';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { getAllSalts, getSaltById } from '@/data/salts';

const SaltAnalysisFlow = dynamic(() => import('@/components/SaltAnalysisFlow'), {
  ssr: false
});

interface AnalysisProps {
  anion: Ion;
  cation: Ion;
  salt: {
    id: string;
    name: string;
    formula: string;
    description: string;
  };
}

const Analysis: React.FC<AnalysisProps> = ({ anion, cation, salt }) => {
  const [isNotebookTheme, setIsNotebookTheme] = useState(false);
  const [showFlow, setShowFlow] = useState(false);

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

  const getPreliminaryTestResults = () => {
    // Combine properties from both anion and cation
    const odor = anion.odor || cation.odor || 'Unknown';
    const texture = anion.texture || cation.texture || 'Unknown';
    const color = anion.color || cation.color || 'Unknown';
    const solubility = anion.solubility || cation.solubility || 'Unknown';

    return { odor, texture, color, solubility };
  };

  const preliminaryResults = getPreliminaryTestResults();

  const getFlowUrl = () => {
    return `/salt/${formulaToUrl(cation.formula, anion.formula)}/flow`;
  };

  return (
    <Layout
      title={`${salt.name} Analysis - Salt Analysis Guide`}
      description={salt.description}
      canonicalUrl={`https://saltanalysis.com/salt/${salt.id}`}
      keywords={`${salt.name}, salt analysis, chemistry practical, qualitative analysis, ${salt.formula}, chemical reactions, lab experiments`}
      salt={{
        name: salt.name,
        formula: salt.formula,
        description: salt.description,
        cation: {
          name: cation.name,
          formula: cation.formula
        },
        anion: {
          name: anion.name,
          formula: anion.formula
        }
      }}
    >
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
        <h2 className={styles.saltName}>Analysis of {salt.name} ({salt.formula})</h2>
        
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Aim</h2>
          <p className={styles.blueText}>To determine the presence of anion and cation in the given salt</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Preliminary Test</h2>
          <ul className={styles.blueText}>
            <li>Odor: {preliminaryResults.odor}</li>
            <li>Texture: {preliminaryResults.texture}</li>
            <li>Color: {preliminaryResults.color}</li>
            <li>Solubility: {preliminaryResults.solubility}</li>
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
            The salt is {salt.formula}.
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

        {showFlow && (
          <div className={styles.flowWrapper}>
            <div className={styles.flowHeader}>
              <button 
                className={styles.flowButton}
                onClick={() => setShowFlow(false)}
              >
                Hide Flow Diagram
              </button>
              <Link 
                href={getFlowUrl()}
                className={styles.fullscreenButton}
              >
                <span>Fullscreen</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7"/>
                </svg>
              </Link>
            </div>
            <SaltAnalysisFlow anion={anion} cation={cation} />
          </div>
        )}

        {!showFlow && (
          <div className={styles.buttonContainer}>
            <button 
              className={styles.flowButton}
              onClick={() => setShowFlow(true)}
            >
              View Flow Diagram
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const salts = getAllSalts();
  const paths = salts.map(salt => ({
    params: { salt: salt.id }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const saltId = params?.salt as string;
  const salt = getSaltById(saltId);

  if (!salt) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      salt,
      anion: salt.anion,
      cation: salt.cation
    },
    revalidate: 3600 // Revalidate every hour
  };
};

export default Analysis;
