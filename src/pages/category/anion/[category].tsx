import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { getSaltsByCategory, getAllCategories } from '@/data/salts';
import styles from '@/styles/Category.module.css';
import { trackEvent } from '@/utils/mixpanel';

interface CategoryPageProps {
  category: string;
  salts: Array<{
    id: string;
    name: string;
    formula: string;
    description: string;
  }>;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category, salts }) => {
  return (
    <Layout
      title={`${category} Anion Salts | Class 12 Salt Analysis`}
      description={`${category} anions in Class 12 qualitative analysis. Open a salt for the observation table, confirmatory tests, and equations.`}
      canonicalUrl={`https://saltanalysis.com/category/anion/${encodeURIComponent(category)}`}
      keywords={`${category} salts, salt analysis, chemistry practical, qualitative analysis, anions, chemical reactions, lab experiments`}
    >
      <div className={styles.container}>
        <h1 className={styles.title}>{category} Salts</h1>
        <p className={styles.description}>
          {category} salts. Open a salt for the observation table.
        </p>

        <div className={styles.saltGrid}>
          {salts.map(salt => (
            <Link 
              key={salt.id} 
              href={`/salt/${salt.id}/analysis`}
              className={styles.saltCard}
              onClick={() => trackEvent('Salt Selected', {
                salt_name: salt.name,
                formula: salt.formula,
                source: 'anion_category',
                category,
              })}
            >
              <h2 className={styles.saltName}>{salt.name}</h2>
              <p className={styles.saltFormula}>{salt.formula}</p>
              <p className={styles.saltDescription}>{salt.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { anions } = getAllCategories();
  const paths = anions.map(category => ({
    params: { category }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = params?.category as string;
  const salts = getSaltsByCategory(category, 'anion');

  if (!salts.length) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      category,
      salts: salts.map(salt => ({
        id: salt.id,
        name: salt.name,
        formula: salt.formula,
        description: salt.description
      }))
    },
    revalidate: 3600 // Revalidate every hour
  };
};

export default CategoryPage;
