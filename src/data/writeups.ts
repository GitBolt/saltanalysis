import { formulaToUrl } from "@/utils/encoders";
import { Test, SaltWriteup } from "@/types/ions";

const row = (
  experiment: string,
  observation: string,
  inference: string,
  extra: Partial<Test> = {}
): Test => ({ experiment, observation, inference, ...extra });

const chlorideAnion: Test[] = [
  row(
    "Heat a pinch of salt with conc. H₂SO₄",
    "Colourless gas with a pungent smell; dense white fumes with NH₄OH",
    "Cl⁻ may be present"
  ),
  row(
    "Heat the salt with conc. H₂SO₄ and a pinch of MnO₂",
    "Greenish-yellow chlorine gas is evolved",
    "Cl⁻ is indicated",
    { name: "MnO₂ / conc. H₂SO₄", confirmatory: true }
  ),
  row(
    "Acidify the soda extract with dilute HNO₃ and add AgNO₃, then NH₄OH",
    "Curdy white ppt of AgCl, soluble in NH₄OH, reappears with dilute HNO₃",
    "Cl⁻ is confirmed",
    { name: "Silver nitrate", confirmatory: true }
  ),
  row(
    "Heat salt + K₂Cr₂O₇ + conc. H₂SO₄. Pass vapours into NaOH; acidify with acetic acid and add lead acetate",
    "Yellow chromyl chloride vapours; yellow ppt of PbCrO₄",
    "Cl⁻ is confirmed (chromyl chloride test)",
    { name: "Chromyl chloride", confirmatory: true }
  ),
];

const sulphateAnion: Test[] = [
  row(
    "Acidify the water / soda extract with dilute HCl and add BaCl₂",
    "White ppt of BaSO₄, insoluble in conc. HCl and conc. HNO₃",
    "SO₄²⁻ is confirmed",
    { name: "Barium chloride", confirmatory: true }
  ),
  row(
    "Acidify with acetic acid and add lead acetate",
    "White ppt of PbSO₄",
    "SO₄²⁻ is confirmed",
    { name: "Lead acetate", confirmatory: true }
  ),
];

const nitrateAnion: Test[] = [
  row(
    "Heat the salt with conc. H₂SO₄ and copper turnings",
    "Brown fumes of NO₂; solution often turns blue with Cu",
    "NO₃⁻ may be present"
  ),
  row(
    "To 1 mL of the solution add freshly prepared FeSO₄, then pour conc. H₂SO₄ slowly down the side",
    "Brown ring at the junction of the two layers (nitroso-ferrous sulphate)",
    "NO₃⁻ is confirmed",
    { name: "Brown ring", confirmatory: true }
  ),
];

const carbonateAnion: Test[] = [
  row(
    "Add dilute H₂SO₄ (or dilute HCl) to the salt",
    "Brisk effervescence; colourless, odourless gas",
    "CO₃²⁻ may be present"
  ),
  row(
    "Pass the gas through lime water. Continue passing in excess",
    "Lime water turns milky; milkiness disappears on excess CO₂",
    "CO₃²⁻ is confirmed",
    { name: "Lime water", confirmatory: true }
  ),
];

const acetateAnion: Test[] = [
  row(
    "Warm the salt with dilute H₂SO₄",
    "Vapours with a vinegar-like smell",
    "CH₃COO⁻ may be present"
  ),
  row(
    "Heat salt + ethanol + a few drops of conc. H₂SO₄. Pour into water and smell",
    "Fruity odour of ethyl acetate",
    "CH₃COO⁻ is confirmed",
    { name: "Ester test", confirmatory: true }
  ),
  row(
    "Add neutral FeCl₃ to the aqueous solution",
    "Deep red colour; on boiling, a reddish-brown ppt of basic ferric acetate",
    "CH₃COO⁻ is confirmed",
    { name: "Ferric chloride", confirmatory: true }
  ),
];

const oxalateAnion: Test[] = [
  row(
    "Heat the salt with conc. H₂SO₄",
    "Colourless gases (CO + CO₂); CO burns with a blue flame at the mouth",
    "C₂O₄²⁻ may be present"
  ),
  row(
    "Acidify the extract with acetic acid and add CaCl₂",
    "White ppt of calcium oxalate, insoluble in acetic acid, soluble in HCl",
    "C₂O₄²⁻ is confirmed",
    { name: "Calcium chloride", confirmatory: true }
  ),
  row(
    "To the oxalate ppt add dilute H₂SO₄ and warm with dilute KMnO₄",
    "Pink colour of KMnO₄ is discharged",
    "C₂O₄²⁻ is confirmed",
    { name: "KMnO₄", confirmatory: true }
  ),
];

const bromideAnion: Test[] = [
  row(
    "Heat the salt with conc. H₂SO₄",
    "Reddish-brown vapours of Br₂",
    "Br⁻ may be present"
  ),
  row(
    "To the aqueous extract add CCl₄ / CHCl₃ and chlorine water; shake",
    "Orange-brown organic layer",
    "Br⁻ is confirmed",
    { name: "Layer test", confirmatory: true }
  ),
  row(
    "Acidify soda extract with dilute HNO₃ and add AgNO₃",
    "Pale yellow ppt of AgBr, sparingly soluble in NH₄OH",
    "Br⁻ is confirmed",
    { name: "Silver nitrate", confirmatory: true }
  ),
];

const ammoniumCation: Test[] = [
  row(
    "Heat the salt with NaOH solution",
    "Ammoniacal smell; gas turns red litmus blue",
    "NH₄⁺ may be present (Group 0)"
  ),
  row(
    "Bring a glass rod dipped in conc. HCl near the mouth of the tube",
    "Dense white fumes of NH₄Cl",
    "NH₄⁺ may be present"
  ),
  row(
    "Pass the gas into Nessler’s reagent (K₂[HgI₄] in KOH)",
    "Brown colouration or brown ppt of basic mercury(II) amidoiodide",
    "NH₄⁺ is confirmed. Stop cation analysis here for ammonium salts.",
    { name: "Nessler’s reagent", confirmatory: true }
  ),
];

const leadCation: Test[] = [
  row(
    "To the original solution add dilute HCl",
    "White ppt of PbCl₂, soluble in hot water, reappears on cooling",
    "Group I (Pb²⁺) may be present"
  ),
  row(
    "To the hot solution of the ppt add KI",
    "Yellow ppt of PbI₂ (golden spangles on cooling)",
    "Pb²⁺ is confirmed",
    { name: "Potassium iodide", confirmatory: true }
  ),
  row(
    "To the acidified solution add K₂CrO₄",
    "Yellow ppt of PbCrO₄, insoluble in acetic acid",
    "Pb²⁺ is confirmed",
    { name: "Potassium chromate", confirmatory: true }
  ),
];

const aluminiumCation: Test[] = [
  row(
    "To the original solution add solid NH₄Cl and NH₄OH (Group III)",
    "White gelatinous ppt of Al(OH)₃",
    "Group III (Al³⁺) may be present"
  ),
  row(
    "Dissolve the ppt in dilute HCl. Add NaOH in excess and warm",
    "White gelatinous ppt dissolves in excess NaOH (sodium aluminate)",
    "Al³⁺ is confirmed",
    { name: "NaOH (excess)", confirmatory: true }
  ),
  row(
    "To a portion add a drop of blue litmus and then NH₄OH along the sides",
    "Blue floating lake in a colourless solution",
    "Al³⁺ is confirmed",
    { name: "Blue lake", confirmatory: true }
  ),
];

const copperCation: Test[] = [
  row(
    "Pass H₂S through the original solution acidified with dilute HCl",
    "Black ppt of CuS",
    "Group II (Cu²⁺) may be present"
  ),
  row(
    "Dissolve the ppt in dilute HNO₃. Add NH₄OH dropwise, then in excess",
    "Pale blue ppt dissolves giving a deep blue [Cu(NH₃)₄]²⁺ solution",
    "Cu²⁺ is confirmed",
    { name: "Ammonium hydroxide", confirmatory: true }
  ),
  row(
    "Acidify with acetic acid and add K₄[Fe(CN)₆]",
    "Chocolate-brown ppt of copper ferrocyanide",
    "Cu²⁺ is confirmed",
    { name: "Potassium ferrocyanide", confirmatory: true }
  ),
];

