import Layout from "@/components/Layout";
import styles from "@/styles/Guide.module.css";
import Link from "next/link";

const VIVA: Array<{ q: string; a: string }> = [
  { q: "What is qualitative salt analysis?", a: "Identification of the acidic radical (anion) and basic radical (cation) in an inorganic salt using systematic tests." },
  { q: "Why is ammonium tested first (Group 0)?", a: "NH₄⁺ would interfere later because NH₄OH is a group reagent. NaOH + Nessler confirms it; then stop." },
  { q: "Why is Nessler’s reagent used?", a: "It gives a brown ppt of basic mercury(II) amidoiodide with ammonia, confirming NH₄⁺." },
  { q: "Why add AgNO₃ after acidifying with HNO₃?", a: "HNO₃ prevents phosphates, carbonates and oxalates of silver from precipitating. Only AgCl, AgBr, AgI ppt." },
  { q: "Why is AgCl soluble in NH₄OH?", a: "It forms the diamminesilver(I) complex [Ag(NH₃)₂]⁺. AgI does not." },
  { q: "What is the chromyl chloride test?", a: "Salt + K₂Cr₂O₇ + conc. H₂SO₄ → CrO₂Cl₂ vapours, which with lead acetate give yellow PbCrO₄. Confirms chloride." },
  { q: "Why does lime water turn milky with CO₂?", a: "Ca(OH)₂ + CO₂ → CaCO₃ (white ppt). Excess CO₂ gives soluble Ca(HCO₃)₂ and the milkiness goes." },
  { q: "How do you distinguish CO₂ from SO₂?", a: "SO₂ smells of burning sulphur and decolourises acidified KMnO₄ / K₂Cr₂O₇. CO₂ does not." },
  { q: "What is the brown ring test?", a: "FeSO₄ + nitrate + conc. H₂SO₄ forms [Fe(H₂O)₅NO]SO₄ at the junction of two layers." },
  { q: "Why must FeSO₄ be freshly prepared?", a: "Fe²⁺ oxidises to Fe³⁺ on standing and the ring fails." },
  { q: "How is nitrate distinguished from nitrite?", a: "Nitrite gives brown fumes / a ring with dilute acid; nitrate needs conc. H₂SO₄ for the brown ring." },
  { q: "Why is BaSO₄ insoluble in conc. HCl?", a: "It is a very insoluble sulphate. BaSO₃ dissolves in acid with evolution of SO₂." },
  { q: "Why acidify before adding BaCl₂?", a: "To destroy carbonate and sulphite which would also give a white barium ppt." },
  { q: "Why NH₄Cl before NH₄OH in Group III?", a: "Common-ion effect lowers [OH⁻] so Mg(OH)₂ does not ppt; only Al(OH)₃ / Fe(OH)₃ do." },
  { q: "What is the blue lake test?", a: "Al(OH)₃ adsorbs blue litmus and floats as a blue lake, confirming Al³⁺." },
  { q: "Why is Al(OH)₃ soluble in excess NaOH?", a: "It is amphoteric and forms [Al(OH)₄]⁻. Fe(OH)₃ is not amphoteric in this way." },
  { q: "Why is H₂S passed in acid for Group II?", a: "[S²⁻] is low in acid, enough to ppt CuS (very low Ksp) but not ZnS." },
  { q: "Why is H₂S passed in alkali for Group IV?", a: "[S²⁻] is higher, enough to ppt ZnS, MnS, NiS, CoS." },
  { q: "Why is CuS black and ZnS white?", a: "Different sulphides; colour is a quick group hint. Cu is Group II, Zn is Group IV." },
  { q: "Why deep blue with excess NH₄OH for copper?", a: "Tetraamminecopper(II), [Cu(NH₃)₄]²⁺." },
  { q: "Why chocolate-brown ppt with K₄[Fe(CN)₆]?", a: "Copper ferrocyanide. Zinc ferrocyanide is bluish-white." },
  { q: "Why is hydrated CuSO₄ blue?", a: "[Cu(H₂O)₆]²⁺. Anhydrous CuSO₄ is white." },
  { q: "Why does PbCl₂ dissolve in hot water?", a: "Its solubility increases sharply with temperature; AgCl does not. Used to separate lead in Group I." },
  { q: "What are golden spangles?", a: "Shining yellow crystals of PbI₂ that appear on cooling." },
  { q: "Why does lead nitrate give brown fumes on heating?", a: "2Pb(NO₃)₂ → 2PbO + 4NO₂ + O₂. The residue is yellow PbO." },
  { q: "Flame colour of Ba, Sr, Ca, Cu, Na?", a: "Ba apple-green, Sr crimson, Ca brick-red, Cu bluish-green, Na persistent yellow." },
  { q: "Why is the flame wire moistened with conc. HCl?", a: "Chlorides are more volatile in the flame and traces of previous salts are removed." },
  { q: "Why Group V after I–IV are absent?", a: "(NH₄)₂CO₃ would also ppt carbonates of earlier groups if they were still in solution." },
  { q: "How is Ba distinguished from Sr and Ca?", a: "Apple-green flame; yellow BaCrO₄ in acetic acid. Sr crimson + SrSO₄; Ca brick-red + oxalate." },
  { q: "Why is Mg not precipitated in Group V?", a: "Ammonium salts keep MgCO₃ in solution. Mg is Group VI with Na₂HPO₄." },
  { q: "Why scratch the test tube for magnesium?", a: "MgNH₄PO₄ crystallises slowly; scratching starts precipitation." },
  { q: "Why does oxalate decolourise KMnO₄?", a: "Oxalate reduces MnO₄⁻ to Mn²⁺ in warm dilute H₂SO₄." },
  { q: "Why a vinegar smell with acetates?", a: "Acid liberates acetic acid, which is volatile." },
  { q: "Why the ester test?", a: "Acetate + ethanol + conc. H₂SO₄ → ethyl acetate (fruity odour)." },
  { q: "Why must FeCl₃ be neutral for acetate?", a: "Free acid prevents the deep-red ferric acetate complex." },
  { q: "Why does NH₄Cl sublime?", a: "It dissociates to NH₃ and HCl which recombine on cooler parts of the tube." },
  { q: "Why keep the mouth of the tube away from the face?", a: "HCl, Cl₂, Br₂, NO₂ and H₂S are harmful gases." },
  { q: "What is soda extract?", a: "Salt fused / boiled with Na₂CO₃ so anions go into solution as sodium salts, free of heavy-metal cations." },
  { q: "Why is original solution often made in dilute HCl?", a: "To dissolve the salt and to have the medium ready for Group I / II. Boil off CO₂ if a carbonate was present." },
  { q: "Why not use excess of reagents?", a: "Excess NaOH / NH₄OH can redissolve amphoteric hydroxides or mask later tests. School instruction: small quantities." },
];

export default function VivaPage() {
  return (
    <Layout
      title="Salt Analysis Viva Questions | Class 12 CBSE Practical"
      description="40 Class 12 salt analysis viva questions and answers: Nessler, AgNO₃, lime water, brown ring, Group III, flame tests and precautions."
      canonicalUrl="https://saltanalysis.com/viva"
      keywords="salt analysis viva, class 12 viva, CBSE chemistry practical viva, Nessler, brown ring, lime water"
      faqs={VIVA.slice(0, 8)}
    >
      <div className={styles.page}>
        <h1>Salt analysis viva (Class 12)</h1>
        <p className={styles.lead}>
          Forty questions examiners actually ask. Pair this with a printed writeup
          from a <Link href="/how-to-do-salt-analysis">common salt page</Link>.
        </p>
        <ol className={styles.viva}>
          {VIVA.map((item) => (
            <li key={item.q}>
              <p>
                <strong>{item.q}</strong>
              </p>
              <p>{item.a}</p>
            </li>
          ))}
        </ol>
      </div>
    </Layout>
  );
}
