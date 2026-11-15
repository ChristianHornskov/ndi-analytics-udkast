/* Nøgletal for Generac. Regnskabstal fra 10-K og 10-Q (Net sales og Net income attributable to Generac Holdings Inc.). 12 mdr. = 2025 + 9 mdr. 2026 - 9 mdr. 2025.
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["generac"]={
 "skema": 2,
 "navn": "Generac",
 "ticker": "GNRC",
 "valuta": "USD",
 "aar": [
  {
   "aar": 2023,
   "til": "2023-12-31",
   "omsaetning": 4022.667,
   "resultat": 214.606,
   "kilde": "10-K 2025"
  },
  {
   "aar": 2024,
   "til": "2024-12-31",
   "omsaetning": 4295.834,
   "resultat": 316.315,
   "kilde": "10-K 2025"
  },
  {
   "aar": 2025,
   "til": "2025-12-31",
   "omsaetning": 4209.147,
   "resultat": 159.554,
   "kilde": "10-K 2025"
  }
 ],
 "ttm": {
  "til": "2026-09-30",
  "omsaetning": 4619.158,
  "resultat": 301.258,
  "kilde": "10-K 2025 + 10-Q 3. kvt. 2026"
 },
 "kvartal": {
  "til": "2026-09-30",
  "omsaetning": 1294.779,
  "sammeKvartalAaretFoer": 1114.353,
  "kilde": "10-Q 3. kvt. 2026"
 },
 "aktie": {
  "aktier": 58988982,
  "aktierDato": "2026-10-30",
  "kilde": "10-Q 3. kvt. 2026, forsiden"
 },
 "hentet": "2026-11-14",
 "kilde": "Generacs regnskaber hos SEC",
 "kildeUrl": "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001474735"
};
