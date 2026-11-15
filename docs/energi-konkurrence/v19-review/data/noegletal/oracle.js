/* Nøgletal for Oracle. Regnskabstal fra 10-K for regnskabsåret til 31.5.2026 og regnskabsmeddelelsen for kvartalet til 31.8.2026 (Total revenues og Net income). 12 mdr. = regnskabsåret 2026 + 1. kvt. 2027 - 1. kvt. 2026.
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["oracle"]={
 "skema": 2,
 "navn": "Oracle",
 "ticker": "ORCL",
 "valuta": "USD",
 "aar": [
  {
   "aar": 2024,
   "til": "2024-05-31",
   "omsaetning": 52961.0,
   "resultat": 10467.0,
   "kilde": "10-K 2026"
  },
  {
   "aar": 2025,
   "til": "2025-05-31",
   "omsaetning": 57399.0,
   "resultat": 12443.0,
   "kilde": "10-K 2026"
  },
  {
   "aar": 2026,
   "til": "2026-05-31",
   "omsaetning": 67357.0,
   "resultat": 17087.0,
   "kilde": "10-K 2026"
  }
 ],
 "ttm": {
  "til": "2026-08-31",
  "omsaetning": 71776.0,
  "resultat": 18920.0,
  "kilde": "10-K 2026 + regnskabsmeddelelse 1. kvt. 2027"
 },
 "kvartal": {
  "til": "2026-08-31",
  "omsaetning": 19345.0,
  "sammeKvartalAaretFoer": 14926.0,
  "kilde": "Regnskabsmeddelelse 1. kvt. regnskabsåret 2027"
 },
 "aktie": {
  "aktier": 2880471000,
  "aktierDato": "2026-06-12",
  "kilde": "10-K 2026, forsiden"
 },
 "hentet": "2026-11-14",
 "kilde": "Oracles regnskaber hos SEC",
 "kildeUrl": "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001341439"
};
