/* Nøgletal for Ciena. Regnskabstal fra Cienas egne regnskaber hos SEC (Total revenue og Net income, US GAAP, oplyst i tusinde dollar og her omregnet til mio.).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata. Regnskabsåret er et 52- eller 53-ugers år, som slutter lørdagen nærmest den 31. oktober, og etiket viser regnskabsåret.
   12 mdr. = årsregnskab til 1.11.2025 plus de første ni måneder til 1.8.2026 minus de første ni måneder til 2.8.2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL.ciena={
 "skema": 2,
 "navn": "Ciena",
 "ticker": "CIEN",
 "valuta": "USD",
 "hentet": "2026-11-13",
 "kilde": "Cienas regnskaber hos SEC",
 "kildeUrl": "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000936395&type=10-",
 "aar": [
  {
   "aar": 2022,
   "til": "2022-10-29",
   "etiket": "2021/22",
   "omsaetning": 3632.661,
   "resultat": 152.902,
   "kilde": "K2"
  },
  {
   "aar": 2023,
   "til": "2023-10-28",
   "etiket": "2022/23",
   "omsaetning": 4386.549,
   "resultat": 254.827,
   "kilde": "K1"
  },
  {
   "aar": 2024,
   "til": "2024-11-02",
   "etiket": "2023/24",
   "omsaetning": 4014.955,
   "resultat": 83.956,
   "kilde": "K1"
  },
  {
   "aar": 2025,
   "til": "2025-11-01",
   "etiket": "2024/25",
   "omsaetning": 4769.507,
   "resultat": 123.338,
   "kilde": "K1"
  }
 ],
 "ttm": {
  "til": "2026-08-01",
  "omsaetning": 6020.894,
  "resultat": 654.410,
  "kilde": "K1+K3"
 },
 "kvartal": {
  "til": "2026-08-01",
  "omsaetning": 1671.129,
  "sammeKvartalAaretFoer": 1219.385,
  "kilde": "K3"
 },
 "aktie": {
  "aktier": 141808525,
  "aktierDato": "2026-08-28",
  "kilde": "K3 forside"
 }
};
