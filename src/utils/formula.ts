import { Ion } from "@/types/ions";

export const calculateSaltFormula = (cation: Ion, anion: Ion): string => {
    const cationCharge = Math.abs(cation.charge);
    const anionCharge = Math.abs(anion.charge);
    const lcm = getLCM(cationCharge, anionCharge);
    const cationSubscript = lcm / cationCharge;
    const anionSubscript = lcm / anionCharge;

    const cationFormula = removeCharge(cation.formula);
    const anionFormula = removeCharge(anion.formula);

    const cationPart = cationSubscript > 1 ? `(${cationFormula})${subscriptNumber(cationSubscript)}` : cationFormula;
    const anionPart = anionSubscript > 1 ? `(${anionFormula})${subscriptNumber(anionSubscript)}` : anionFormula;

    return `${cationPart}${anionPart}`;
  };

export const removeCharge = (formula: string): string => {
    return formula.replace(/[⁺⁻]|[²³]?[⁺⁻]/, '');
  };

export const subscriptNumber = (num: number): string => {
    const subscripts = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];
    return num.toString().split('').map(digit => subscripts[parseInt(digit)]).join('');
  };

export const getLCM = (a: number, b: number): number => {
    return (a * b) / getGCD(a, b);
  };

export const getGCD = (a: number, b: number): number => {
    return b === 0 ? a : getGCD(b, a % b);
  };