const zincCation: Test[] = [
  row(
    "Pass H₂S through the solution made alkaline with NH₄OH (after Group III)",
    "White ppt of ZnS",
    "Group IV (Zn²⁺) may be present"
  ),
  row(
    "Add NaOH dropwise, then in excess, and warm",
    "White ppt of Zn(OH)₂ dissolves in excess NaOH",
    "Zn²⁺ is confirmed",
    { name: "Sodium hydroxide", confirmatory: true }
  ),
  row(
    "Neutralise and add K₄[Fe(CN)₆]",
    "Bluish-white ppt of zinc ferrocyanide",
    "Zn²⁺ is confirmed",
    { name: "Potassium ferrocyanide", confirmatory: true }
  ),
];

const bariumCation: Test[] = [
  row(
    "Groups I–IV reagents (dil. HCl, H₂S / acid, NH₄Cl + NH₄OH, H₂S / alkaline) give no ppt",
    "No precipitate in Groups I–IV",
    "Groups I–IV cations are absent"
  ),
  row(
    "To the ammoniacal solution add (NH₄)₂CO₃",
    "White ppt of BaCO₃",
    "Group V may be present"
  ),
  row(
    "Flame test of the salt moistened with conc. HCl",
    "Apple-green flame",
    "Ba²⁺ is confirmed",
    { name: "Flame test", confirmatory: true }
  ),
  row(
    "Dissolve the carbonate ppt in acetic acid and add K₂CrO₄",
    "Yellow ppt of BaCrO₄",
    "Ba²⁺ is confirmed",
    { name: "Potassium chromate", confirmatory: true }
  ),
];

const strontiumCation: Test[] = [
  row(
    "Groups I–IV reagents give no ppt. Then add (NH₄)₂CO₃ in ammoniacal medium",
    "White ppt of SrCO₃",
    "Group V may be present"
  ),
  row(
    "Flame test moistened with conc. HCl",
    "Crimson-red flame",
    "Sr²⁺ is confirmed",
    { name: "Flame test", confirmatory: true }
  ),
  row(
    "Dissolve ppt in acetic acid and add (NH₄)₂SO₄",
    "White ppt of SrSO₄",
    "Sr²⁺ is confirmed",
    { name: "Ammonium sulphate", confirmatory: true }
  ),
];

const calciumCation: Test[] = [
  row(
    "Groups I–IV absent. Add (NH₄)₂CO₃ in ammoniacal medium",
    "White ppt of CaCO₃",
    "Group V may be present"
  ),
  row(
    "Flame test moistened with conc. HCl",
    "Brick-red flame",
    "Ca²⁺ is confirmed",
    { name: "Flame test", confirmatory: true }
  ),
  row(
    "Dissolve ppt in acetic acid and add (NH₄)₂C₂O₄",
    "White ppt of calcium oxalate",
    "Ca²⁺ is confirmed",
    { name: "Ammonium oxalate", confirmatory: true }
  ),
];

const magnesiumCation: Test[] = [
  row(
    "Groups I–V reagents give no ppt. Add Na₂HPO₄ and scratch the walls",
    "White crystalline ppt of MgNH₄PO₄",
    "Group VI (Mg²⁺) is confirmed",
    { name: "Disodium hydrogen phosphate", confirmatory: true }
  ),
  row(
    "To the alkaline solution add a drop of Magneson I",
    "Blue lake / blue ppt",
    "Mg²⁺ is confirmed",
    { name: "Magneson", confirmatory: true }
  ),
];

const chlorideEq = [
  "NaCl + H₂SO₄ (conc.) → NaHSO₄ + HCl ↑",
  "MnO₂ + 4HCl → MnCl₂ + Cl₂ ↑ + 2H₂O",
  "Ag⁺ + Cl⁻ → AgCl ↓ (white)",
  "AgCl + 2NH₄OH → [Ag(NH₃)₂]Cl + 2H₂O",
];

const sulphateEq = [
  "Ba²⁺ + SO₄²⁻ → BaSO₄ ↓ (white, insoluble in acids)",
  "Pb²⁺ + SO₄²⁻ → PbSO₄ ↓",
];

const nitrateEq = [
  "2NO₃⁻ + 4H₂SO₄ + 6Fe²⁺ → 2NO + 6Fe³⁺ + 4SO₄²⁻ + 4H₂O",
  "FeSO₄ + NO → [Fe(H₂O)₅NO]SO₄ (brown ring)",
];

const carbonateEq = [
  "CO₃²⁻ + 2H⁺ → CO₂ ↑ + H₂O",
  "Ca(OH)₂ + CO₂ → CaCO₃ ↓ (milky) + H₂O",
  "CaCO₃ + CO₂ + H₂O → Ca(HCO₃)₂ (milkiness disappears)",
];

const ammoniumEq = [
  "NH₄⁺ + OH⁻ → NH₃ ↑ + H₂O",
  "NH₃ + HCl → NH₄Cl (white fumes)",
  "2K₂[HgI₄] + 3KOH + NH₃ → H₂N–Hg–O–Hg–I ↓ + 7KI + 2H₂O",
];

const leadEq = [
  "Pb²⁺ + 2Cl⁻ → PbCl₂ ↓",
  "Pb²⁺ + 2I⁻ → PbI₂ ↓ (yellow)",
  "Pb²⁺ + CrO₄²⁻ → PbCrO₄ ↓ (yellow)",
];

const commonPrecautions = [
  "Use small quantities of salt and reagents; do not use excess.",
  "Keep the mouth of the test tube away from the face while heating.",
  "Use freshly prepared FeSO₄ for the brown ring test.",
  "Nessler’s reagent is toxic (mercury); handle with care and do not pipette by mouth.",
];

type WriteupInput = SaltWriteup & {
  cation: string;
  anion: string;
};

