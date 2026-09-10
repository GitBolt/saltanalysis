export interface Ion {
    id: number;
    name: string;
    formula: string;
    charge: number;
    tests: Test[];
    texture?: string;
    odor?: string;
    color?: string;
    solubility?: string;
    category: string;
  }
  

export interface Test {
  name?: string;
  experiment: string;
  observation: string;
  inference: string;
  confirmatory?: boolean;
}

export interface VivaItem {
  q: string;
  a: string;
}

export interface SaltWriteup {
  prelims: Test[];
  anionTests: Test[];
  cationTests: Test[];
  anionEquations: string[];
  cationEquations: string[];
  viva: VivaItem[];
  faqs: VivaItem[];
  related: Array<{ cation: string; anion: string }>;
  hindi?: {
    title: string;
    paragraphs: string[];
  };
  precautions?: string[];
}