import Link from "next/link";
import Layout from "@/components/Layout";
import styles from "@/styles/Guide.module.css";
import { getFeaturedSaltPages } from "@/data/salts";
import { GetStaticProps } from "next";
import { trackEvent } from "@/utils/mixpanel";

type SaltLink = {
  id: string;
  name: string;
  formula: string;
};

const GROUPS = [
  ["0", "NH₄⁺", "NaOH, heat; Nessler’s reagent. Always first. Then stop if positive."],
  ["I", "Pb²⁺ (also Ag⁺, Hg₂²⁺ in older lists)", "Dilute HCl. White ppt; PbCl₂ soluble in hot water."],
  ["II", "Cu²⁺, As³⁺, …", "H₂S in dilute HCl. CuS is black."],
  ["III", "Al³⁺, Fe³⁺", "NH₄Cl + NH₄OH. White gelatinous Al(OH)₃ or reddish-brown Fe(OH)₃."],
  ["IV", "Zn²⁺, Ni²⁺, Co²⁺, Mn²⁺", "H₂S in ammoniacal medium. ZnS is white."],
  ["V", "Ba²⁺, Sr²⁺, Ca²⁺", "(NH₄)₂CO₃. Then flame + chromate / sulphate / oxalate."],
  ["VI", "Mg²⁺", "Na₂HPO₄ after I-V are absent. Scratch the tube."],
];

const ANIONS = [
  ["Dilute H₂SO₄", "CO₃²⁻, S²⁻, SO₃²⁻, NO₂⁻, CH₃COO⁻", "CO₂ (lime water), H₂S (rotten eggs), SO₂, NO₂, vinegar."],
  ["Conc. H₂SO₄", "Cl⁻, Br⁻, I⁻, NO₃⁻, C₂O₄²⁻", "HCl fumes, Br₂ brown, I₂ violet, NO₂, CO + CO₂."],
  ["Independent", "SO₄²⁻, PO₄³⁻", "BaCl₂ (acid-insoluble ppt); ammonium molybdate (canary yellow)."],
];

const GUIDE_FAQS = [
  {
    q: "What is salt analysis in Class 12?",
    a: "You identify the anion and the cation in an unknown inorganic salt with systematic tests, then write Experiment, Observation, Inference.",
  },
  {
    q: "Which cation is tested first?",
    a: "Group 0, ammonium. Heat with NaOH and confirm with Nessler’s reagent. If NH₄⁺ is present, stop further cation groups.",
  },
  {
    q: "Do you test the anion or the cation first?",
    a: "Both. Dilute then conc. H₂SO₄ on the original salt for anions, and Group 0 on the original salt. Then make original solution for Groups I to VI.",
  },
  {
    q: "Is this for CBSE or ISC?",
    a: "The same qualitative analysis scheme is used in CBSE, ISC, and most state boards.",
  },
];

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to do Class 12 salt analysis",
  description:
    "Find the anion and the cation, then write Experiment, Observation, Inference for the practical file.",
  inLanguage: "en-IN",
  isAccessibleForFree: true,
  step: [
    {
      "@type": "HowToStep",
      name: "Physical examination",
      text: "Note colour, odour, state, and solubility.",
    },
    {
      "@type": "HowToStep",
      name: "Dry tests",
      text: "Dry heating and flame test.",
    },
    {
      "@type": "HowToStep",
      name: "Anion tests",
      text: "Dilute H₂SO₄, then conc. H₂SO₄, then confirmatory tests such as AgNO₃, BaCl₂, brown ring, and lime water.",
    },
    {
      "@type": "HowToStep",
      name: "Group 0",
      text: "Test NH₄⁺ on the original salt. If positive, stop cations.",
    },
    {
      "@type": "HowToStep",
      name: "Cation groups",
      text: "Make original solution, then Groups I to VI until one cation is confirmed.",
    },
    {
      "@type": "HowToStep",
      name: "Write the file",
      text: "Result, precautions, and viva.",
    },
  ],
};

export default function HowTo({ salts }: { salts: SaltLink[] }) {
  return (
    <Layout
      title="How to Do Salt Analysis | Class 12 CBSE Practical"
      description="Class 12 qualitative analysis: Groups 0-VI, anion tests, and writeups for the common salts."
      canonicalUrl="https://saltanalysis.com/how-to-do-salt-analysis"
      keywords="how to do salt analysis, salt analysis class 12, CBSE practical, ISC, qualitative analysis groups, viva"
      faqs={GUIDE_FAQS}
      extraJsonLd={howToJsonLd}
    >
      <div className={styles.page}>
        <h1>How to do salt analysis</h1>
        <p className={styles.lead}>
          Find the anion and the cation. Write Experiment, Observation, Inference.
          Print the page for your file. Works for CBSE, ISC, and other boards.
        </p>

        <h2 id="common-salts">Common salts</h2>
        <p>
          The salts that usually come in the practical. Open one and copy the table.
        </p>
        <ul className={styles.saltList}>
          {salts.map((salt) => (
            <li key={salt.id}>
              <Link
                href={`/salt/${salt.id}/analysis`}
                onClick={() =>
                  trackEvent("Salt Selected", {
                    source: "guide_common_salts",
                    formula: salt.formula,
                    salt_name: salt.name,
                  })
                }
              >
                {salt.name} ({salt.formula})
              </Link>
            </li>
          ))}
        </ul>

        <h2>Cation groups</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Group</th>
              <th>Ions</th>
              <th>Reagent / note</th>
            </tr>
          </thead>
          <tbody>
            {GROUPS.map(([group, ions, note]) => (
              <tr key={group}>
                <td>{group}</td>
                <td>{ions}</td>
                <td>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Anion tests</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Step</th>
              <th>Ions</th>
              <th>What you see</th>
            </tr>
          </thead>
          <tbody>
            {ANIONS.map(([step, ions, note]) => (
              <tr key={step}>
                <td>{step}</td>
                <td>{ions}</td>
                <td>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Order in the practical file</h2>
        <ol>
          <li>Physical examination: colour, odour, state, solubility.</li>
          <li>Dry heating and flame test.</li>
          <li>Dilute H₂SO₄, then conc. H₂SO₄.</li>
          <li>Anion confirmatory (AgNO₃, BaCl₂, brown ring, lime water, …).</li>
          <li>Group 0 (NH₄⁺) on the original salt. If positive, stop cations.</li>
          <li>Original solution, then Groups I → VI until one cation is confirmed.</li>
          <li>Result, precautions, viva.</li>
        </ol>
        <p>
          Viva: <Link href="/viva">40 questions</Link>. Quick practice:{" "}
          <Link href="/quiz">15-question quiz</Link>.
        </p>
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
