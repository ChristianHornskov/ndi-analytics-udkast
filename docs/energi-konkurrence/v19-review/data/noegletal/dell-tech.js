/* Nøgletal for Dell. Regnskabstal fra Dell Technologies egne regnskaber hos SEC (Total net revenue og Net income attributable to Dell Technologies Inc. for årene, Net income for halvårsperioderne, US GAAP, oplyst i millioner dollar).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata. Regnskabsåret slutter den fredag, der ligger nærmest den 31. januar, og etiket viser regnskabsåret.
   12 mdr. = regnskabsåret til 30.1.2026 plus de første seks måneder til 31.7.2026 minus de første seks måneder til 1.8.2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["dell-tech"]={
 "skema": 2,
 "navn": "Dell",
 "ticker": "DELL",
 "valuta": "USD",
 "hentet": "2026-11-13",
 "kilde": "Dell Technologies’ regnskaber hos SEC",
 "kildeUrl": "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001571996&type=10-",
 "aar": [
  {
   "aar": 2023,
   "til": "2023-02-03",
   "etiket": "2022/23",
   "omsaetning": 102301.0,
   "resultat": 2442.0,
   "kilde": "K2"
  },
  {
   "aar": 2024,
   "til": "2024-02-02",
   "etiket": "2023/24",
   "omsaetning": 88425.0,
   "resultat": 3388.0,
   "kilde": "K1"
  },
  {
   "aar": 2025,
   "til": "2025-01-31",
   "etiket": "2024/25",
   "omsaetning": 95567.0,
   "resultat": 4592.0,
   "kilde": "K1"
  },
  {
   "aar": 2026,
   "til": "2026-01-30",
   "etiket": "2025/26",
   "omsaetning": 113538.0,
   "resultat": 5936.0,
   "kilde": "K1"
  }
 ],
 "ttm": {
  "til": "2026-07-31",
  "omsaetning": 151197.0,
  "resultat": 11378.0,
  "kilde": "K1+K3"
 },
 "kvartal": {
  "til": "2026-07-31",
  "omsaetning": 46971.0,
  "sammeKvartalAaretFoer": 29776.0,
  "kilde": "K3"
 },
 "aktie": {
  "aktier": 635812750,
  "aktierDato": "2026-09-01",
  "kilde": "K3 forside"
 }
};
