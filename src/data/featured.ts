import { formulaToUrl } from "@/utils/encoders";

export type FeaturedSalt = {
  cation: string;
  anion: string;
  commonName: string;
  aliases: string[];
};

export const FEATURED_SALTS: FeaturedSalt[] = [
  {
    cation: "NH₄⁺",
    anion: "Cl⁻",
    commonName: "Ammonium Chloride",
    aliases: ["nh4cl", "sal ammoniac", "ammonium chloride"],
  },
  {
    cation: "Pb²⁺",
    anion: "CH₃COO⁻",
    commonName: "Lead Acetate",
    aliases: ["lead acetate", "sugar of lead", "lead ethanoate"],
  },
  {
    cation: "NH₄⁺",
    anion: "CO₃²⁻",
    commonName: "Ammonium Carbonate",
    aliases: ["ammonium carbonate", "baker's ammonia"],
  },
  {
    cation: "NH₄⁺",
    anion: "SO₄²⁻",
    commonName: "Ammonium Sulphate",
    aliases: ["ammonium sulfate", "ammonium sulphate"],
  },
  {
    cation: "Al³⁺",
    anion: "SO₄²⁻",
    commonName: "Aluminium Sulphate",
    aliases: ["alum", "aluminum sulphate", "aluminium sulfate", "al2(so4)3"],
  },
  {
    cation: "Pb²⁺",
    anion: "NO₃⁻",
    commonName: "Lead Nitrate",
    aliases: ["lead nitrate", "lead(ii) nitrate"],
  },
  {
    cation: "Zn²⁺",
    anion: "SO₄²⁻",
    commonName: "Zinc Sulphate",
    aliases: ["zinc sulfate", "white vitriol", "zinc sulphate"],
  },
  {
    cation: "Ba²⁺",
    anion: "Cl⁻",
    commonName: "Barium Chloride",
    aliases: ["barium chloride", "bacl2"],
  },
  {
    cation: "Al³⁺",
    anion: "NO₃⁻",
    commonName: "Aluminium Nitrate",
    aliases: ["aluminum nitrate", "aluminium nitrate"],
  },
  {
    cation: "Cu²⁺",
    anion: "SO₄²⁻",
    commonName: "Copper Sulphate",
    aliases: ["copper sulfate", "blue vitriol", "cupric sulphate", "cuso4"],
  },
  {
    cation: "Mg²⁺",
    anion: "SO₄²⁻",
    commonName: "Magnesium Sulphate",
    aliases: ["epsom salt", "epsom", "magnesium sulfate"],
  },
  {
    cation: "Pb²⁺",
    anion: "Cl⁻",
    commonName: "Lead Chloride",
    aliases: ["lead chloride", "pbcl2"],
  },
  {
    cation: "Sr²⁺",
    anion: "Cl⁻",
    commonName: "Strontium Chloride",
    aliases: ["strontium chloride"],
  },
  {
    cation: "Ba²⁺",
    anion: "NO₃⁻",
    commonName: "Barium Nitrate",
    aliases: ["barium nitrate"],
  },
  {
    cation: "Ca²⁺",
    anion: "CO₃²⁻",
    commonName: "Calcium Carbonate",
    aliases: ["chalk", "limestone", "marble", "calcium carbonate"],
  },
  {
    cation: "Zn²⁺",
    anion: "Cl⁻",
    commonName: "Zinc Chloride",
    aliases: ["zinc chloride", "zncl2"],
  },
  {
    cation: "NH₄⁺",
    anion: "C₂O₄²⁻",
    commonName: "Ammonium Oxalate",
    aliases: ["ammonium oxalate"],
  },
  {
    cation: "Ba²⁺",
    anion: "Br⁻",
    commonName: "Barium Bromide",
    aliases: ["barium bromide"],
  },
];

export const HOMEPAGE_SALT_COUNT = 12;

export const featuredId = (salt: Pick<FeaturedSalt, "cation" | "anion">): string =>
  formulaToUrl(salt.cation, salt.anion);

export const getFeaturedSalt = (cation: string, anion: string): FeaturedSalt | undefined =>
  FEATURED_SALTS.find(
    (salt) => salt.cation === cation && salt.anion === anion
  );
