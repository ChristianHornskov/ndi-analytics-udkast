/* Nøgletal for eToro. Omsætning er her eToros nettobidrag (Net contribution), fordi den regnskabsmæssige omsætning rummer den fulde salgsværdi af kryptoaktiver. 12 mdr. = 2025 + 9 mdr. 2026 - 9 mdr. 2025.
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["etoro-group"]={
 "skema": 2,
 "navn": "eToro",
 "ticker": "ETOR",
 "valuta": "USD",
 "aar": [
  {
   "aar": 2024,
   "til": "2024-12-31",
   "omsaetning": 788,
   "resultat": 192,
   "kilde": "Regnskabsmeddelelse 2025"
  },
  {
   "aar": 2025,
   "til": "2025-12-31",
   "omsaetning": 868,
   "resultat": 216,
   "kilde": "Regnskabsmeddelelse 2025"
  }
 ],
 "ttm": {
  "til": "2026-09-30",
  "omsaetning": 900.3,
  "resultat": 219.9,
  "kilde": "Regnskabsmeddelelse 2025 + 3. kvt. 2026"
 },
 "kvartal": {
  "til": "2026-09-30",
  "omsaetning": 186.3,
  "sammeKvartalAaretFoer": 214.6,
  "kilde": "Regnskabsmeddelelse 3. kvt. 2026"
 },
 "aktie": {
  "aktier": 82851422,
  "aktierDato": "2025-12-31",
  "kilde": "20-F 2025, forsiden (A- og B-aktier)"
 },
 "hentet": "2026-11-14",
 "kilde": "eToros investorside",
 "kildeUrl": "https://investors.etoro.com/"
};
