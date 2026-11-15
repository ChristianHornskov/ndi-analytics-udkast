/* Nøgletal for IREN. Regnskabsåret slutter 30.6. Tal fra 10-K og 10-Q (Total revenue og Net income (loss)). 12 mdr. = regnskabsåret til 30.6.2026 + kvartalet til 30.9.2026 - kvartalet til 30.9.2025.
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["iren"]={
 "skema": 2,
 "navn": "IREN",
 "ticker": "IREN",
 "valuta": "USD",
 "aar": [
  {
   "aar": 2024,
   "til": "2024-06-30",
   "omsaetning": 187.192,
   "resultat": -28.92,
   "kilde": "10-K FY2026"
  },
  {
   "aar": 2025,
   "til": "2025-06-30",
   "omsaetning": 501.023,
   "resultat": 86.941,
   "kilde": "10-K FY2026"
  },
  {
   "aar": 2026,
   "til": "2026-06-30",
   "omsaetning": 707.007,
   "resultat": -702.621,
   "kilde": "10-K FY2026"
  }
 ],
 "ttm": {
  "til": "2026-09-30",
  "omsaetning": 695.007,
  "resultat": -1350.621,
  "kilde": "10-K FY2026 + 10-Q til 30.9.2026"
 },
 "kvartal": {
  "til": "2026-09-30",
  "omsaetning": 228,
  "sammeKvartalAaretFoer": 240,
  "kilde": "10-Q til 30.9.2026"
 },
 "aktie": {
  "aktier": 424357381,
  "aktierDato": "2026-10-30",
  "kilde": "10-Q til 30.9.2026, forsiden"
 },
 "hentet": "2026-11-14",
 "kilde": "IRENs regnskaber hos SEC",
 "kildeUrl": "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001878848"
};
