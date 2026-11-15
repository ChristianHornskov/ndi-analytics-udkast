/* Nøgletal for HUBER+SUHNER. Regnskabstal fra selskabets egne Swiss GAAP FER-regnskaber
   (nettoomsætning og resultat attributable to shareholders of HUBER+SUHNER AG).
   Beløb i mio. CHF. Kurs og kursnøgletal udelades her.
   12 mdr. = årsregnskab 2025 + 1. halvår 2026 - 1. halvår 2025.
   Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["huber-suhner"]={
 "skema": 2,
 "navn": "HUBER+SUHNER",
 "ticker": "HUBN",
 "valuta": "CHF",
 "hentet": "2026-11-14",
 "kilde": "HUBER+SUHNERs årsrapporter og halvårsrapport",
 "kildeUrl": "https://www.hubersuhner.com/en/company/investors/",
 "aar": [
  {
   "aar": 2022,
   "til": "2022-12-31",
   "omsaetning": 954.564,
   "resultat": 84.253,
   "kilde": "K2b, resultatopgørelse 2023 (år 2022), attributable to shareholders"
  },
  {
   "aar": 2023,
   "til": "2023-12-31",
   "omsaetning": 851.062,
   "resultat": 64.221,
   "kilde": "K2, resultatopgørelse, attributable to shareholders"
  },
  {
   "aar": 2024,
   "til": "2024-12-31",
   "omsaetning": 893.874,
   "resultat": 71.383,
   "kilde": "K1, resultatopgørelse, attributable to shareholders"
  },
  {
   "aar": 2025,
   "til": "2025-12-31",
   "omsaetning": 864.129,
   "resultat": 74.349,
   "kilde": "K1, resultatopgørelse, attributable to shareholders"
  }
 ],
 "ttm": {
  "til": "2026-06-30",
  "omsaetning": 875.612,
  "resultat": 72.784,
  "kilde": "K1+K3: 2025 + H1 2026 - H1 2025, attributable to shareholders"
 },
 "kvartal": {
  "til": "2026-06-30",
  "omsaetning": 457.402,
  "sammeKvartalAaretFoer": 445.919,
  "kilde": "K3, 1. halvår 2026 (selskabet offentliggør ikke kvartalsregnskab med resultat)",
  "periode": "halvår"
 },
 "aktie": {
  "aktier": 18457210,
  "aktierDato": "2025-12-31",
  "kilde": "K1 Share Data: Number of shares entitled to a dividend 31.12.2025. K3 har ikke et senere antal."
 }
};
