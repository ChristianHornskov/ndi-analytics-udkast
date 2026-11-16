/* Nøgletal for Cerebras. Regnskabstal fra prospektet og 10-Q hos SEC (Total revenue og Net income (loss)). 12 mdr. = 2025 + 9 mdr. 2026 - 9 mdr. 2025.
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["cerebras-systems"]={
 "skema": 2,
 "navn": "Cerebras",
 "ticker": "CBRS",
 "valuta": "USD",
 "aar": [
  {
   "aar": 2022,
   "til": "2022-12-31",
   "omsaetning": 24.619,
   "resultat": -177.719,
   "kilde": "S-1 2024"
  },
  {
   "aar": 2023,
   "til": "2023-12-31",
   "omsaetning": 78.744,
   "resultat": -127.155,
   "kilde": "S-1 2024"
  },
  {
   "aar": 2024,
   "til": "2024-12-31",
   "omsaetning": 290.252,
   "resultat": -481.602,
   "kilde": "Prospekt 2026"
  },
  {
   "aar": 2025,
   "til": "2025-12-31",
   "omsaetning": 509.991,
   "resultat": 237.827,
   "kilde": "Prospekt 2026"
  }
 ],
 "ttm": {
  "til": "2026-09-30",
  "omsaetning": 755.767,
  "resultat": -651.369,
  "kilde": "Prospekt 2026 + 10-Q 3. kvt. 2026"
 },
 "kvartal": {
  "til": "2026-09-30",
  "omsaetning": 210.809,
  "sammeKvartalAaretFoer": 135.714,
  "kilde": "10-Q 3. kvt. 2026"
 },
 "aktie": {
  "aktier": 243003364,
  "aktierDato": "2026-11-05",
  "kilde": "10-Q 3. kvt. 2026, forsiden (klasse A, B og N)"
 },
 "hentet": "2026-11-14",
 "kilde": "Cerebras’ regnskaber hos SEC",
 "kildeUrl": "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0002021728"
};
