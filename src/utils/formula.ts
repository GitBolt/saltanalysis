import { Ion } from "@/types/ions";

export const removeCharge = (formula: string): string => {
  return formula.replace(/[²³¹]?[⁺⁻]/g, "");
};

export const isPolyatomic = (formulaWithoutCharge: string): boolean => {
  return !/^[A-Z][a-z]?$/.test(formulaWithoutCharge);
};

export const subscriptNumber = (num: number): string => {
  const subscripts = ["₀", "₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉"];
  return num
    .toString()
    .split("")
    .map((digit) => subscripts[parseInt(digit, 10)])
    .join("");
};

const wrapIon = (formula: string, subscript: number): string => {
  if (subscript <= 1) return formula;
  if (isPolyatomic(formula)) {
    return `(${formula})${subscriptNumber(subscript)}`;
  }
  return `${formula}${subscriptNumber(subscript)}`;
};

export const calculateSaltFormula = (cation: Ion, anion: Ion): string => {
  const cationCharge = Math.abs(cation.charge);
  const anionCharge = Math.abs(anion.charge);
  const lcm = getLCM(cationCharge, anionCharge);
  const cationSubscript = lcm / cationCharge;
  const anionSubscript = lcm / anionCharge;

  const cationFormula = removeCharge(cation.formula);
  const anionFormula = removeCharge(anion.formula);

  return `${wrapIon(cationFormula, cationSubscript)}${wrapIon(anionFormula, anionSubscript)}`;
};

export const getLCM = (a: number, b: number): number => {
  return (a * b) / getGCD(a, b);
};

export const getGCD = (a: number, b: number): number => {
  return b === 0 ? a : getGCD(b, a % b);
};
