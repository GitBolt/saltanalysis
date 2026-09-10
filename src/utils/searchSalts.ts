import { Ion } from "@/types/ions";
import { calculateSaltFormula } from "@/utils/formula";
import { formulaToUrl } from "@/utils/encoders";
import { FEATURED_SALTS, featuredId, type FeaturedSalt } from "@/data/featured";

const SUBSCRIPT_DIGITS: Record<string, string> = {
  "₀": "0",
  "₁": "1",
  "₂": "2",
  "₃": "3",
  "₄": "4",
  "₅": "5",
  "₆": "6",
  "₇": "7",
  "₈": "8",
  "₉": "9",
};

export const normalizeChemText = (value: string): string =>
  value
    .replace(/[₀₁₂₃₄₅₆₇₈₉]/g, (match) => SUBSCRIPT_DIGITS[match] || match)
    .replace(/[⁺⁻¹²³]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");

export type SaltSearchHit = {
  id: string;
  name: string;
  formula: string;
  url: string;
  cation: Ion;
  anion: Ion;
};

const featuredById = (): Record<string, FeaturedSalt> => {
  const map: Record<string, FeaturedSalt> = {};
  FEATURED_SALTS.forEach((salt) => {
    map[featuredId(salt)] = salt;
  });
  return map;
};

export const searchSalts = (
  query: string,
  cations: Ion[],
  anions: Ion[],
  limit = 8
): SaltSearchHit[] => {
  const trimmed = query.trim().toLowerCase();
  if (trimmed.length < 2) return [];

  const qNorm = normalizeChemText(query);
  const featured = featuredById();
  const hits: SaltSearchHit[] = [];

  for (const cation of cations) {
    for (const anion of anions) {
      const id = formulaToUrl(cation.formula, anion.formula);
      const featuredSalt = featured[id];
      const formula = calculateSaltFormula(cation, anion);
      const name = featuredSalt?.commonName ?? `${cation.name} ${anion.name}`;
      const aliases = featuredSalt?.aliases ?? [];
      const haystack = [name, formula, cation.name, anion.name, ...aliases]
        .join(" ")
        .toLowerCase();
      const compact = normalizeChemText(
        `${name} ${formula} ${aliases.join(" ")} ${cation.formula} ${anion.formula}`
      );

      if (haystack.includes(trimmed) || (qNorm && compact.includes(qNorm))) {
        hits.push({
          id,
          name,
          formula,
          url: `/salt/${id}/analysis`,
          cation,
          anion,
        });
        if (hits.length >= limit) return hits;
      }
    }
  }

  return hits;
};
