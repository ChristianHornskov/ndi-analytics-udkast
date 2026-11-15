/* Nøgletal for Broadcom. Regnskabstal fra 10-K og 10-Q (Total net revenue og Net income). Regnskabsåret slutter omkring 1. november. 12 mdr. = regnskabsåret 2025 + tre kvartaler 2026 - tre kvartaler 2025.
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["broadcom"]={
 "skema": 2,
 "navn": "Broadcom",
 "ticker": "AVGO",
 "valuta": "USD",
 "aar": [
  {
   "aar": 2023,
   "til": "2023-10-29",
   "omsaetning": 35819.0,
   "resultat": 14082.0,
   "kilde": "10-K 2025"
  },
  {
   "aar": 2024,
   "til": "2024-11-03",
   "omsaetning": 51574.0,
   "resultat": 5895.0,
   "kilde": "10-K 2025"
  },
  {
   "aar": 2025,
   "til": "2025-11-02",
   "omsaetning": 63887.0,
   "resultat": 23126.0,
   "kilde": "10-K 2025"
  }
 ],
 "ttm": {
  "til": "2026-08-02",
  "omsaetning": 89104.0,
  "resultat": 38265.0,
  "kilde": "10-K 2025 + 10-Q 3. kvt. 2026"
 },
 "kvartal": {
  "til": "2026-08-02",
  "omsaetning": 29591.0,
  "sammeKvartalAaretFoer": 15952.0,
  "kilde": "10-Q og regnskabsmeddelelse 3. kvt. 2026"
 },
 "aktie": {
  "aktier": 4773629865,
  "aktierDato": "2026-08-28",
  "kilde": "10-Q 3. kvt. 2026, forsiden"
 },
 "hentet": "2026-11-14",
 "kilde": "Broadcoms regnskaber hos SEC",
 "kildeUrl": "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001730168"
};
