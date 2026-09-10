import Link from "next/link";
import { GetStaticProps } from "next";
import Layout from "@/components/Layout";
import styles from "@/styles/Home.module.css";
import { getGradientByIndex } from "@/utils/gradients";
import { trackEvent } from "@/utils/mixpanel";
import dynamic from "next/dynamic";
import { getHomepageSalts, SaltSummary } from "@/data/salts";
import { Ion } from "@/types/ions";

const SaltAnalysisFlow = dynamic(() => import("@/components/SaltAnalysisFlow"), {
  ssr: false,
});

type HomeSalt = {
  name: string;
  formula: string;
  url: string;
  cation: string;
  anion: string;
  fullCation: Ion;
  fullAnion: Ion;
};

const toHomeSalt = (salt: SaltSummary): HomeSalt => ({
  name: salt.name,
  formula: salt.formula,
  url: `/salt/${salt.id}/analysis`,
  cation: salt.cation.formula,
  anion: salt.anion.formula,
  fullCation: salt.cation,
  fullAnion: salt.anion,
});

export default function Home({ salts }: { salts: HomeSalt[] }) {
  const preview = salts[0];

  const handleSaltClick = (salt: HomeSalt, position: number) => {
    trackEvent("Salt Selected", {
      formula: salt.formula,
      salt_name: salt.name,
      cation: salt.cation,
      anion: salt.anion,
      source: "home_quick_analysis",
      position,
    });
  };

  const homepageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "CBSE Class 12 Salt Analysis",
    description:
      "Free CBSE and ISC Class 12 salt analysis writeups with observation tables, confirmatory tests, equations, viva and flowcharts.",
    url: "https://saltanalysis.com",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: salts.map((salt, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "ChemicalSubstance",
          name: salt.name,
          url: `https://saltanalysis.com${salt.url}`,
          molecularFormula: salt.formula,
        },
      })),
    },
  };

  return (
    <Layout
      title="CBSE Class 12 Salt Analysis — writeups for every salt"
      description="Free CBSE and ISC Class 12 qualitative salt analysis writeups. Observation tables, confirmatory tests, equations, viva and print-ready flowcharts for ammonium chloride, alum, copper sulphate and more."
      canonicalUrl="https://saltanalysis.com/"
      keywords="salt analysis, class 12, CBSE practical, ISC, qualitative analysis, ammonium chloride, aluminium sulphate, lead nitrate, copper sulphate"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd) }}
      />
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <h1 className={styles.title}>CBSE Class 12 Salt Analysis</h1>
          <p className={styles.subtitle}>
            Writeups for every salt — CBSE, ISC and other boards. Observation
            tables, confirmatory tests and a flowchart you can print.
          </p>

          <div className={styles.buttonContainer}>
            <Link
              href="/lab"
              className={styles.createButton}
              onClick={() => trackEvent("Lab Opened", { source: "home_primary_action" })}
            >
              Create Salt
            </Link>
          </div>
          <p className={styles.secondaryLinks}>
            <Link href="/how-to-do-salt-analysis">How to do salt analysis</Link>
            {" · "}
            <Link href="/viva">Viva questions</Link>
            {" · "}
            <Link href="/quiz">Unknown-salt quiz</Link>
          </p>

          <h2 className={styles.sectionTitle}>Common salts</h2>
          <div className={styles.saltGrid} role="list">
            {salts.map((salt, index) => (
              <Link
                key={salt.formula}
                href={salt.url}
                className={styles.saltCard}
                onClick={() => handleSaltClick(salt, index + 1)}
                aria-label={`View analysis for ${salt.name} (${salt.formula})`}
              >
                <div
                  className={styles.saltBox}
                  style={{
                    background: `linear-gradient(to bottom, ${getGradientByIndex(index)})`,
                  }}
                  role="img"
                  aria-label={`Chemical formula: ${salt.cation} + ${salt.anion}`}
                >
                  <span className={styles.cation}>{salt.cation}</span>
                  <span className={styles.anion}>{salt.anion}</span>
                </div>
                <p className={styles.formula}>{salt.formula}</p>
                <p className={styles.saltLabel}>{salt.name}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.rightSection}>
          {preview && (
            <div className={styles.flowPreview}>
              <h2 className={styles.flowTitle}>
                {preview.name} flowchart
              </h2>
              <div className={styles.flowContainer}>
                <SaltAnalysisFlow
                  anion={preview.fullAnion}
                  cation={preview.fullCation}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const salts = getHomepageSalts().map(toHomeSalt);
  return {
    props: { salts },
    revalidate: 3600,
  };
};
