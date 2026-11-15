/* Nøgletal for Corning. Regnskabstal fra Cornings egne regnskaber hos SEC (Net sales og Net income attributable to Corning Incorporated).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL.corning={
 "skema":2,"navn":"Corning","ticker":"GLW","valuta":"USD","hentet":"2026-11-14",
 "kilde":"Cornings regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000024741&type=10-",
 "aar":[
  {"aar":2022,"til":"2022-12-31","omsaetning":14189.0,"resultat":1316.0,"kilde":"10-K 2024"},
  {"aar":2023,"til":"2023-12-31","omsaetning":12588.0,"resultat":581.0,"kilde":"10-K 2025"},
  {"aar":2024,"til":"2024-12-31","omsaetning":13118.0,"resultat":506.0,"kilde":"10-K 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":15629.0,"resultat":1596.0,"kilde":"10-K 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":17719.0,"resultat":2150.0,"kilde":"10-K 2025 + 10-Q 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":4855.0,"sammeKvartalAaretFoer":4100.0,"kilde":"10-Q 3. kvt. 2026"},
 "aktie":{"aktier":861401106,"aktierDato":"2026-10-23","kilde":"10-Q 3. kvt. 2026, forsiden"}
};
