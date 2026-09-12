import React, { useLayoutEffect, useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import styles from "@/styles/Analysis.module.css";
import { formulaToUrl, normalizeSaltId } from "@/utils/encoders";
import { Ion, Test, SaltWriteup, VivaItem } from "@/types/ions";
import Layout from "@/components/Layout";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  getAllSalts,
  getRelatedSaltPages,
  getSaltById,
} from "@/data/salts";
import { getWriteup } from "@/data/writeups";
import { getSaltPrelims } from "@/utils/prelims";
import { trackEvent } from "@/utils/mixpanel";
import { CONTENT_UPDATED, getFeaturedSalt } from "@/data/featured";

const SaltAnalysisFlow = dynamic(() => import("@/components/SaltAnalysisFlow"), {
  ssr: false,
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
  writeup: SaltWriteup | null;
  related: Array<{
    id: string;
    name: string;
    formula: string;
  }>;
}

const renderTests = (tests: Test[]) => {
  let isConfirmatoryHeaderRendered = false;

  return tests.map((test, index) => (
    <React.Fragment key={`${test.name || test.experiment}-${index}`}>
      {test.confirmatory && !isConfirmatoryHeaderRendered && (
        <tr>
          <td className={styles.confirmatoryTest} colSpan={3}>
            <span className={styles.underline}>
              Confirmatory Test
              {tests.filter((item) => item.confirmatory).length > 1 ? "s" : ""}
            </span>
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

const TestTable = ({ tests }: { tests: Test[] }) => (
  <table className={styles.testTable}>
    <thead>
      <tr>
        <th>Experiment</th>
        <th>Observation</th>
        <th>Inference</th>
      </tr>
    </thead>
    <tbody>{renderTests(tests)}</tbody>
  </table>
);

const EquationList = ({ equations }: { equations: string[] }) => {
  if (!equations.length) return null;
  return (
    <ul className={styles.blueText}>
      {equations.map((equation) => (
        <li key={equation}>{equation}</li>
      ))}
    </ul>
  );
};

const Analysis: React.FC<AnalysisProps> = ({
  anion,
  cation,
  salt,
  writeup,
  related,
}) => {
  const [isNotebookTheme, setIsNotebookTheme] = useState(true);
  const [showFlow, setShowFlow] = useState(false);
  const prelims = getSaltPrelims(cation, anion);

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("notebook", isNotebookTheme);
    return () => {
      document.documentElement.classList.remove("notebook");
    };
  }, [isNotebookTheme]);

  const getFlowUrl = () =>
    `/salt/${formulaToUrl(cation.formula, anion.formula)}/flow`;

  const trackSaltAction = (event: string, properties = {}) => {
    trackEvent(event, {
      salt_name: salt.name,
      formula: salt.formula,
      cation: cation.formula,
      anion: anion.formula,
      ...properties,
    });
  };

  const faqs: VivaItem[] = writeup?.faqs ?? [
    {
      q: `What is the cation and anion in ${salt.name}?`,
      a: `${cation.formula} is the cation and ${anion.formula} is the anion. The salt is ${salt.formula}.`,
    },
    {
      q: `What colour is ${salt.formula}?`,
      a: prelims.color,
    },
    {
      q: `Does ${salt.formula} have an odour?`,
      a: prelims.odor,
    },
  ];

  const title = `${salt.name} (${salt.formula}) Salt Analysis | Class 12 CBSE Practical`;
  const featured = getFeaturedSalt(cation.formula, anion.formula);

  return (
    <Layout
      title={title}
      description={`Qualitative analysis of ${salt.name} (${salt.formula}). Preliminary tests, anion and cation tables, confirmatory tests, equations, viva.`}
      canonicalUrl={`https://saltanalysis.com/salt/${encodeURI(salt.id)}/analysis`}
      keywords={`${salt.name}, ${salt.formula}, salt analysis, class 12, CBSE practical, ISC, qualitative analysis, ${cation.name}, ${anion.name}${featured ? `, ${featured.aliases.join(", ")}` : ""}`}
      faqs={faqs}
      salt={{
        name: salt.name,
        formula: salt.formula,
        description: salt.description,
        cation: {
          name: cation.name,
          formula: cation.formula,
        },
        anion: {
          name: anion.name,
          formula: anion.formula,
        },
        aliases: featured?.aliases,
        modifiedTime: `${CONTENT_UPDATED}T00:00:00+05:30`,
        tags: [
          "salt analysis",
          "CBSE practical",
          salt.name,
          cation.name,
          anion.name,
        ],
      }}
    >
      <div
        className={`${styles.notebook} ${isNotebookTheme ? styles.lightTheme : ""}`}
      >
        <div className={`${styles.themeToggle} ${styles.noPrint}`}>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={isNotebookTheme}
              onChange={() => {
                const enabled = !isNotebookTheme;
                setIsNotebookTheme(enabled);
                trackSaltAction("Theme Changed", {
                  theme: enabled ? "notebook" : "dark",
                });
              }}
            />
            <span className={styles.slider}></span>
          </label>
          <span>Notebook Theme</span>
        </div>

        <h1 className={styles.experimentTitle}>
          Analysis of {salt.name} ({salt.formula})
        </h1>
        <p className={styles.saltName}>Qualitative analysis</p>
        <p className={`${styles.moreLinks} ${styles.noPrint}`}>
          <Link href="/how-to-do-salt-analysis">How to do salt analysis</Link>
          {" · "}
          <Link href="/viva">Viva</Link>
          {" · "}
          <Link href="/quiz">Quiz</Link>
        </p>

        <div className={`${styles.buttonContainer} ${styles.noPrint}`}>
          <button
            type="button"
            className={styles.printButton}
            onClick={() => {
              trackSaltAction("Print Clicked", { source: "analysis_page" });
              window.print();
            }}
          >
            Print / Save PDF
          </button>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Aim</h2>
          <p className={styles.blueText}>
            To analyse the given inorganic salt for one acidic and one basic
            radical.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Preliminary Test</h2>
          {writeup ? (
            <TestTable tests={writeup.prelims} />
          ) : (
            <ul className={styles.blueText}>
              <li>Colour: {prelims.color}</li>
              <li>Odour: {prelims.odor}</li>
              <li>State: {prelims.texture}</li>
              <li>Solubility: {prelims.solubility}</li>
            </ul>
          )}
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Test of Anion ({anion.formula})</h2>
          <TestTable tests={writeup?.anionTests ?? anion.tests} />
          {writeup && (
            <>
              <h3 className={styles.subHeading}>Ionic equations</h3>
              <EquationList equations={writeup.anionEquations} />
            </>
          )}
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Test of Cation ({cation.formula})</h2>
          <TestTable tests={writeup?.cationTests ?? cation.tests} />
          {writeup && (
            <>
              <h3 className={styles.subHeading}>Ionic equations</h3>
              <EquationList equations={writeup.cationEquations} />
            </>
          )}
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Result</h2>
          <p className={styles.blueText}>
            The given salt contains {cation.formula} as the cation (basic radical)
            and {anion.formula} as the anion (acidic radical). The salt is {salt.name}{" "}
            ({salt.formula}).
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Precautions</h2>
          <ol className={styles.blueText}>
            {(writeup?.precautions ?? [
              "Handle the chemicals with care.",
              "Don't use excess of chemicals.",
              "Keep the mouth of the test tube away from the face.",
            ]).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>

        {writeup && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Viva voce</h2>
            <ol className={styles.vivaList}>
              {writeup.viva.map((item) => (
                <li key={item.q}>
                  <p className={styles.vivaQ}>{item.q}</p>
                  <p className={styles.blueText}>{item.a}</p>
                </li>
              ))}
            </ol>
          </div>
        )}

        {related.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Related salts</h2>
            <ul className={styles.relatedList}>
              {related.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/salt/${item.id}/analysis`}
                    onClick={() =>
                      trackSaltAction("Salt Selected", {
                        source: "related_salts",
                        related_formula: item.formula,
                      })
                    }
                  >
                    {item.name} ({item.formula})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {writeup?.hindi && (
          <details className={styles.hindiBlock}>
            <summary>{writeup.hindi.title}</summary>
            {writeup.hindi.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </details>
        )}

        {showFlow && (
          <div className={`${styles.flowWrapper} ${styles.noPrint}`}>
            <div className={styles.flowHeader}>
              <button
                className={styles.flowButton}
                onClick={() => {
                  setShowFlow(false);
                  trackSaltAction("Flow Diagram Hidden", {
                    source: "analysis_page",
                  });
                }}
              >
                Hide Flow Diagram
              </button>
              <Link
                href={getFlowUrl()}
                className={styles.fullscreenButton}
                onClick={() =>
                  trackSaltAction("Flow Diagram Opened", {
                    source: "analysis_fullscreen",
                  })
                }
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
                  <path d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7" />
                </svg>
              </Link>
            </div>
            <SaltAnalysisFlow
              anion={anion}
              cation={cation}
              paper={isNotebookTheme}
            />
          </div>
        )}

        {!showFlow && (
          <div className={`${styles.buttonContainer} ${styles.noPrint}`}>
            <button
              className={styles.flowButton}
              onClick={() => {
                setShowFlow(true);
                trackSaltAction("Flow Diagram Opened", {
                  source: "analysis_inline",
                });
              }}
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
  const paths = salts.map((salt) => ({
    params: { salt: salt.id },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}) => {
  const saltId = params?.salt as string;
  const normalized = normalizeSaltId(saltId);

  if (saltId !== normalized) {
    return {
      redirect: {
        destination: `/salt/${encodeURI(normalized)}/analysis`,
        permanent: true,
      },
    };
  }

  const salt = getSaltById(normalized);

  if (!salt) {
    return {
      notFound: true,
    };
  }

  const writeup = getWriteup(salt.cation.formula, salt.anion.formula) ?? null;
  const related = getRelatedSaltPages(salt.cation, salt.anion).map((item) => ({
    id: item.id,
    name: item.name,
    formula: item.formula,
  }));

  return {
    props: {
      salt: {
        id: salt.id,
        name: salt.name,
        formula: salt.formula,
        description: salt.description,
      },
      anion: salt.anion,
      cation: salt.cation,
      writeup,
      related,
    },
    revalidate: 3600,
  };
};

export default Analysis;
