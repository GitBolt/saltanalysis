import { useState } from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/Guide.module.css";
import Link from "next/link";
import { trackEvent } from "@/utils/mixpanel";

const QUESTIONS = [
  {
    q: "Colour of hydrated copper sulphate (CuSO₄·5H₂O)?",
    options: ["White", "Blue", "Green", "Yellow"],
    answer: 1,
  },
  {
    q: "Odour of ammonium chloride?",
    options: ["Odourless", "Vinegar-like", "Ammoniacal", "Rotten eggs"],
    answer: 2,
  },
  {
    q: "NH₄⁺ belongs to which group?",
    options: ["Group I", "Group III", "Group 0", "Group V"],
    answer: 2,
  },
  {
    q: "Confirmatory test for Cl⁻?",
    options: [
      "Brown ring",
      "Lime water milky",
      "Curdy white AgCl soluble in NH₄OH",
      "Canary yellow molybdate ppt",
    ],
    answer: 2,
  },
  {
    q: "Brown ring at the junction of two layers confirms?",
    options: ["Sulphate", "Nitrate", "Chloride", "Acetate"],
    answer: 1,
  },
  {
    q: "Cu²⁺ is precipitated in which group?",
    options: ["I", "II", "IV", "V"],
    answer: 1,
  },
  {
    q: "Blue lake test confirms?",
    options: ["Zn²⁺", "Al³⁺", "Mg²⁺", "Ba²⁺"],
    answer: 1,
  },
  {
    q: "Apple-green flame indicates?",
    options: ["Ca²⁺", "Sr²⁺", "Na⁺", "Ba²⁺"],
    answer: 3,
  },
  {
    q: "Lime water turning milky indicates?",
    options: ["H₂S", "CO₂ / carbonate", "Cl₂", "NH₃"],
    answer: 1,
  },
  {
    q: "White ppt of ZnS appears in?",
    options: ["Group II (acidic H₂S)", "Group III", "Group IV (alkaline H₂S)", "Group VI"],
    answer: 2,
  },
  {
    q: "Nessler’s reagent confirms?",
    options: ["Al³⁺", "NH₄⁺", "Mg²⁺", "Na⁺"],
    answer: 1,
  },
  {
    q: "Chromyl chloride test is for?",
    options: ["Bromide", "Iodide", "Chloride", "Nitrate"],
    answer: 2,
  },
  {
    q: "Golden spangles on cooling are?",
    options: ["PbCl₂", "PbI₂", "AgCl", "BaSO₄"],
    answer: 1,
  },
  {
    q: "Group V reagent is?",
    options: ["NH₄OH", "H₂S in acid", "(NH₄)₂CO₃", "Na₂HPO₄"],
    answer: 2,
  },
  {
    q: "Anhydrous copper sulphate is?",
    options: ["Blue", "Green", "White", "Black"],
    answer: 2,
  },
];

export default function QuizPage() {
  const [picked, setPicked] = useState<Array<number | null>>(
    QUESTIONS.map(() => null)
  );
  const [submitted, setSubmitted] = useState(false);

  const score = picked.reduce<number>((total, choice, index) => {
    if (choice === QUESTIONS[index].answer) return total + 1;
    return total;
  }, 0);

  return (
    <Layout
      title="Unknown Salt Quiz | Class 12 Salt Analysis"
      description="Class 12 salt analysis quiz: colour, groups, confirmatory tests. 15 questions for the practical."
      canonicalUrl="https://saltanalysis.com/quiz"
      keywords="salt analysis quiz, class 12 chemistry practical quiz, unknown salt"
      extraJsonLd={{
        "@context": "https://schema.org",
        "@type": "LearningResource",
        name: "Unknown salt quiz",
        educationalLevel: "CBSE Class 12",
        educationalUse: "practice",
        learningResourceType: "Quiz",
        isAccessibleForFree: true,
        inLanguage: "en-IN",
        url: "https://saltanalysis.com/quiz",
      }}
    >
      <div className={styles.page}>
        <h1>Unknown salt quiz</h1>
        <p className={styles.lead}>
          15 questions. Share this in class. Then open a{" "}
          <Link href="/how-to-do-salt-analysis">salt writeup</Link>.
        </p>
        <ol className={styles.quiz}>
          {QUESTIONS.map((item, index) => (
            <li key={item.q}>
              <p>
                <strong>{item.q}</strong>
              </p>
              <div className={styles.options}>
                {item.options.map((option, optionIndex) => {
                  const selected = picked[index] === optionIndex;
                  const correct = submitted && optionIndex === item.answer;
                  const wrong = submitted && selected && optionIndex !== item.answer;
                  return (
                    <label
                      key={option}
                      className={`${styles.option} ${correct ? styles.correct : ""} ${wrong ? styles.wrong : ""}`}
                    >
                      <input
                        type="radio"
                        name={`q-${index}`}
                        checked={selected}
                        onChange={() => {
                          const next = [...picked];
                          next[index] = optionIndex;
                          setPicked(next);
                          setSubmitted(false);
                        }}
                      />
                      {option}
                    </label>
                  );
                })}
              </div>
            </li>
          ))}
        </ol>
        <button
          type="button"
          className={styles.submit}
          onClick={() => {
            setSubmitted(true);
            trackEvent("Quiz Submitted", { score, total: QUESTIONS.length });
          }}
        >
          Check answers
        </button>
        {submitted && (
          <p className={styles.score}>
            Score: {score} / {QUESTIONS.length}
          </p>
        )}
      </div>
    </Layout>
  );
}
