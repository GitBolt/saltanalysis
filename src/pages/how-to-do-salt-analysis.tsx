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
  ["VI", "Mg²⁺", "Na₂HPO₄ after I–V are absent. Scratch the tube."],
];

const ANIONS = [
  ["Dilute H₂SO₄", "CO₃²⁻, S²⁻, SO₃²⁻, NO₂⁻, CH₃COO⁻", "CO₂ (lime water), H₂S (rotten eggs), SO₂, NO₂, vinegar."],
  ["Conc. H₂SO₄", "Cl⁻, Br⁻, I⁻, NO₃⁻, C₂O₄²⁻", "HCl fumes, Br₂ brown, I₂ violet, NO₂, CO + CO₂."],
  ["Independent", "SO₄²⁻, PO₄³⁻", "BaCl₂ (acid-insoluble ppt); ammonium molybdate (canary yellow)."],
];

export default function HowTo({ salts }: { salts: SaltLink[] }) {
  return (
    <Layout
      title="How to Do Salt Analysis | Class 12 CBSE, ISC Practical"
      description="CBSE and ISC Class 12 qualitative analysis scheme: Groups 0–VI, anion tests, and print-ready writeups for the salts schools actually assign."
      canonicalUrl="https://saltanalysis.com/how-to-do-salt-analysis"
      keywords="how to do salt analysis, salt analysis class 12, CBSE practical, ISC, qualitative analysis groups, viva"
    >
      <div className={styles.page}>
        <h1>How to do salt analysis</h1>
        <p className={styles.lead}>
          CBSE, ISC and other state boards. Identify one anion (acidic radical)
          and one cation (basic radical). Write Experiment / Observation / Inference
          tables. Print from any salt page.
        </p>

        <h2 id="common-salts">Common salts</h2>
        <p>
          These 18 cover school files, Google queries and the salts students
          actually open. Start here; do not invent 200 extra thin pages.
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
          Need questions for the examiner? See the{" "}
          <Link href="/viva">viva page</Link> or the{" "}
          <Link href="/quiz">10-question unknown-salt quiz</Link>.
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
