import { removeCharge } from "@/utils/formula";

const SUBSCRIPT_TO_ASCII: Record<string, string> = {
  "₀": "_0",
  "₁": "_1",
  "₂": "_2",
  "₃": "_3",
  "₄": "_4",
  "₅": "_5",
  "₆": "_6",
  "₇": "_7",
  "₈": "_8",
  "₉": "_9",
};

const ASCII_TO_SUBSCRIPT: Record<string, string> = {
  _0: "₀",
  _1: "₁",
  _2: "₂",
  _3: "₃",
  _4: "₄",
  _5: "₅",
  _6: "₆",
  _7: "₇",
  _8: "₈",
  _9: "₉",
};

export const normalizeSaltId = (raw: string): string => {
  let value = raw;
  try {
    value = decodeURIComponent(value);
  } catch {
    // already decoded
  }
  return value.replace(/[⁺⁻¹²³]/g, "");
};

export const formulaToUrl = (cation: string, anion: string): string => {
  const encodeFormula = (formula: string): string =>
    removeCharge(formula)
      .replace(/[₀₁₂₃₄₅₆₇₈₉]/g, (match) => SUBSCRIPT_TO_ASCII[match])
      .replace(/\[/g, "(")
      .replace(/\]/g, ")");

  return `${encodeFormula(cation)}|${encodeFormula(anion)}`.toLowerCase();
};

export const urlToFormula = (
  urlSafeFormula: string
): { cation: string; anion: string } => {
  const decodeSingleFormula = (formula: string): string => {
    let decoded = normalizeSaltId(formula)
      .replace(/_([0-9])/g, (_match, p1) => ASCII_TO_SUBSCRIPT[`_${p1}`])
      .toLowerCase();

    const twoLetterSymbols: Record<string, string> = {
      nh: "NH",
      mg: "Mg",
      ba: "Ba",
      zn: "Zn",
      al: "Al",
      fe: "Fe",
      cu: "Cu",
      pb: "Pb",
      sr: "Sr",
      na: "Na",
      cl: "Cl",
      br: "Br",
      so: "SO",
      no: "NO",
      co: "CO",
      po: "PO",
      oh: "OH",
      ch: "CH",
    };

    Object.entries(twoLetterSymbols).forEach(([lower, proper]) => {
      decoded = decoded.replace(new RegExp(lower, "g"), proper);
    });

    const singleLetterSymbols: Record<string, string> = {
      a: "A",
      b: "B",
      c: "C",
      f: "F",
      h: "H",
      i: "I",
      k: "K",
      n: "N",
      o: "O",
      p: "P",
      s: "S",
    };

    decoded = decoded.replace(
      /[a-z]/g,
      (match) => singleLetterSymbols[match] || match
    );

    return decoded;
  };

  const [cation, anion] = normalizeSaltId(urlSafeFormula).split("|");
  return {
    cation: decodeSingleFormula(cation || ""),
    anion: decodeSingleFormula(anion || ""),
  };
};

export const saltAnalysisPath = (cation: string, anion: string): string =>
  `/salt/${formulaToUrl(cation, anion)}/analysis`;
