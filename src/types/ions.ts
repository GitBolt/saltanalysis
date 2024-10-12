export interface Ion {
    id: number;
    name: string;
    formula: string;
    charge: number;
    tests: Test[];
  }
  

export interface Test {
  name?: string;
  experiment: string;
  observation: string;
  inference: string;
  confirmatory?: boolean;
}