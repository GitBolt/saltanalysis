export const formulaToUrl = (cation: string, anion: string): string => {
    const subscripts: Record<string, string> = {
        '₀': '_0', '₁': '_1', '₂': '_2', '₃': '_3',
        '₄': '_4', '₅': '_5', '₆': '_6', '₇': '_7',
        '₈': '_8', '₉': '_9'
    };

    const encodeFormula = (formula: string): string =>
        formula
            .replace(/[₀₁₂₃₄₅₆₇₈₉]/g, (match) => subscripts[match]) // Encode subscripts
            .replace(/\[/g, '(')  // Replace [ with (
            .replace(/\]/g, ')')  // Replace ] with )
            .replace(/\+/g, '%2B') // Encode plus sign
            .replace(/\-/g, '%2D'); // Encode minus sign

    return `${encodeFormula(cation)}|${encodeFormula(anion)}`.toLowerCase(); // Join with a pipe and lowercase
};


export const urlToFormula = (urlSafeFormula: string): { cation: string, anion: string } => {
    const subscripts: Record<string, string> = {
        '_0': '₀', '_1': '₁', '_2': '₂', '_3': '₃',
        '_4': '₄', '_5': '₅', '_6': '₆', '_7': '₇',
        '_8': '₈', '_9': '₉'
    };

    const decodeSingleFormula = (formula: string): string => {
        let decoded = formula
            .replace(/\(/g, '(')
            .replace(/\)/g, ')')
            .replace(/_([0-9])/g, (match, p1) => subscripts[`_${p1}`])
            .replace(/%2B/g, '+')
            .replace(/%2D/g, '-')
            .toLowerCase();

        // Formula URLs used to be lower-cased. Restore chemical symbol casing
        // so older links such as `ca_2|co_3` still resolve correctly.
        const twoLetterSymbols: Record<string, string> = {
          nh: 'NH', mg: 'Mg', ba: 'Ba', zn: 'Zn', al: 'Al', fe: 'Fe',
          cu: 'Cu', pb: 'Pb', sr: 'Sr', na: 'Na', cl: 'Cl', br: 'Br',
          so: 'SO', no: 'NO', co: 'CO', po: 'PO', oh: 'OH', ch: 'CH'
        };

        Object.entries(twoLetterSymbols).forEach(([lower, proper]) => {
          decoded = decoded.replace(new RegExp(lower, 'g'), proper);
        });

        const singleLetterSymbols: Record<string, string> = {
          a: 'A', b: 'B', c: 'C', f: 'F', h: 'H', i: 'I', k: 'K',
          n: 'N', o: 'O', p: 'P', s: 'S',
        };

        decoded = decoded.replace(/[a-z]/g, (match) => singleLetterSymbols[match] || match);

      return decoded;
    };

    const [cation, anion] = urlSafeFormula.split('|');
    return {
        cation: decodeSingleFormula(cation),
        anion: decodeSingleFormula(anion)
    };
};
