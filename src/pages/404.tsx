import Link from "next/link";
import Layout from "@/components/Layout";
import styles from "@/styles/Guide.module.css";
import { getFeaturedSaltPages } from "@/data/salts";
import { GetStaticProps } from "next";

type SaltLink = {
  id: string;
  name: string;
  formula: string;
};

export default function NotFound({ salts }: { salts: SaltLink[] }) {
  return (
    <Layout
      title="Page not found | Salt Analysis"
      description="That page is missing. Open a salt analysis writeup instead."
      canonicalUrl="https://saltanalysis.com/"
      robots="noindex, follow"
    >
      <div className={styles.page}>
        <h1>Page not found</h1>
        <p className={styles.lead}>
          Try the <Link href="/how-to-do-salt-analysis">guide</Link>,{" "}
          <Link href="/viva">viva</Link>, or a common salt below.
        </p>
        <ul className={styles.saltList}>
          {salts.map((salt) => (
            <li key={salt.id}>
              <Link href={`/salt/${salt.id}/analysis`}>
                {salt.name} ({salt.formula})
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const salts = getFeaturedSaltPages().map((salt) => ({
    id: salt.id,
    name: salt.name,
    formula: salt.formula,
  }));
  return { props: { salts } };
};
