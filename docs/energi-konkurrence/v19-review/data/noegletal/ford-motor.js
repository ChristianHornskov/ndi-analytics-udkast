/* Nøgletal for Ford. Regnskabstal fra 10-K og 10-Q (Total revenues og Net income/(loss) attributable to Ford Motor Company). 12 mdr. = 2025 + 9 mdr. 2026 - 9 mdr. 2025.
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["ford-motor"]={
 "skema": 2,
 "navn": "Ford",
 "ticker": "F",
 "valuta": "USD",
 "aar": [
  {
   "aar": 2023,
   "til": "2023-12-31",
   "omsaetning": 176191.0,
   "resultat": 4347.0,
   "kilde": "10-K 2025"
  },
  {
   "aar": 2024,
   "til": "2024-12-31",
   "omsaetning": 184992.0,
   "resultat": 5879.0,
   "kilde": "10-K 2025"
  },
  {
   "aar": 2025,
   "til": "2025-12-31",
   "omsaetning": 187267.0,
   "resultat": -8182.0,
   "kilde": "10-K 2025"
  }
 ],
 "ttm": {
  "til": "2026-09-30",
  "omsaetning": 186965.0,
  "resultat": -7794.0,
  "kilde": "10-K 2025 + 10-Q 3. kvt. 2026"
 },
 "kvartal": {
  "til": "2026-09-30",
  "omsaetning": 49526.0,
  "sammeKvartalAaretFoer": 50534.0,
  "kilde": "10-Q 3. kvt. 2026"
 },
 "aktie": {
  "aktier": 3993217466,
  "aktierDato": "2026-10-26",
  "kilde": "10-Q 3. kvt. 2026, forsiden (Common og Class B)"
 },
 "hentet": "2026-11-14",
 "kilde": "Fords regnskaber hos SEC",
 "kildeUrl": "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000037996"
};
