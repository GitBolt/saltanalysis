import { useEffect, useMemo, useState } from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/Combine.module.css";
import Link from "next/link";
import { calculateSaltFormula } from "@/utils/formula";
import { Ion } from "@/types/ions";
import IonList from "@/components/IonList";
import SaltResult from "@/components/SaltResult";
import { searchSalts } from "@/utils/searchSalts";
import { trackEvent } from "@/utils/mixpanel";

export default function Combine() {
  const [anions, setAnions] = useState<Ion[]>([]);
  const [cations, setCations] = useState<Ion[]>([]);
  const [selectedAnion, setSelectedAnion] = useState<Ion | null>(null);
  const [selectedCation, setSelectedCation] = useState<Ion | null>(null);
  const [salt, setSalt] = useState<string | null>(null);
  const [anionSearch, setAnionSearch] = useState("");
  const [cationSearch, setCationSearch] = useState("");
  const [saltSearch, setSaltSearch] = useState("");

  useEffect(() => {
    fetch("/anions.json")
      .then((response) => response.json())
      .then((data) => setAnions(data));
    fetch("/cations.json")
      .then((response) => response.json())
      .then((data) => setCations(data));
  }, []);

  const handleCombine = (ion: Ion, isAnion: boolean) => {
    trackEvent("Ion Selected", {
      ion_type: isAnion ? "anion" : "cation",
      ion_name: ion.name,
      formula: ion.formula,
      category: ion.category,
      search_active: Boolean(isAnion ? anionSearch : cationSearch),
    });

    if (isAnion) {
      setSelectedAnion(ion);
      if (selectedCation) {
        const saltFormula = calculateSaltFormula(selectedCation, ion);
        setSalt(saltFormula);
        trackEvent("Salt Created", {
          cation: selectedCation.formula,
          anion: ion.formula,
          formula: saltFormula,
        });
      }
    } else {
      setSelectedCation(ion);
      if (selectedAnion) {
        const saltFormula = calculateSaltFormula(ion, selectedAnion);
        setSalt(saltFormula);
        trackEvent("Salt Created", {
          cation: ion.formula,
          anion: selectedAnion.formula,
          formula: saltFormula,
        });
      }
    }
  };

  const saltHits = useMemo(
    () => searchSalts(saltSearch, cations, anions),
    [saltSearch, cations, anions]
  );

  const filteredAnions = anions.filter(
    (ion) =>
      ion.name.toLowerCase().includes(anionSearch.toLowerCase()) ||
      ion.formula.toLowerCase().includes(anionSearch.toLowerCase())
  );

  const filteredCations = cations.filter(
    (ion) =>
      ion.name.toLowerCase().includes(cationSearch.toLowerCase()) ||
      ion.formula.toLowerCase().includes(cationSearch.toLowerCase())
  );

  return (
    <Layout
      title="Create a Salt and View Its Analysis | Salt Analysis"
      description="Search by salt name (lead acetate, NH4Cl) or pick a cation and anion to open the CBSE chemistry practical writeup."
      canonicalUrl="https://saltanalysis.com/lab"
      keywords="create salt, lead acetate, ammonium chloride, cation anion combination, salt analysis practical, CBSE chemistry practical"
    >
      <div className={styles.labContainer}>
        <h1 className={styles.title}>Create Salt To View Analysis</h1>
        <p className={styles.subtitle}>
          Search by salt name, or click a cation and an anion.
        </p>
        <label className={styles.saltSearchLabel} htmlFor="salt-search">
          Search by salt name
        </label>
        <input
          id="salt-search"
          type="search"
          value={saltSearch}
          onChange={(event) => setSaltSearch(event.target.value)}
          placeholder="lead acetate, NH4Cl, alum, copper sulphate…"
          className={styles.saltSearchInput}
        />
        {saltHits.length > 0 && (
          <ul className={styles.saltHits}>
            {saltHits.map((hit) => (
              <li key={hit.id}>
                <Link
                  href={hit.url}
                  onClick={() =>
                    trackEvent("Salt Selected", {
                      source: "lab_salt_search",
                      formula: hit.formula,
                      salt_name: hit.name,
                    })
                  }
                >
                  {hit.name} ({hit.formula})
                </Link>
              </li>
            ))}
          </ul>
        )}
        <div className={styles.ionListsContainer}>
          <IonList
            title="Cations"
            ions={filteredCations}
            selectedIon={selectedCation}
            onIonSelect={(ion) => handleCombine(ion, false)}
            searchValue={cationSearch}
            onSearchChange={(e) => setCationSearch(e.target.value)}
            className={styles.ionListColumn}
          />
          <div className={styles.centerColumn}>
            <SaltResult
              selectedCation={selectedCation}
              selectedAnion={selectedAnion}
              salt={salt}
            />
          </div>
          <IonList
            title="Anions"
            ions={filteredAnions}
            selectedIon={selectedAnion}
            onIonSelect={(ion) => handleCombine(ion, true)}
            searchValue={anionSearch}
            onSearchChange={(e) => setAnionSearch(e.target.value)}
            className={styles.ionListColumn}
          />
        </div>
      </div>
    </Layout>
  );
}
