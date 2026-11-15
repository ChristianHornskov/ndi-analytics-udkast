/* Nøgletal for Nova. Regnskabstal fra regnskabsmeddelelserne for 2025 og 3. kvt. 2026 (Total revenues og Net income). 12 mdr. = 2025 + 9 mdr. 2026 - 9 mdr. 2025.
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["nova"]={
 "skema": 2,
 "navn": "Nova",
 "ticker": "NVMI",
 "valuta": "USD",
 "aar": [
  {
   "aar": 2024,
   "til": "2024-12-31",
   "omsaetning": 672.396,
   "resultat": 183.762,
   "kilde": "Regnskabsmeddelelse 2025"
  },
  {
   "aar": 2025,
   "til": "2025-12-31",
   "omsaetning": 880.577,
   "resultat": 259.223,
   "kilde": "Regnskabsmeddelelse 2025"
  }
 ],
 "ttm": {
  "til": "2026-09-30",
  "omsaetning": 1000.731,
  "resultat": 298.917,
  "kilde": "Regnskabsmeddelelse 2025 + 3. kvt. 2026"
 },
 "kvartal": {
  "til": "2026-09-30",
  "omsaetning": 287.841,
  "sammeKvartalAaretFoer": 224.608,
  "kilde": "Regnskabsmeddelelse 3. kvt. 2026"
 },
 "aktie": {
  "aktier": 31780111,
  "aktierDato": "2025-12-31",
  "kilde": "20-F 2025, forsiden"
 },
 "hentet": "2026-11-14",
 "kilde": "Novas regnskaber hos SEC",
 "kildeUrl": "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001109345"
};
