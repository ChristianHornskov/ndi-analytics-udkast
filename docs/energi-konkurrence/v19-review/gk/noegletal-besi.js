/* Nøgletal for Besi. Tal fra årsrapporten og kvartalsmeddelelserne. 12 mdr. = 2025 + 9 mdr. 2026 - 9 mdr. 2025. Ni måneder 2026 er beregnet ud fra de oplyste vækstrater.
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["besi"]={
 "skema": 2,
 "navn": "Besi",
 "ticker": "BESI",
 "valuta": "EUR",
 "aar": [
  {
   "aar": 2024,
   "til": "2024-12-31",
   "omsaetning": 607.5,
   "resultat": 182.0,
   "kilde": "Årsrapport 2025"
  },
  {
   "aar": 2025,
   "til": "2025-12-31",
   "omsaetning": 591.3,
   "resultat": 131.6,
   "kilde": "Årsrapport 2025"
  }
 ],
 "ttm": {
  "til": "2026-09-30",
  "omsaetning": 884.4,
  "resultat": 290.6,
  "kilde": "Årsrapport 2025 + meddelelser 3. kvt. 2025 og 2026"
 },
 "kvartal": {
  "til": "2026-09-30",
  "omsaetning": 283.4,
  "sammeKvartalAaretFoer": 132.7,
  "kilde": "Meddelelse 3. kvt. 2026"
 },
 "aktie": {
  "aktier": 79282000,
  "aktierDato": "2025-12-31",
  "kilde": "Årsrapport 2025, ekskl. egne aktier"
 },
 "hentet": "2026-11-14",
 "kilde": "Besis pressemeddelelser",
 "kildeUrl": "https://www.besi.com/investor-relations/press-releases/"
};
