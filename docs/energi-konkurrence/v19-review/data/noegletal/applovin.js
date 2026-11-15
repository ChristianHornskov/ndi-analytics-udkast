/* Nøgletal for AppLovin. Regnskabstal fra 10-K og 10-Q hos SEC (Revenue og Net income). Omsætningen er kun annonceforretningen, fordi spilforretningen blev solgt i 2025. 2022 er ikke med, fordi arkivet kun har tal, der er omregnet uden spilforretningen fra 2023. 12 mdr. = 2025 + 9 mdr. 2026 - 9 mdr. 2025.
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["applovin"]={
 "skema": 2,
 "navn": "AppLovin",
 "ticker": "APP",
 "valuta": "USD",
 "aar": [
  {
   "aar": 2023,
   "til": "2023-12-31",
   "omsaetning": 1841.762,
   "resultat": 356.711,
   "kilde": "10-K 2025"
  },
  {
   "aar": 2024,
   "til": "2024-12-31",
   "omsaetning": 3224.058,
   "resultat": 1579.776,
   "kilde": "10-K 2025"
  },
  {
   "aar": 2025,
   "til": "2025-12-31",
   "omsaetning": 5480.717,
   "resultat": 3333.751,
   "kilde": "10-K 2025"
  }
 ],
 "ttm": {
  "til": "2026-09-30",
  "omsaetning": 7608.894,
  "resultat": 5013.309,
  "kilde": "10-K 2025 + 10-Q 3. kvt. 2026"
 },
 "kvartal": {
  "til": "2026-09-30",
  "omsaetning": 2184.815,
  "sammeKvartalAaretFoer": 1405.045,
  "kilde": "10-Q 3. kvt. 2026"
 },
 "aktie": {
  "aktier": 331322000,
  "aktierDato": "2026-10-31",
  "kilde": "10-Q 3. kvt. 2026, forsiden (klasse A og B, i tusinder i kilden)"
 },
 "hentet": "2026-11-14",
 "kilde": "AppLovins regnskaber hos SEC",
 "kildeUrl": "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001751008"
};
