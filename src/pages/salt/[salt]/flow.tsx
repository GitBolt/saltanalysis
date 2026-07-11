import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { formulaToUrl, urlToFormula } from '@/utils/encoders';
import { calculateSaltFormula } from '@/utils/formula';
import styles from '@/styles/Flow.module.css';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { trackEvent } from '@/utils/mixpanel';
import { getAllSalts } from '@/data/salts';

const SaltAnalysisFlow = dynamic(() => import('@/components/SaltAnalysisFlow'), {
  ssr: false
});

interface FlowProps {
  anion: any;
  cation: any;
}

const Flow: React.FC<FlowProps> = ({ anion, cation }) => {
  const router = useRouter();

  return (
    <Layout
      title={`${calculateSaltFormula(cation, anion)} Salt Analysis Flow | Salt Analysis`}
      description={`Interactive cation and anion test flow for ${cation.name} ${anion.name}.`}
      canonicalUrl={`https://saltanalysis.com/salt/${encodeURI(formulaToUrl(cation.formula, anion.formula))}/analysis`}
      robots="noindex, follow"
    >
      <button 
        className={styles.backButton}
        onClick={() => {
          trackEvent('Flow Diagram Closed', {
            cation: cation.formula,
            anion: anion.formula,
          });
          router.back();
        }}
      >
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
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back
      </button>
      <div className={styles.flowPage}>
        <div className={styles.flowContent}>
          <h1 className={styles.saltName}>
            {calculateSaltFormula(cation, anion)}
          </h1>
          <div className={styles.flowContainer}>
            <SaltAnalysisFlow anion={anion} cation={cation} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const salt = params?.salt as string;
  const { cation: decodedCation, anion: decodedAnion } = urlToFormula(salt);
  const matchedSalt = getAllSalts().find(({ id }) =>
    id === formulaToUrl(decodedCation, decodedAnion)
  );
  const anion = matchedSalt?.anion;
  const cation = matchedSalt?.cation;

  if (!anion || !cation) {
    return { notFound: true };
  }

  return { props: { anion, cation } };
};

export default Flow;
