import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { urlToFormula } from '@/utils/encoders';
import { calculateSaltFormula } from '@/utils/formula';
import styles from '@/styles/Flow.module.css';
import Layout from '@/components/Layout';

const SaltAnalysisFlow = dynamic(() => import('@/components/SaltAnalysisFlow'), {
  ssr: false
});

interface FlowProps {
  anion: any;
  cation: any;
}

const Flow: React.FC<FlowProps> = ({ anion, cation }) => {
  return (
    <Layout>
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

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const salt = params?.salt as string;
  const { cation: decodedCation, anion: decodedAnion } = urlToFormula(salt);

  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const host = req.headers.host || 'localhost:3000';
  const baseUrl = `${protocol}://${host}`;

  const anionsResponse = await fetch(`${baseUrl}/anions.json`);
  const cationsResponse = await fetch(`${baseUrl}/cations.json`);

  const anionsData = await anionsResponse.json();
  const cationsData = await cationsResponse.json();

  const anion = anionsData.find((a: any) => a.formula === decodedAnion);
  const cation = cationsData.find((c: any) => c.formula === decodedCation);

  if (!anion || !cation) {
    return { notFound: true };
  }

  return { props: { anion, cation } };
};

export default Flow; 