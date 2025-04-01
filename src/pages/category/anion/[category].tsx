import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { getSaltsByCategory, getAllCategories } from '@/data/salts';
import styles from '@/styles/Category.module.css';

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
      title={`${category} Salts - Salt Analysis Guide`}
      description={`Browse and analyze ${category} salts with detailed step-by-step practical writeups. Learn about cations, anions, and their reactions in chemistry experiments.`}
      canonicalUrl={`https://saltanalysis.com/category/anion/${category}`}
      keywords={`${category} salts, salt analysis, chemistry practical, qualitative analysis, anions, chemical reactions, lab experiments`}
    >
      <div className={styles.container}>
        <h1 className={styles.title}>{category} Salts</h1>
        <p className={styles.description}>
          Browse through our collection of {category} salts and their detailed analysis procedures.
          Each salt page includes step-by-step instructions, observations, and inferences.
        </p>

        <div className={styles.saltGrid}>
          {salts.map(salt => (
            <Link 
              key={salt.id} 
              href={`/salt/${salt.id}`}
              className={styles.saltCard}
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