const WRITEUP_LIST: WriteupInput[] = [
  {
    cation: "NH₄⁺",
    anion: "Cl⁻",
    prelims: [
      row("Physical examination", "White crystalline solid; ammoniacal smell", "May be an ammonium salt"),
      row("Solubility", "Readily soluble in water", "Water-soluble salt"),
      row("Dry heating", "Salt sublimes; white sublimate on the cooler parts; smell of ammonia", "NH₄Cl (sal ammoniac) indicated"),
      row("Flame test", "No characteristic flame colour", "Not Na⁺, Ca²⁺, Sr²⁺, Ba²⁺, Cu²⁺"),
      row("Dilute H₂SO₄", "No characteristic gas", "CO₃²⁻, S²⁻, SO₃²⁻, NO₂⁻, CH₃COO⁻ absent"),
      row("Conc. H₂SO₄", "Colourless pungent gas; white fumes with NH₄OH", "Cl⁻ may be present"),
    ],
    anionTests: chlorideAnion,
    cationTests: ammoniumCation,
    anionEquations: chlorideEq,
    cationEquations: ammoniumEq,
    related: [
      { cation: "NH₄⁺", anion: "CO₃²⁻" },
      { cation: "NH₄⁺", anion: "SO₄²⁻" },
      { cation: "Pb²⁺", anion: "Cl⁻" },
    ],
    faqs: [
      { q: "Is NH₄Cl odourless?", a: "No. Ammonium chloride has an ammoniacal smell. The site previously inherited “odourless” from chloride — that was wrong." },
      { q: "What is the confirmatory test for chloride?", a: "AgNO₃ gives a curdy white ppt of AgCl, soluble in NH₄OH. Chromyl chloride is a second confirmatory." },
      { q: "Which group is NH₄⁺?", a: "Group 0. Test it with NaOH / Nessler first and stop; do not run Groups I–VI." },
    ],
    viva: [
      { q: "Why does NH₄Cl sublime on dry heating?", a: "It dissociates to NH₃ and HCl which recombine on the cooler parts of the tube as a white sublimate." },
      { q: "Why is Nessler’s reagent used?", a: "It gives a characteristic brown ppt with ammonia, confirming NH₄⁺ even in small amounts." },
      { q: "Why is AgNO₃ added after acidifying with HNO₃?", a: "HNO₃ prevents phosphates, oxalates and carbonates of silver from precipitating; only AgCl / AgBr / AgI ppt." },
      { q: "Why white fumes with a HCl-dipped rod?", a: "NH₃ + HCl → NH₄Cl smoke." },
      { q: "Why is the chromyl chloride test not given by bromides/iodides?", a: "They form Br₂ / I₂, not a chromyl compound analogous to CrO₂Cl₂." },
      { q: "Why must the original solution not be made in conc. HCl for NH₄Cl?", a: "The salt is already a chloride; water extract is enough. Group I HCl is for other cations." },
      { q: "Why does red litmus turn blue with the gas?", a: "Ammonia is alkaline." },
      { q: "How is NH₄Cl used in Group III?", a: "NH₄Cl suppresses [OH⁻] by common-ion effect so only Group III hydroxides ppt, not Mg(OH)₂." },
    ],
    hindi: {
      title: "अमोनियम क्लोराइड (NH₄Cl) — हिन्दी में",
      paragraphs: [
        "नमक: अमोनियम क्लोराइड। अम्लीय मूलक: क्लोराइड (Cl⁻)। क्षारीय मूलक: अमोनियम (NH₄⁺)।",
        "गंध अमोनिया जैसी होती है, गंधहीन नहीं। शुष्क ऊष्मा पर नमक उर्ध्वपातित हो जाता है।",
        "क्लोराइड की पुष्टि AgNO₃ से सफेद अवक्षेप (NH₄OH में घुलनशील) से होती है। अमोनियम की पुष्टि नैस्लर अभिकर्मक से भूरे अवक्षेप से होती है।",
      ],
    },
    precautions: commonPrecautions,
  },
  {
    cation: "Pb²⁺",
    anion: "CH₃COO⁻",
    prelims: [
      row("Physical examination", "White crystalline solid; vinegar-like smell", "Acetate may be present"),
      row("Solubility", "Soluble in water", "Water-soluble lead salt (not the chloride/sulphate)"),
      row("Dry heating", "May crackle; vapours smell of vinegar; residue often yellow (PbO)", "Lead acetate indicated"),
      row("Flame test", "No alkali-earth flame; sometimes a pale bluish-white tinge", "Not Ba / Sr / Ca"),
      row("Dilute H₂SO₄", "Vinegar-like vapours of acetic acid", "CH₃COO⁻ may be present"),
      row("Conc. H₂SO₄", "Vinegar vapours; no chromyl / halide fumes of Cl₂, Br₂, I₂", "Acetate, not a halide"),
    ],
    anionTests: acetateAnion,
    cationTests: leadCation,
    anionEquations: [
      "2CH₃COO⁻ + 2H⁺ → 2CH₃COOH (vinegar smell)",
      "CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O (ester)",
      "3CH₃COO⁻ + Fe³⁺ → (CH₃COO)₃Fe (deep red)",
    ],
    cationEquations: leadEq,
    related: [
      { cation: "Pb²⁺", anion: "NO₃⁻" },
      { cation: "Pb²⁺", anion: "Cl⁻" },
      { cation: "NH₄⁺", anion: "Cl⁻" },
    ],
    faqs: [
      { q: "Does lead acetate smell?", a: "Yes — vinegar-like (acetic acid) odour. That comes from the acetate, not from lead." },
      { q: "Which group is Pb²⁺?", a: "Group I. Dilute HCl gives white PbCl₂, soluble in hot water." },
      { q: "Confirmatory tests for lead?", a: "Yellow PbI₂ with KI (golden spangles) and yellow PbCrO₄ with chromate." },
    ],
    viva: [
      { q: "Why is lead placed in Group I?", a: "PbCl₂ is insoluble in cold dilute HCl." },
      { q: "Why is the ppt dissolved in hot water?", a: "PbCl₂ is appreciably soluble in hot water; AgCl is not — this separates lead from silver." },
      { q: "What are golden spangles?", a: "Shining yellow crystals of PbI₂ that appear on cooling the hot solution." },
      { q: "Why vinegar smell with dilute acid?", a: "Acetate + H⁺ → acetic acid, which is volatile and smells of vinegar." },
      { q: "Why is the ester test done with conc. H₂SO₄?", a: "Conc. H₂SO₄ is a dehydrating catalyst for esterification." },
      { q: "Why must FeCl₃ be neutral?", a: "Free acid prevents formation of the deep-red ferric acetate complex." },
      { q: "Why yellow ppt with K₂CrO₄?", a: "PbCrO₄ is an insoluble yellow chromate used also as a pigment (chrome yellow)." },
      { q: "Why not pass H₂S in acid for this salt after Group I is positive?", a: "Once Pb²⁺ is confirmed, later groups are not run." },
    ],
    hindi: {
      title: "लेड एसीटेट — हिन्दी में",
      paragraphs: [
        "नमक: लेड एसीटेट। अम्लीय मूलक: एसीटेट (सिरके जैसी गंध)। क्षारीय मूलक: लेड, वर्ग I।",
        "तनु HCl से सफेद PbCl₂, गर्म जल में घुल जाता है। KI से पीला PbI₂ (सुनहरे स्पैंगल्स)।",
        "एसीटेट की पुष्टि एस्टर परीक्षण (फल जैसी गंध) और उदासीन FeCl₃ से गहरे लाल रंग से होती है।",
      ],
    },
    precautions: commonPrecautions,
  },
  {
    cation: "NH₄⁺",
    anion: "CO₃²⁻",
    prelims: [
      row("Physical examination", "White solid; ammoniacal smell", "Ammonium salt"),
      row("Solubility", "Soluble in water", "Unlike CaCO₃ / BaCO₃, ammonium carbonate dissolves"),
      row("Dry heating", "NH₃ and CO₂ evolved; salt may disappear (volatile)", "Ammonium carbonate"),
      row("Dilute H₂SO₄", "Brisk effervescence of CO₂; lime water milky", "CO₃²⁻ present"),
      row("Conc. H₂SO₄", "CO₂ evolved; no halide fumes", "Carbonate, not halide"),
      row("Flame test", "No characteristic colour", "Not Ba / Sr / Ca"),
    ],
    anionTests: carbonateAnion,
    cationTests: ammoniumCation,
    anionEquations: carbonateEq,
    cationEquations: ammoniumEq,
    related: [
      { cation: "NH₄⁺", anion: "Cl⁻" },
      { cation: "Ca²⁺", anion: "CO₃²⁻" },
      { cation: "NH₄⁺", anion: "SO₄²⁻" },
    ],
    faqs: [
      { q: "Do you run cation Groups I–VI for ammonium carbonate?", a: "No. Confirm NH₄⁺ (Group 0) and stop." },
      { q: "Why does lime water go milky then clear?", a: "CaCO₃ ppt forms, then excess CO₂ converts it to soluble Ca(HCO₃)₂." },
      { q: "Is sodium nitroprusside a carbonate test?", a: "No — that is a sulphide test. Carbonate is lime water." },
    ],
    viva: [
      { q: "Why brisk effervescence with dilute acid?", a: "Carbonate + acid → CO₂." },
      { q: "How do you distinguish CO₂ from SO₂?", a: "SO₂ has a burning-sulphur smell and decolourises acidified KMnO₄ / K₂Cr₂O₇; CO₂ does not." },
      { q: "Why is this salt soluble unlike chalk?", a: "Alkali and ammonium carbonates are soluble; Group II carbonates are not." },
      { q: "Why Nessler after NaOH?", a: "NaOH liberates NH₃; Nessler confirms it." },
      { q: "Why Group 0 first?", a: "NH₄⁺ would interfere later (NH₄OH is a group reagent). Always test ammonium first." },
      { q: "What happens on strong heating?", a: "Ammonium carbonate decomposes completely to gases." },
      { q: "Why milkiness of lime water?", a: "Insoluble CaCO₃." },
      { q: "Can sulphite give lime water milky?", a: "SO₂ also turns lime water milky (CaSO₃). Smell and KMnO₄ distinguish it." },
    ],
    hindi: {
      title: "अमोनियम कार्बोनेट — हिन्दी में",
      paragraphs: [
        "नमक: अमोनियम कार्बोनेट। तनु अम्ल से तेज़ बुदबुदाहट (CO₂), चूने का पानी दूधिया।",
        "क्षारीय मूलक अमोनियम है — NaOH + नैस्लर। वर्ग I–VI आगे नहीं चलाते।",
        "यह नमक जल में घुलनशील है, कैल्शियम कार्बोनेट (चाक) नहीं।",
      ],
    },
    precautions: commonPrecautions,
  },
  {
    cation: "NH₄⁺",
    anion: "SO₄²⁻",
    prelims: [
      row("Physical examination", "White crystalline solid; ammoniacal smell", "Ammonium salt — not odourless"),
      row("Solubility", "Soluble in water", "Unlike BaSO₄ / PbSO₄"),
      row("Dry heating", "May give NH₃; residue can leave sulphate", "Ammonium sulphate"),
      row("Dilute H₂SO₄", "No CO₂ / H₂S / SO₂", "Not carbonate / sulphide / sulphite"),
      row("Conc. H₂SO₄", "No halide fumes", "Not Cl⁻ / Br⁻ / I⁻"),
      row("Flame test", "No characteristic colour", "Not Ba / Ca / Sr"),
    ],
    anionTests: sulphateAnion,
    cationTests: ammoniumCation,
    anionEquations: sulphateEq,
    cationEquations: ammoniumEq,
    related: [
      { cation: "NH₄⁺", anion: "Cl⁻" },
      { cation: "Al³⁺", anion: "SO₄²⁻" },
      { cation: "Zn²⁺", anion: "SO₄²⁻" },
    ],
    faqs: [
      { q: "Is ammonium sulphate odourless?", a: "The solid can smell faintly of ammonia. Treat it as ammoniacal, not odourless." },
      { q: "Confirmatory test for sulphate?", a: "BaCl₂ gives white BaSO₄ insoluble even in conc. HCl." },
      { q: "Group of NH₄⁺?", a: "Group 0. Nessler brown ppt. Stop." },
    ],
    viva: [
      { q: "Why is BaSO₄ insoluble in conc. HCl while BaSO₃ dissolves?", a: "BaSO₄ is a highly insoluble sulphate; sulphite ppt dissolves with evolution of SO₂." },
      { q: "Why acidify before adding BaCl₂?", a: "To destroy carbonate / sulphite which would also give a white barium ppt." },
      { q: "Why Nessler for this salt?", a: "To confirm the ammonium cation after NaOH liberates NH₃." },
      { q: "Why no brown ring?", a: "The anion is sulphate, not nitrate." },
      { q: "Why Group 0 before sulphate tests?", a: "Anion tests can be done on soda extract; ammonium is still tested on the original salt with NaOH." },
      { q: "Why scratch not needed here unlike Mg?", a: "Sulphate ppt with BaCl₂ comes at once; MgNH₄PO₄ is slow and needs scratching." },
      { q: "Is (NH₄)₂SO₄ used in Group IV?", a: "No — that is (NH₄)₂S / H₂S in ammoniacal medium. Do not confuse." },
      { q: "Why white ppt with lead acetate?", a: "PbSO₄ is insoluble." },
    ],
    precautions: commonPrecautions,
  },
  {
    cation: "Al³⁺",
    anion: "SO₄²⁻",
    prelims: [
      row("Physical examination", "White crystalline solid; odourless", "Not a coloured / ammonium / acetate salt"),
      row("Solubility", "Soluble in water", "Common alum-type sulphate; formula is Al₂(SO₄)₃ not (Al)₂(SO₄)₃"),
      row("Dry heating", "Water of crystallisation may be lost; white residue", "Not a nitrate (no brown fumes)"),
      row("Dilute H₂SO₄", "No gas", "Not carbonate"),
      row("Conc. H₂SO₄", "No halide / NO₂ fumes", "Not Cl⁻ / Br⁻ / I⁻ / NO₃⁻"),
      row("Flame test", "No characteristic colour", "Not Ba / Sr / Ca / Cu"),
    ],
    anionTests: sulphateAnion,
    cationTests: aluminiumCation,
    anionEquations: sulphateEq,
    cationEquations: [
      "Al³⁺ + 3NH₄OH → Al(OH)₃ ↓ + 3NH₄⁺",
      "Al(OH)₃ + NaOH → Na[Al(OH)₄] (soluble)",
    ],
    related: [
      { cation: "Al³⁺", anion: "NO₃⁻" },
      { cation: "Zn²⁺", anion: "SO₄²⁻" },
      { cation: "NH₄⁺", anion: "SO₄²⁻" },
    ],
    faqs: [
      { q: "What is the correct formula?", a: "Al₂(SO₄)₃. Parentheses only around polyatomic SO₄ because its subscript is 3." },
      { q: "Which group is Al³⁺?", a: "Group III. NH₄Cl + NH₄OH gives a white gelatinous ppt. Blue lake is confirmatory." },
      { q: "Search query “aluminium sulphate salt analysis class 12”?", a: "This page. White salt, Group III + sulphate (BaCl₂)." },
    ],
    viva: [
      { q: "Why is NH₄Cl added before NH₄OH in Group III?", a: "Common-ion effect lowers [OH⁻] so Mg(OH)₂ does not ppt; only Al / Fe hydroxides do." },
      { q: "Why is the ppt gelatinous?", a: "Al(OH)₃ is a hydrated gelatinous hydroxide." },
      { q: "Why does it dissolve in excess NaOH?", a: "Al(OH)₃ is amphoteric and forms [Al(OH)₄]⁻." },
      { q: "What is the blue lake test?", a: "Al(OH)₃ adsorbs blue litmus and floats as a blue lake." },
      { q: "How is Al³⁺ distinguished from Zn²⁺?", a: "Zn is Group IV (white ZnS with H₂S / NH₄OH). Al ppt appears in Group III before that." },
      { q: "Why BaCl₂ for the anion?", a: "Sulphate gives acid-insoluble BaSO₄." },
      { q: "Is this the same as potash alum?", a: "Potash alum is K₂SO₄·Al₂(SO₄)₃·24H₂O. This page is the simple sulphate Al₂(SO₄)₃." },
      { q: "Why is the salt white, not coloured?", a: "Al³⁺ has no d–d colour; unlike Cu²⁺ / Fe³⁺ / Ni²⁺." },
    ],
    hindi: {
      title: "ऐलुमिनियम सल्फेट — हिन्दी में",
      paragraphs: [
        "सूत्र Al₂(SO₄)₃ है, (Al)₂(SO₄)₃ नहीं। नमक सफेद और गंधहीन है।",
        "क्षारीय मूलक वर्ग III: NH₄Cl + NH₄OH से सफेद जिलेटिनी अवक्षेप, ब्लू लेक परीक्षण।",
        "अम्लीय मूलक सल्फेट: BaCl₂ से सफेद BaSO₄ जो सांद्र HCl में नहीं घुलता।",
      ],
    },
    precautions: commonPrecautions,
  },
  {
    cation: "Pb²⁺",
    anion: "NO₃⁻",
    prelims: [
      row("Physical examination", "White crystalline solid; odourless", "Not acetate / ammonium"),
      row("Solubility", "Soluble in water", "All nitrates are soluble"),
      row("Dry heating", "Decrepitates (crackling); brown fumes of NO₂; yellow residue of PbO", "Lead nitrate — characteristic"),
      row("Flame test", "No apple-green / brick-red / crimson", "Not Ba / Ca / Sr"),
      row("Dilute H₂SO₄", "No CO₂", "Not carbonate"),
      row("Conc. H₂SO₄", "Brown fumes of NO₂, stronger with copper turnings", "NO₃⁻ may be present"),
    ],
    anionTests: nitrateAnion,
    cationTests: leadCation,
    anionEquations: [
      "2Pb(NO₃)₂ → 2PbO + 4NO₂ ↑ + O₂ ↑ (dry heating)",
      ...nitrateEq,
    ],
    cationEquations: leadEq,
    related: [
      { cation: "Pb²⁺", anion: "CH₃COO⁻" },
      { cation: "Pb²⁺", anion: "Cl⁻" },
      { cation: "Ba²⁺", anion: "NO₃⁻" },
    ],
    faqs: [
      { q: "What happens on heating lead nitrate?", a: "Crackling, brown NO₂, yellow PbO residue. 2Pb(NO₃)₂ → 2PbO + 4NO₂ + O₂." },
      { q: "Confirmatory test for nitrate?", a: "Brown ring with FeSO₄ and conc. H₂SO₄." },
      { q: "Group of Pb²⁺?", a: "Group I — white PbCl₂ with dilute HCl, soluble in hot water." },
    ],
    viva: [
      { q: "Why does lead nitrate crackle?", a: "Trapped water / crystals burst on heating (decrepitation), together with decomposition." },
      { q: "Why brown fumes?", a: "NO₂ from thermal decomposition of nitrate." },
      { q: "Why is the residue yellow?", a: "PbO (litharge) is yellow." },
      { q: "Why freshly prepared FeSO₄?", a: "Fe²⁺ oxidises on standing and the ring fails." },
      { q: "Why pour H₂SO₄ down the side?", a: "To form two layers so the ring appears at the junction." },
      { q: "Why Group I before nitrate confirmatory?", a: "You may do anion first on soda extract; cation on original solution with HCl." },
      { q: "Does nitrite also give a brown ring?", a: "Nitrite gives a ring even with dilute H₂SO₄; nitrate needs conc. H₂SO₄." },
      { q: "Why is Pb(NO₃)₂ soluble unlike PbCl₂?", a: "Nitrates of all metals are soluble." },
    ],
    hindi: {
      title: "लेड नाइट्रेट — हिन्दी में",
      paragraphs: [
        "शुष्क ऊष्मा: चटचटाहट, भूरे NO₂ धुएँ, पीला PbO अवशेष। यह पहचान बहुत महत्वपूर्ण है।",
        "अम्लीय मूलक नाइट्रेट: ब्राउन रिंग परीक्षण। क्षारीय मूलक लेड: वर्ग I, KI से पीला अवक्षेप।",
        "गूगल पर “lead nitrate salt analysis” इसी प्रयोग के लिए खोजा जाता है।",
      ],
    },
    precautions: commonPrecautions,
  },
  {
    cation: "Zn²⁺",
    anion: "SO₄²⁻",
    prelims: [
      row("Physical examination", "White crystalline solid; odourless", "Not Cu²⁺ / Fe / Ni"),
      row("Solubility", "Soluble in water (white vitriol)", "Soluble sulphate"),
      row("Dry heating", "Water of crystallisation lost; white residue", "Not a nitrate"),
      row("Dilute / conc. H₂SO₄", "No characteristic gas", "Not CO₃²⁻ / Cl⁻ / Br⁻ / I⁻ / NO₃⁻"),
      row("Flame test", "No characteristic colour", "Not Ba / Ca / Sr / Cu"),
      row("Action of NaOH on a drop of solution", "White ppt soluble in excess", "Zn²⁺ or Al³⁺ possible — groups decide"),
    ],
    anionTests: sulphateAnion,
    cationTests: zincCation,
    anionEquations: sulphateEq,
    cationEquations: [
      "Zn²⁺ + H₂S → ZnS ↓ (white) + 2H⁺ (alkaline medium)",
      "Zn²⁺ + 2OH⁻ → Zn(OH)₂ ↓ ; Zn(OH)₂ + 2OH⁻ → [Zn(OH)₄]²⁻",
    ],
    related: [
      { cation: "Zn²⁺", anion: "Cl⁻" },
      { cation: "Al³⁺", anion: "SO₄²⁻" },
      { cation: "Mg²⁺", anion: "SO₄²⁻" },
    ],
    faqs: [
      { q: "Colour of ZnS?", a: "White. Black would be CuS / PbS / NiS." },
      { q: "Group of Zn²⁺?", a: "Group IV — H₂S in ammoniacal medium." },
      { q: "Why does Zn(OH)₂ dissolve in excess NaOH?", a: "Amphoteric; forms zincate." },
    ],
    viva: [
      { q: "Why is H₂S passed in alkaline medium for Group IV?", a: "[S²⁻] is higher in alkaline solution, enough to ppt ZnS / MnS / NiS / CoS." },
      { q: "Why not in acidic medium?", a: "In acid, [S²⁻] is too low for ZnS (Ksp) but enough for CuS (Group II)." },
      { q: "How is Zn distinguished from Al?", a: "Al ppts in Group III before H₂S; Zn does not." },
      { q: "Why bluish-white ferrocyanide ppt?", a: "Zinc ferrocyanide is bluish-white; copper’s is chocolate-brown." },
      { q: "Why BaCl₂ here?", a: "Anion is sulphate." },
      { q: "Why white salt?", a: "Zn²⁺ is d¹⁰ — no d–d colour." },
      { q: "Why heat with excess NaOH?", a: "Dissolution of Zn(OH)₂ is clearer on warming." },
      { q: "Is ZnS soluble in HCl?", a: "Yes — unlike CuS. Used when dissolving Group IV ppt." },
    ],
    precautions: commonPrecautions,
  },
  {
    cation: "Ba²⁺",
    anion: "Cl⁻",
    prelims: [
      row("Physical examination", "White crystalline solid; odourless", "Not ammonium / acetate / copper"),
      row("Solubility", "Soluble in water", "BaCl₂ is soluble; BaSO₄ / BaCO₃ are not"),
      row("Dry heating", "No sublimation; no brown fumes", "Not NH₄Cl / lead nitrate"),
      row("Flame test", "Apple-green flame", "Ba²⁺ indicated"),
      row("Dilute H₂SO₄", "No CO₂; a white ppt of BaSO₄ may form", "Not carbonate; sulphate from the acid"),
      row("Conc. H₂SO₄", "Colourless HCl gas; white fumes with NH₄OH", "Cl⁻ may be present"),
    ],
    anionTests: chlorideAnion,
    cationTests: bariumCation,
    anionEquations: chlorideEq,
    cationEquations: [
      "Ba²⁺ + CO₃²⁻ → BaCO₃ ↓",
      "Ba²⁺ + CrO₄²⁻ → BaCrO₄ ↓ (yellow)",
    ],
    related: [
      { cation: "Ba²⁺", anion: "NO₃⁻" },
      { cation: "Ba²⁺", anion: "Br⁻" },
      { cation: "Sr²⁺", anion: "Cl⁻" },
    ],
    faqs: [
      { q: "Is the formula Ba(Cl)₂?", a: "No. Cl is monoatomic, so BaCl₂ — never Ba(Cl)₂." },
      { q: "Flame colour of barium?", a: "Apple-green." },
      { q: "Group of Ba²⁺?", a: "Group V. (NH₄)₂CO₃ after Groups I–IV are absent." },
    ],
    viva: [
      { q: "Why apple-green flame?", a: "Characteristic atomic emission of barium." },
      { q: "Why is the wire cleaned with conc. HCl?", a: "To convert the salt to volatile chloride and remove traces of previous salts." },
      { q: "Why Group V after I–IV are absent?", a: "Otherwise carbonates of earlier groups would also ppt with (NH₄)₂CO₃." },
      { q: "Why acetic acid before K₂CrO₄?", a: "BaCrO₄ ppts in acetic acid; SrCrO₄ does so less readily — a distinction from strontium." },
      { q: "Why AgNO₃ for the anion?", a: "Cl⁻ gives curdy white AgCl soluble in NH₄OH." },
      { q: "Why is BaCl₂ used as a reagent for sulphate?", a: "Because BaSO₄ is extremely insoluble — that is this cation plus SO₄²⁻." },
      { q: "Why no Nessler?", a: "Cation is Ba²⁺, not NH₄⁺." },
      { q: "Why dilute H₂SO₄ can confuse?", a: "It precipitates BaSO₄ from a soluble barium salt — that is not a carbonate test." },
    ],
    precautions: commonPrecautions,
  },
  {
    cation: "Al³⁺",
    anion: "NO₃⁻",
    prelims: [
      row("Physical examination", "White crystalline solid; odourless", "Not copper / iron / ammonium"),
      row("Solubility", "Soluble in water", "Nitrates are soluble"),
      row("Dry heating", "May give brown fumes of NO₂ on strong heating", "Nitrate indicated"),
      row("Conc. H₂SO₄ + Cu turnings", "Brown fumes; solution may turn blue from Cu", "NO₃⁻ may be present"),
      row("Dilute H₂SO₄", "No CO₂", "Not carbonate"),
      row("Flame test", "No characteristic colour", "Not Ba / Ca / Sr / Cu"),
    ],
    anionTests: nitrateAnion,
    cationTests: aluminiumCation,
    anionEquations: nitrateEq,
    cationEquations: [
      "Al³⁺ + 3NH₄OH → Al(OH)₃ ↓ + 3NH₄⁺",
      "Al(OH)₃ + OH⁻ → [Al(OH)₄]⁻",
    ],
    related: [
      { cation: "Al³⁺", anion: "SO₄²⁻" },
      { cation: "Pb²⁺", anion: "NO₃⁻" },
      { cation: "Ba²⁺", anion: "NO₃⁻" },
    ],
    faqs: [
      { q: "Brown ring plus Group III?", a: "Yes — nitrate anion and aluminium cation." },
      { q: "Lake test?", a: "Blue lake with litmus + NH₄OH confirms Al³⁺." },
      { q: "Formula?", a: "Al(NO₃)₃ — parentheses around polyatomic nitrate." },
    ],
    viva: [
      { q: "Why brown ring?", a: "Nitroso-ferrous sulphate at the junction with conc. H₂SO₄." },
      { q: "Why Group III for Al?", a: "Al(OH)₃ ppts with NH₄Cl + NH₄OH." },
      { q: "Why amphoteric?", a: "Al(OH)₃ dissolves in excess NaOH; Fe(OH)₃ does not." },
      { q: "Why NH₄Cl in Group III?", a: "To keep [OH⁻] low." },
      { q: "Why not BaCl₂?", a: "Anion is nitrate, not sulphate." },
      { q: "Why white salt?", a: "Al³⁺ is colourless." },
      { q: "Why Cu turnings with conc. H₂SO₄?", a: "They reduce nitrate to NO₂, a preliminary nitrate test." },
      { q: "Does Al³⁺ give a flame colour?", a: "No useful flame test in school labs." },
    ],
    precautions: commonPrecautions,
  },
  {
    cation: "Cu²⁺",
    anion: "SO₄²⁻",
    prelims: [
      row("Physical examination", "Blue crystalline solid (blue vitriol); odourless", "Cu²⁺ present — not a white salt"),
      row("Solubility", "Soluble in water giving a blue solution", "Hydrated Cu²⁺ ions"),
      row("Dry heating", "Water lost; residue white anhydrous CuSO₄, then black CuO on strong heating", "Hydrated copper sulphate"),
      row("Flame test", "Bluish-green flame", "Copper indicated"),
      row("Dilute H₂SO₄", "No CO₂", "Not carbonate"),
      row("Conc. H₂SO₄", "No halide / NO₂ fumes", "Anion is sulphate, not nitrate / halide"),
    ],
    anionTests: sulphateAnion,
    cationTests: copperCation,
    anionEquations: sulphateEq,
    cationEquations: [
      "Cu²⁺ + H₂S → CuS ↓ (black) + 2H⁺",
      "Cu(OH)₂ + 4NH₄OH → [Cu(NH₃)₄]²⁺ (deep blue) + 2OH⁻ + 4H₂O",
      "2Cu²⁺ + [Fe(CN)₆]⁴⁻ → Cu₂[Fe(CN)₆] ↓ (chocolate-brown)",
    ],
    related: [
      { cation: "Zn²⁺", anion: "SO₄²⁻" },
      { cation: "Al³⁺", anion: "SO₄²⁻" },
      { cation: "Mg²⁺", anion: "SO₄²⁻" },
    ],
    faqs: [
      { q: "Is copper sulphate white?", a: "No. Hydrated CuSO₄·5H₂O is blue. Anhydrous is white; the practical salt in the bottle is blue." },
      { q: "Deep blue with ammonia?", a: "Excess NH₄OH gives tetraamminecopper(II). This is the trust test for this page." },
      { q: "Group of Cu²⁺?", a: "Group II — black CuS with H₂S in dilute HCl." },
    ],
    viva: [
      { q: "Why is the salt blue?", a: "[Cu(H₂O)₆]²⁺ absorbs in the orange-red and appears blue." },
      { q: "Why black ppt with H₂S?", a: "CuS is very insoluble and black." },
      { q: "Why H₂S in acidic medium?", a: "Group II sulphides ppt even at low [S²⁻]; ZnS would not." },
      { q: "Why deep blue with excess NH₃?", a: "Formation of [Cu(NH₃)₄]²⁺." },
      { q: "Why chocolate-brown ferrocyanide?", a: "Copper ferrocyanide; zinc’s is bluish-white — a distinction." },
      { q: "Why BaCl₂?", a: "Sulphate anion." },
      { q: "What is blue vitriol?", a: "CuSO₄·5H₂O." },
      { q: "Why does anhydrous CuSO₄ turn white?", a: "Loss of water of crystallisation; used as a test for water." },
    ],
    precautions: commonPrecautions,
  },
  {
    cation: "Mg²⁺",
    anion: "SO₄²⁻",
    prelims: [
      row("Physical examination", "White crystalline solid (Epsom salt); odourless", "Not copper / iron"),
      row("Solubility", "Soluble in water", "MgSO₄ is soluble"),
      row("Dry heating", "Water of crystallisation lost", "Hydrated sulphate"),
      row("Flame test", "No characteristic colour", "Not Ba / Ca / Sr"),
      row("Dilute / conc. H₂SO₄", "No characteristic gas", "Not CO₃²⁻ / halide / nitrate"),
      row("Groups I–V", "No ppt with the group reagents", "Proceed to Group VI"),
    ],
    anionTests: sulphateAnion,
    cationTests: magnesiumCation,
    anionEquations: sulphateEq,
    cationEquations: [
      "Mg²⁺ + NH₄⁺ + PO₄³⁻ → MgNH₄PO₄ ↓",
    ],
    related: [
      { cation: "Zn²⁺", anion: "SO₄²⁻" },
      { cation: "Ca²⁺", anion: "CO₃²⁻" },
      { cation: "NH₄⁺", anion: "SO₄²⁻" },
    ],
    faqs: [
      { q: "Group of Mg²⁺?", a: "Group VI — the leftover cation. Na₂HPO₄ gives MgNH₄PO₄. Magneson gives a blue lake." },
      { q: "Why no ppt in Group V?", a: "MgCO₃ is kept in solution by ammonium salts; it does not ppt with (NH₄)₂CO₃ under Group V conditions." },
      { q: "BaCl₂?", a: "Yes — sulphate." },
    ],
    viva: [
      { q: "Why scratch the walls?", a: "MgNH₄PO₄ is slow to crystallise; scratching starts precipitation." },
      { q: "Why NH₄⁺ in the ppt?", a: "The ppt is magnesium ammonium phosphate." },
      { q: "Why Magneson?", a: "Adsorption indicator / lake test for Mg(OH)₂." },
      { q: "Why is Mg not Group V?", a: "In the presence of NH₄Cl, MgCO₃ does not ppt." },
      { q: "Why white?", a: "Mg²⁺ has no d-electrons of a chromophore." },
      { q: "Epsom salt?", a: "MgSO₄·7H₂O." },
      { q: "Why BaCl₂ still works?", a: "Sulphate is independent of the cation group." },
      { q: "Could this be ZnSO₄?", a: "Zn would have given white ZnS in Group IV." },
    ],
    precautions: commonPrecautions,
  },
  {
    cation: "Pb²⁺",
    anion: "Cl⁻",
    prelims: [
      row("Physical examination", "White solid; odourless", "Not acetate"),
      row("Solubility", "Sparingly soluble in cold water; soluble in hot water", "Characteristic of PbCl₂"),
      row("Dry heating", "May melt; no sublimate of NH₄Cl; no brown NO₂", "Not ammonium chloride / lead nitrate"),
      row("Dilute H₂SO₄", "White ppt of PbSO₄ may form; no CO₂", "Not carbonate"),
      row("Conc. H₂SO₄", "HCl gas (from chloride) on heating", "Cl⁻ may be present"),
      row("Flame test", "No apple-green / brick-red", "Not Ba / Ca"),
    ],
    anionTests: chlorideAnion,
    cationTests: leadCation,
    anionEquations: chlorideEq,
    cationEquations: leadEq,
    related: [
      { cation: "Pb²⁺", anion: "NO₃⁻" },
      { cation: "Pb²⁺", anion: "CH₃COO⁻" },
      { cation: "Ba²⁺", anion: "Cl⁻" },
    ],
    faqs: [
      { q: "Why is PbCl₂ only slightly soluble?", a: "It is the Group I chloride. Hot water dissolves it; it re-ppts on cooling." },
      { q: "AgNO₃ on a lead chloride salt?", a: "Still positive for Cl⁻ on the soda extract. Cation tests use dilute HCl / KI / chromate." },
      { q: "Group?", a: "Group I cation + halide anion." },
    ],
    viva: [
      { q: "Why dissolve in hot water?", a: "Solubility of PbCl₂ rises sharply with temperature." },
      { q: "Why golden spangles with KI?", a: "PbI₂ crystallises as shining yellow plates." },
      { q: "Why chromyl chloride can still work?", a: "The salt contains chloride." },
      { q: "How is this different from NH₄Cl?", a: "No ammoniacal smell, no sublimation, Group I lead tests instead of Nessler." },
      { q: "Why might original solution be made in hot water?", a: "Cold water does not dissolve enough PbCl₂." },
      { q: "Why yellow with chromate?", a: "PbCrO₄." },
      { q: "Why not Group II after this?", a: "Lead is already confirmed in Group I (though Pb²⁺ can also ppt as PbS later if missed)." },
      { q: "Is the formula Pb(Cl)₂?", a: "No — PbCl₂." },
    ],
    precautions: commonPrecautions,
  },
  {
    cation: "Sr²⁺",
    anion: "Cl⁻",
    prelims: [
      row("Physical examination", "White solid; odourless", "Not copper / ammonium"),
      row("Solubility", "Soluble in water", "Soluble chloride"),
      row("Flame test", "Crimson-red flame", "Sr²⁺ indicated"),
      row("Dilute H₂SO₄", "No CO₂; SrSO₄ may slowly ppt", "Not carbonate"),
      row("Conc. H₂SO₄", "HCl gas; white fumes with NH₄OH", "Cl⁻ may be present"),
      row("Dry heating", "No brown fumes / sublimation", "Not nitrate / NH₄Cl"),
    ],
    anionTests: chlorideAnion,
    cationTests: strontiumCation,
    anionEquations: chlorideEq,
    cationEquations: [
      "Sr²⁺ + CO₃²⁻ → SrCO₃ ↓",
      "Sr²⁺ + SO₄²⁻ → SrSO₄ ↓",
    ],
    related: [
      { cation: "Ba²⁺", anion: "Cl⁻" },
      { cation: "Ca²⁺", anion: "CO₃²⁻" },
      { cation: "Ba²⁺", anion: "NO₃⁻" },
    ],
    faqs: [
      { q: "Flame of strontium?", a: "Crimson (carmine) red. Barium is apple-green; calcium is brick-red." },
      { q: "Group?", a: "Group V." },
      { q: "Confirmatory vs barium?", a: "SrSO₄ with ammonium sulphate; barium gives BaCrO₄ in acetic acid more readily." },
    ],
    viva: [
      { q: "Why crimson flame?", a: "Atomic emission of strontium." },
      { q: "How is Sr distinguished from Ca?", a: "SrSO₄ ppts with (NH₄)₂SO₄; CaSO₄ is more soluble. Ca gives brick-red flame and oxalate ppt." },
      { q: "How from Ba?", a: "Ba: apple-green flame and yellow BaCrO₄ in acetic acid." },
      { q: "Why Group V?", a: "Carbonate ppt with (NH₄)₂CO₃ after earlier groups are absent." },
      { q: "Why AgNO₃?", a: "Chloride anion." },
      { q: "Why no Nessler?", a: "Not ammonium." },
      { q: "Why HCl on the wire?", a: "Volatile chloride gives a better flame." },
      { q: "Is SrCl₂ on the CBSE list?", a: "Sr²⁺ is a Group V cation in the qualitative analysis scheme." },
    ],
    precautions: commonPrecautions,
  },
  {
    cation: "Ba²⁺",
    anion: "NO₃⁻",
    prelims: [
      row("Physical examination", "White crystalline solid; odourless", "Not copper"),
      row("Solubility", "Soluble in water", "Nitrate"),
      row("Dry heating", "Crackling possible; brown fumes of NO₂; residue related to BaO", "Nitrate of an alkaline earth"),
      row("Flame test", "Apple-green flame", "Ba²⁺"),
      row("Dilute H₂SO₄", "White ppt of BaSO₄; no CO₂", "Not carbonate; sulphate forms from the acid"),
      row("Conc. H₂SO₄ + Cu", "Brown NO₂ fumes", "NO₃⁻ may be present"),
    ],
    anionTests: nitrateAnion,
    cationTests: bariumCation,
    anionEquations: nitrateEq,
    cationEquations: [
      "Ba²⁺ + CrO₄²⁻ → BaCrO₄ ↓",
    ],
    related: [
      { cation: "Ba²⁺", anion: "Cl⁻" },
      { cation: "Pb²⁺", anion: "NO₃⁻" },
      { cation: "Al³⁺", anion: "NO₃⁻" },
    ],
    faqs: [
      { q: "Barium nitrate salt analysis?", a: "Apple-green flame + brown ring. Group V barium, nitrate anion." },
      { q: "Why not BaCl₂ tests only?", a: "There is no chloride here — skip AgNO₃ / chromyl chloride." },
      { q: "Formula?", a: "Ba(NO₃)₂." },
    ],
    viva: [
      { q: "Why apple-green and brown ring together?", a: "Cation Ba²⁺, anion NO₃⁻." },
      { q: "Why brown fumes on heating?", a: "Decomposition of nitrate to NO₂." },
      { q: "Why BaSO₄ with dilute H₂SO₄?", a: "Barium salts + sulphate ions ppt BaSO₄ — not a carbonate test." },
      { q: "Why K₂CrO₄?", a: "Confirmatory for barium in Group V." },
      { q: "Why freshly prepared FeSO₄?", a: "Brown ring fails with oxidised ferrous sulphate." },
      { q: "Flame wire?", a: "Conc. HCl, non-luminous flame, clean nichrome / platinum." },
      { q: "Group?", a: "V." },
      { q: "Difference from BaCl₂?", a: "Anion tests: brown ring vs chloride tests." },
    ],
    precautions: commonPrecautions,
  },
  {
    cation: "Ca²⁺",
    anion: "CO₃²⁻",
    prelims: [
      row("Physical examination", "White chalky solid; odourless", "Chalk / limestone / marble type"),
      row("Solubility", "Insoluble in water; dissolves in dilute acid with effervescence", "Insoluble carbonate"),
      row("Dry heating", "CO₂ evolved; residue is CaO (lime), alkaline to moist litmus", "Calcium carbonate"),
      row("Flame test", "Brick-red flame", "Ca²⁺ indicated"),
      row("Dilute H₂SO₄ / HCl", "Brisk effervescence of CO₂; lime water milky", "CO₃²⁻ present"),
      row("Conc. H₂SO₄", "CO₂; no halide fumes", "Not a halide"),
    ],
    anionTests: carbonateAnion,
    cationTests: calciumCation,
    anionEquations: carbonateEq,
    cationEquations: [
      "CaCO₃ → CaO + CO₂ ↑ (heat)",
      "Ca²⁺ + C₂O₄²⁻ → CaC₂O₄ ↓",
    ],
    related: [
      { cation: "NH₄⁺", anion: "CO₃²⁻" },
      { cation: "Sr²⁺", anion: "Cl⁻" },
      { cation: "Ba²⁺", anion: "Cl⁻" },
    ],
    faqs: [
      { q: "Why chalky and insoluble?", a: "Group II carbonates are water-insoluble. Ammonium carbonate is soluble — different salt." },
      { q: "Flame?", a: "Brick-red." },
      { q: "Lime water?", a: "CO₂ from the carbonate turns it milky." },
    ],
    viva: [
      { q: "Why insoluble in water but soluble in acid?", a: "Acid converts CO₃²⁻ to CO₂ and leaves soluble Ca²⁺." },
      { q: "How is original solution prepared?", a: "Dissolve in dilute HCl, then proceed with cation groups (CO₂ must be boiled off)." },
      { q: "Why brick-red flame?", a: "Calcium emission." },
      { q: "Why oxalate confirmatory?", a: "CaC₂O₄ is insoluble in acetic acid." },
      { q: "How from Sr / Ba?", a: "Flame colours and (NH₄)₂SO₄ / K₂CrO₄ distinctions." },
      { q: "What is the residue after heating?", a: "CaO; it turns moist red litmus blue." },
      { q: "Why milkiness disappears with excess CO₂?", a: "Bicarbonate formation." },
      { q: "Is this a Group V salt?", a: "Yes — Ca²⁺ is Group V; the anion is carbonate so dilute-acid test comes first." },
    ],
    precautions: commonPrecautions,
  },
  {
    cation: "Zn²⁺",
    anion: "Cl⁻",
    prelims: [
      row("Physical examination", "White deliquescent solid; odourless", "Not copper"),
      row("Solubility", "Soluble in water", "Soluble chloride"),
      row("Dry heating", "May give white fumes of ZnO on very strong heating; no NH₃", "Not NH₄Cl"),
      row("Dilute H₂SO₄", "No CO₂", "Not carbonate"),
      row("Conc. H₂SO₄", "HCl gas; white fumes with NH₄OH", "Cl⁻ may be present"),
      row("Flame test", "No characteristic alkali-earth colour", "Not Ba / Ca / Sr"),
    ],
    anionTests: chlorideAnion,
    cationTests: zincCation,
    anionEquations: chlorideEq,
    cationEquations: [
      "Zn²⁺ + H₂S → ZnS ↓ (white)  (ammoniacal)",
      "Zn(OH)₂ + 2OH⁻ → [Zn(OH)₄]²⁻",
    ],
    related: [
      { cation: "Zn²⁺", anion: "SO₄²⁻" },
      { cation: "Al³⁺", anion: "SO₄²⁻" },
      { cation: "Ba²⁺", anion: "Cl⁻" },
    ],
    faqs: [
      { q: "School file experiment?", a: "ZnCl₂ is a common assigned salt: Group IV zinc + chloride confirmatory." },
      { q: "White ZnS?", a: "Yes. Black would be copper / lead / nickel sulphide." },
      { q: "Formula Zn(Cl)₂?", a: "No — ZnCl₂." },
    ],
    viva: [
      { q: "Why Group IV?", a: "ZnS ppts with H₂S in ammoniacal medium." },
      { q: "Why excess NaOH?", a: "Amphoteric zinc hydroxide dissolves." },
      { q: "Why AgNO₃?", a: "Chloride anion." },
      { q: "Difference from ZnSO₄?", a: "Anion tests: chloride vs BaCl₂ sulphate." },
      { q: "Difference from AlCl₃ / alum?", a: "Al is Group III gelatinous hydroxide and blue lake." },
      { q: "Why white fumes with NH₄OH in the anion test?", a: "HCl + NH₃ → NH₄Cl smoke." },
      { q: "Why chromyl chloride?", a: "Second confirmatory for chloride." },
      { q: "Why not Nessler?", a: "Cation is Zn²⁺." },
    ],
    precautions: commonPrecautions,
  },
  {
    cation: "NH₄⁺",
    anion: "C₂O₄²⁻",
    prelims: [
      row("Physical examination", "White solid; ammoniacal smell", "Ammonium salt"),
      row("Solubility", "Soluble in water", "Ammonium oxalate is soluble"),
      row("Dry heating", "NH₃ evolved; residue may char slightly; CO / CO₂ on stronger heating with acid later", "Ammonium + oxalate"),
      row("Dilute H₂SO₄", "No brisk CO₂ like carbonate", "Not carbonate"),
      row("Conc. H₂SO₄", "CO + CO₂; CO burns with a blue flame", "Oxalate indicated"),
      row("Flame test", "No characteristic colour", "Not Ba / Ca / Sr"),
    ],
    anionTests: oxalateAnion,
    cationTests: ammoniumCation,
    anionEquations: [
      "C₂O₄²⁻ + 2H⁺ + conc. H₂SO₄ → CO ↑ + CO₂ ↑ + H₂O",
      "Ca²⁺ + C₂O₄²⁻ → CaC₂O₄ ↓",
      "2MnO₄⁻ + 5C₂O₄²⁻ + 16H⁺ → 2Mn²⁺ + 10CO₂ + 8H₂O",
    ],
    cationEquations: ammoniumEq,
    related: [
      { cation: "NH₄⁺", anion: "Cl⁻" },
      { cation: "NH₄⁺", anion: "CO₃²⁻" },
      { cation: "Ca²⁺", anion: "CO₃²⁻" },
    ],
    faqs: [
      { q: "School experiment 10?", a: "Ammonium oxalate: CaCl₂ white ppt of oxalate + Nessler for NH₄⁺." },
      { q: "Why KMnO₄ decolourises?", a: "Oxalate reduces permanganate in warm dilute H₂SO₄." },
      { q: "Group 0 then stop?", a: "Yes." },
    ],
    viva: [
      { q: "Why blue flame at the mouth with conc. H₂SO₄?", a: "CO burns with a blue flame; CO₂ does not burn." },
      { q: "Why CaCl₂ in acetic acid?", a: "Calcium oxalate is insoluble in acetic acid; calcium phosphate / carbonate would not survive acetic acid the same way." },
      { q: "Why warm KMnO₄?", a: "The redox reaction is slow in the cold; it is autocatalysed by Mn²⁺ on warming." },
      { q: "Why Nessler?", a: "Ammonium cation." },
      { q: "Why not lime water as the main anion test?", a: "CO₂ from oxalate + conc. H₂SO₄ is mixed with CO; dilute acid does not give brisk carbonate-like CO₂." },
      { q: "Why Group 0 first?", a: "Always, for any ammonium salt." },
      { q: "Difference from ammonium carbonate?", a: "Carbonate: dilute acid, lime water. Oxalate: conc. H₂SO₄, CaCl₂, KMnO₄." },
      { q: "Why is the salt used as a Group V reagent?", a: "(NH₄)₂C₂O₄ ppts Ca²⁺ as oxalate — here it is the unknown itself." },
    ],
    precautions: commonPrecautions,
  },
  {
    cation: "Ba²⁺",
    anion: "Br⁻",
    prelims: [
      row("Physical examination", "White solid; odourless", "Not copper / ammonium"),
      row("Solubility", "Soluble in water", "Soluble barium halide"),
      row("Flame test", "Apple-green flame", "Ba²⁺"),
      row("Dilute H₂SO₄", "No CO₂; BaSO₄ may ppt", "Not carbonate"),
      row("Conc. H₂SO₄", "Reddish-brown vapours of Br₂", "Br⁻ may be present"),
      row("Dry heating", "No brown NO₂ of nitrate", "Not Ba(NO₃)₂"),
    ],
    anionTests: bromideAnion,
    cationTests: bariumCation,
    anionEquations: [
      "2Br⁻ + 2H₂SO₄ (conc.) → Br₂ ↑ + SO₂ + 2H₂O + SO₄²⁻",
      "Ag⁺ + Br⁻ → AgBr ↓ (pale yellow)",
    ],
    cationEquations: [
      "Ba²⁺ + CrO₄²⁻ → BaCrO₄ ↓",
    ],
    related: [
      { cation: "Ba²⁺", anion: "Cl⁻" },
      { cation: "Ba²⁺", anion: "NO₃⁻" },
      { cation: "Zn²⁺", anion: "Cl⁻" },
    ],
    faqs: [
      { q: "Why reddish-brown fumes?", a: "Conc. H₂SO₄ liberates Br₂ from bromides. Chlorides give colourless HCl; iodides give violet I₂." },
      { q: "School file salt?", a: "BaBr₂ is commonly assigned even if it is rare on Google." },
      { q: "Flame + halide?", a: "Apple-green barium, pale-yellow AgBr." },
    ],
    viva: [
      { q: "Why reddish-brown vapours?", a: "Bromine." },
      { q: "Why layer test?", a: "Br₂ is more soluble in CCl₄ / CHCl₃ and colours the organic layer orange-brown." },
      { q: "AgBr vs AgCl vs AgI?", a: "AgCl white, AgBr pale yellow, AgI yellow. AgCl readily soluble in NH₄OH; AgBr sparingly; AgI insoluble." },
      { q: "Why apple-green?", a: "Barium flame." },
      { q: "Why K₂CrO₄?", a: "Group V confirmatory for Ba²⁺." },
      { q: "Why not chromyl chloride?", a: "That test is for chlorides, not bromides." },
      { q: "Why not brown ring?", a: "Anion is bromide, not nitrate." },
      { q: "Formula Ba(Br)₂?", a: "No — BaBr₂." },
    ],
    precautions: commonPrecautions,
  },
];

export const WRITEUPS_BY_ID: Record<string, SaltWriteup> = Object.fromEntries(
  WRITEUP_LIST.map(({ cation, anion, ...writeup }) => [
    formulaToUrl(cation, anion),
    writeup,
  ])
);

export const getWriteup = (
  cationFormula: string,
  anionFormula: string
): SaltWriteup | undefined =>
  WRITEUPS_BY_ID[formulaToUrl(cationFormula, anionFormula)];
