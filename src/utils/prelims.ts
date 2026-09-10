import { Ion } from "@/types/ions";
import { removeCharge } from "@/utils/formula";

const COLOURED_CATIONS: Record<string, string> = {
  Cu: "Blue",
  Fe: "Pale green",
  Ni: "Green",
  Co: "Pink",
  Mn: "Pale pink",
};

const Fe3 = "Fe³⁺";

export const getSaltColour = (cation: Ion, anion: Ion): string => {
  if (cation.formula === Fe3) return "Yellowish-brown";
  const colour = COLOURED_CATIONS[removeCharge(cation.formula)];
  if (colour) return colour;
  return anion.color && anion.color !== "White" ? anion.color : "White";
};

export const getSaltOdour = (cation: Ion, anion: Ion): string => {
  if (removeCharge(cation.formula) === "NH₄") return "Ammoniacal";
  if (removeCharge(anion.formula) === "CH₃COO") return "Vinegar-like";
  if (removeCharge(anion.formula) === "S") return "Rotten eggs";
  return "Odourless";
};

export const getSaltTexture = (): string => "Crystalline solid";

export const getSaltSolubility = (cation: Ion, anion: Ion): string => {
  const c = removeCharge(cation.formula);
  const a = removeCharge(anion.formula);
  const alkali = c === "Na" || c === "K" || c === "NH₄";

  if (a === "NO₃" || a === "CH₃COO") return "Soluble in water";

  if (a === "SO₄") {
    if (c === "Ba" || c === "Sr" || c === "Pb") return "Insoluble in water";
    if (c === "Ca") return "Sparingly soluble in water";
    return "Soluble in water";
  }

  if (a === "Cl" || a === "Br" || a === "I") {
    if (c === "Pb") return "Sparingly soluble in cold water; soluble in hot water";
    return "Soluble in water";
  }

  if (a === "CO₃" || a === "PO₄" || a === "SO₃" || a === "C₂O₄") {
    return alkali ? "Soluble in water" : "Insoluble in water";
  }

  if (a === "S") return alkali ? "Soluble in water" : "Insoluble in water";

  if (a === "OH") {
    if (alkali || c === "Ba" || c === "Sr") return "Soluble in water";
    if (c === "Ca") return "Sparingly soluble in water";
    return "Insoluble in water";
  }

  return "Soluble in water";
};

export const getSaltPrelims = (cation: Ion, anion: Ion) => ({
  color: getSaltColour(cation, anion),
  odor: getSaltOdour(cation, anion),
  texture: getSaltTexture(),
  solubility: getSaltSolubility(cation, anion),
});
