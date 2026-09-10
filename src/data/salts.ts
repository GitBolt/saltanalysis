import fs from "fs";
import path from "path";
import { Ion } from "@/types/ions";
import { formulaToUrl, normalizeSaltId } from "@/utils/encoders";
import { calculateSaltFormula } from "@/utils/formula";
import {
  FEATURED_SALTS,
  HOMEPAGE_SALT_COUNT,
  featuredId,
  getFeaturedSalt,
} from "@/data/featured";
import { getWriteup } from "@/data/writeups";

const readJsonFile = (filename: string): Ion[] => {
  const filePath = path.join(process.cwd(), "public", filename);
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
};

export type SaltSummary = {
  id: string;
  cation: Ion;
  anion: Ion;
  formula: string;
  name: string;
  description: string;
  category: {
    cation: string;
    anion: string;
  };
};

const buildSalt = (cation: Ion, anion: Ion): SaltSummary => {
  const formula = calculateSaltFormula(cation, anion);
  const featured = getFeaturedSalt(cation.formula, anion.formula);
  const name = featured?.commonName ?? `${cation.name} ${anion.name}`;
  return {
    id: formulaToUrl(cation.formula, anion.formula),
    cation,
    anion,
    formula,
    name,
    description: `Qualitative salt analysis of ${name} (${formula}) for CBSE / ISC Class 12 chemistry practicals, including preliminary, cation, anion and confirmatory tests.`,
    category: {
      cation: cation.category || "Uncategorized",
      anion: anion.category || "Uncategorized",
    },
  };
};

export const getAllSalts = (): SaltSummary[] => {
  const anions = readJsonFile("anions.json");
  const cations = readJsonFile("cations.json");

  return cations.flatMap((cation) => anions.map((anion) => buildSalt(cation, anion)));
};

export const getSaltById = (id: string): SaltSummary | undefined => {
  const salts = getAllSalts();
  const normalized = normalizeSaltId(id);
  return salts.find((salt) => salt.id === normalized || salt.id === id);
};

export const getSaltsByCategory = (category: string, type: "cation" | "anion") => {
  const salts = getAllSalts();
  return salts.filter((salt) => salt.category[type] === category);
};

export const getAllCategories = () => {
  const anions = readJsonFile("anions.json");
  const cations = readJsonFile("cations.json");

  return {
    cations: Array.from(new Set(cations.map((c) => c.category || "Uncategorized"))),
    anions: Array.from(new Set(anions.map((a) => a.category || "Uncategorized"))),
  };
};

export const getFeaturedSaltPages = (): SaltSummary[] => {
  const salts = getAllSalts();
  const byId = new Map(salts.map((salt) => [salt.id, salt]));
  const pages = FEATURED_SALTS.map((spec) => byId.get(featuredId(spec))).filter(
    (salt): salt is SaltSummary => Boolean(salt)
  );
  if (pages.length !== FEATURED_SALTS.length) {
    const missing = FEATURED_SALTS.filter((spec) => !byId.get(featuredId(spec)))
      .map((spec) => `${spec.commonName} (${featuredId(spec)})`)
      .join(", ");
    throw new Error(`Featured salts missing from generator: ${missing}`);
  }
  return pages;
};

export const getHomepageSalts = (): SaltSummary[] =>
  getFeaturedSaltPages().slice(0, HOMEPAGE_SALT_COUNT);

export const getRelatedSaltPages = (cation: Ion, anion: Ion): SaltSummary[] => {
  const writeup = getWriteup(cation.formula, anion.formula);
  const salts = getAllSalts();
  const byId = new Map(salts.map((salt) => [salt.id, salt]));

  if (writeup) {
    return writeup.related
      .map((item) => byId.get(formulaToUrl(item.cation, item.anion)))
      .filter((salt): salt is SaltSummary => Boolean(salt));
  }

  return getFeaturedSaltPages()
    .filter(
      (salt) =>
        salt.cation.formula === cation.formula || salt.anion.formula === anion.formula
    )
    .filter((salt) => salt.id !== formulaToUrl(cation.formula, anion.formula))
    .slice(0, 3);
};
