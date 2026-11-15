/* Nøgletal for Horizon Robotics. Regnskabstal fra selskabets egne IFRS-regnskaber
   på HKEXnews (omsætning og resultat til ejerne af Horizon Robotics, dog 2022 som
   koncernens resultat i femårsoversigten). Beløb i mio. i selskabets regnskabsvaluta (RMB).
   Aktiekursen er i HKD. Kurs og kursnøgletal udelades her.
   12 mdr. = årsregnskab 2025 + 1. halvår 2026 (inkl. ophørende aktivitet) - 1. halvår 2025 (inkl. ophørende aktivitet).
   Feltet "kvartal" er 1. halvår 2026, fordi selskabet ikke offentliggør kvartalsregnskaber.
   Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["horizon-robotics"]={
 "skema": 2,
 "navn": "Horizon Robotics",
 "ticker": "9660",
 "valuta": "RMB",
 "kursValuta": "HKD",
 "hentet": "2026-11-13",
 "kilde": "Horizon Robotics' års- og halvårsrapporter på HKEXnews",
 "kildeUrl": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0430/2026043001830.pdf",
 "aar": [
  {
   "aar": 2022,
   "til": "2022-12-31",
   "omsaetning": 905.676,
   "resultat": -8720.428,
   "kilde": "K1 femårsoversigt (koncernens resultat)"
  },
  {
   "aar": 2023,
   "til": "2023-12-31",
   "omsaetning": 1551.607,
   "resultat": -6739.021,
   "kilde": "K2"
  },
  {
   "aar": 2024,
   "til": "2024-12-31",
   "omsaetning": 2383.554,
   "resultat": 2346.58,
   "kilde": "K1"
  },
  {
   "aar": 2025,
   "til": "2025-12-31",
   "omsaetning": 3758.268,
   "resultat": -10469.012,
   "kilde": "K1"
  }
 ],
 "ttm": {
  "til": "2026-06-30",
  "omsaetning": 4309.699,
  "resultat": -1451.788,
  "kilde": "K1+K3"
 },
 "kvartal": {
  "til": "2026-06-30",
  "omsaetning": 2118.187,
  "sammeKvartalAaretFoer": 1566.756,
  "kilde": "K3, 1. halvår 2026 (ikke et kvartal)",
  "periode": "halvår"
 },
 "aktie": {
  "aktier": 15873486671,
  "aktierDato": "2026-10-31",
  "kilde": "K8b, månedlig aktieopgørelse 31.10.2026"
 }
};
