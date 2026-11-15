/* Nøgletal for Rambus. Regnskabstal fra 10-K og 10-Q (Total revenue og Net income). 12 mdr. = 2025 + 9 mdr. 2026 - 9 mdr. 2025.
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["rambus"]={
 "skema": 2,
 "navn": "Rambus",
 "ticker": "RMBS",
 "valuta": "USD",
 "aar": [
  {
   "aar": 2023,
   "til": "2023-12-31",
   "omsaetning": 461.117,
   "resultat": 333.904,
   "kilde": "10-K 2025"
  },
  {
   "aar": 2024,
   "til": "2024-12-31",
   "omsaetning": 556.624,
   "resultat": 179.821,
   "kilde": "10-K 2025"
  },
  {
   "aar": 2025,
   "til": "2025-12-31",
   "omsaetning": 707.63,
   "resultat": 230.455,
   "kilde": "10-K 2025"
  }
 ],
 "ttm": {
  "til": "2026-09-30",
  "omsaetning": 796.107,
  "resultat": 265.868,
  "kilde": "10-K 2025 + 10-Q 3. kvt. 2026"
 },
 "kvartal": {
  "til": "2026-09-30",
  "omsaetning": 218.289,
  "sammeKvartalAaretFoer": 178.513,
  "kilde": "10-Q 3. kvt. 2026"
 },
 "aktie": {
  "aktier": 107095985,
  "aktierDato": "2026-09-30",
  "kilde": "10-Q 3. kvt. 2026, forsiden"
 },
 "hentet": "2026-11-14",
 "kilde": "Rambus' regnskaber hos SEC",
 "kildeUrl": "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000917273"
};
