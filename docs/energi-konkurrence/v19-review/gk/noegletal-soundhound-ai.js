/* Nøgletal for SoundHound AI. Regnskabstal fra 10-K og 10-Q (Revenues og Net loss). 12 mdr. = 2025 + 9 mdr. 2026 - 9 mdr. 2025.
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["soundhound-ai"]={
 "skema": 2,
 "navn": "SoundHound AI",
 "ticker": "SOUN",
 "valuta": "USD",
 "aar": [
  {
   "aar": 2023,
   "til": "2023-12-31",
   "omsaetning": 45.873,
   "resultat": -88.937,
   "kilde": "10-K 2025"
  },
  {
   "aar": 2024,
   "til": "2024-12-31",
   "omsaetning": 84.693,
   "resultat": -350.681,
   "kilde": "10-K 2025"
  },
  {
   "aar": 2025,
   "til": "2025-12-31",
   "omsaetning": 168.92,
   "resultat": -14.006,
   "kilde": "10-K 2025"
  }
 ],
 "ttm": {
  "til": "2026-09-30",
  "omsaetning": 223.576,
  "resultat": -73.609,
  "kilde": "10-K 2025 + 10-Q 3. kvt. 2026"
 },
 "kvartal": {
  "til": "2026-09-30",
  "omsaetning": 62.425,
  "sammeKvartalAaretFoer": 42.049,
  "kilde": "10-Q 3. kvt. 2026"
 },
 "aktie": {
  "aktier": 488393409,
  "aktierDato": "2026-11-05",
  "kilde": "10-Q 3. kvt. 2026, forsiden (A- og B-aktier)"
 },
 "hentet": "2026-11-14",
 "kilde": "SoundHounds regnskaber hos SEC",
 "kildeUrl": "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001840856"
};
