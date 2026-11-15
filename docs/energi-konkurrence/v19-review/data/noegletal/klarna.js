/* Nøgletal for Klarna. Regnskabstal fra 20-F og regnskabsmeddelelsen for 2. kvt. 2026 (Total revenue og Net profit (loss) i alt). 12 mdr. = 2025 + 1. halvår 2026 - 1. halvår 2025.
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["klarna"]={
 "skema": 2,
 "navn": "Klarna",
 "ticker": "KLAR",
 "valuta": "USD",
 "aar": [
  {
   "aar": 2023,
   "til": "2023-12-31",
   "omsaetning": 2276,
   "resultat": -244,
   "kilde": "20-F 2025"
  },
  {
   "aar": 2024,
   "til": "2024-12-31",
   "omsaetning": 2811,
   "resultat": 21,
   "kilde": "20-F 2025"
  },
  {
   "aar": 2025,
   "til": "2025-12-31",
   "omsaetning": 3509,
   "resultat": -273,
   "kilde": "20-F 2025"
  }
 ],
 "ttm": {
  "til": "2026-06-30",
  "omsaetning": 4039,
  "resultat": -111,
  "kilde": "20-F 2025 + regnskabsmeddelelse 2. kvt. 2026"
 },
 "kvartal": {
  "til": "2026-06-30",
  "omsaetning": 1042,
  "sammeKvartalAaretFoer": 823,
  "kilde": "Regnskabsmeddelelse 2. kvt. 2026"
 },
 "aktie": {
  "aktier": 377507910,
  "aktierDato": "2025-12-31",
  "kilde": "20-F 2025, forsiden"
 },
 "hentet": "2026-11-14",
 "kilde": "Klarnas regnskaber hos SEC",
 "kildeUrl": "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0002003292"
};
