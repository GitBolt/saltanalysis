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
  }
  

export interface Test {
  name?: string;
  experiment: string;
  observation: string;
  inference: string;
  confirmatory?: boolean;
}