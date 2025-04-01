import fs from 'fs';
import path from 'path';
import { Ion } from '@/types/ions';
import { formulaToUrl } from '@/utils/encoders';

// Function to read JSON file
const readJsonFile = (filename: string): any => {
  const filePath = path.join(process.cwd(), 'public', filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
};

// Get all salts
export const getAllSalts = () => {
  const anions = readJsonFile('anions.json') as Ion[];
  const cations = readJsonFile('cations.json') as Ion[];
  
  const salts = cations.flatMap(cation => 
    anions.map(anion => ({
      id: formulaToUrl(cation.formula, anion.formula),
      cation,
      anion,
      formula: `${cation.formula}${anion.formula}`,
      name: `${cation.name} ${anion.name}`,
      description: `Analysis of ${cation.name} ${anion.name} (${cation.formula}${anion.formula})`,
      category: {
        cation: cation.category || 'Uncategorized',
        anion: anion.category || 'Uncategorized'
      }
    }))
  );

  return salts;
};

// Get salt by ID
export const getSaltById = (id: string) => {
  const salts = getAllSalts();
  return salts.find(salt => salt.id === id);
};

// Get salts by category
export const getSaltsByCategory = (category: string, type: 'cation' | 'anion') => {
  const salts = getAllSalts();
  return salts.filter(salt => salt.category[type] === category);
};

// Get all categories
export const getAllCategories = () => {
  const anions = readJsonFile('anions.json') as Ion[];
  const cations = readJsonFile('cations.json') as Ion[];
  
  return {
    cations: Array.from(new Set(cations.map(c => c.category || 'Uncategorized'))),
    anions: Array.from(new Set(anions.map(a => a.category || 'Uncategorized')))
  };
}; 