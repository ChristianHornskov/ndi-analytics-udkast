/* Nøgletal for MYR Group. Regnskabstal fra 10-K og 10-Q (Contract revenues og Net income). 12 mdr. = 2025 + 9 mdr. 2026 - 9 mdr. 2025.
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["myr-group"]={
 "skema": 2,
 "navn": "MYR Group",
 "ticker": "MYRG",
 "valuta": "USD",
 "aar": [
  {
   "aar": 2023,
   "til": "2023-12-31",
   "omsaetning": 3643.905,
   "resultat": 90.99,
   "kilde": "10-K 2025"
  },
  {
   "aar": 2024,
   "til": "2024-12-31",
   "omsaetning": 3362.29,
   "resultat": 30.263,
   "kilde": "10-K 2025"
  },
  {
   "aar": 2025,
   "til": "2025-12-31",
   "omsaetning": 3657.889,
   "resultat": 118.416,
   "kilde": "10-K 2025"
  }
 ],
 "ttm": {
  "til": "2026-09-30",
  "omsaetning": 4314.683,
  "resultat": 193.204,
  "kilde": "10-K 2025 + 10-Q 3. kvt. 2026"
 },
 "kvartal": {
  "til": "2026-09-30",
  "omsaetning": 1259.032,
  "sammeKvartalAaretFoer": 950.4,
  "kilde": "10-Q 3. kvt. 2026"
 },
 "aktie": {
  "aktier": 15570008,
  "aktierDato": "2026-10-23",
  "kilde": "10-Q 3. kvt. 2026, forsiden"
 },
 "hentet": "2026-11-14",
 "kilde": "MYR Groups regnskaber hos SEC",
 "kildeUrl": "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000700923"
};
