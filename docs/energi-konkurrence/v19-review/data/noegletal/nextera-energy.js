/* Nøgletal for NextEra Energy. Regnskabstal fra NextEra Energys egne regnskaber hos SEC (Operating revenues og Net income attributable to NEE).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["nextera-energy"]={
 "skema":2,"navn":"NextEra Energy","ticker":"NEE","valuta":"USD","hentet":"2026-11-13",
 "kilde":"NextEra Energys regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000753308&type=10-",
 "aar":[
  {"aar":2022,"til":"2022-12-31","omsaetning":20956.000,"resultat":4147.000,"kilde":"10-K 2024"},
  {"aar":2023,"til":"2023-12-31","omsaetning":28114.000,"resultat":7310.000,"kilde":"10-K 2025"},
  {"aar":2024,"til":"2024-12-31","omsaetning":24753.000,"resultat":6946.000,"kilde":"10-K 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":27412.000,"resultat":6835.000,"kilde":"10-K 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":28825.000,"resultat":11637.000,"kilde":"10-K 2025 + 10-Q 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":8090.000,"sammeKvartalAaretFoer":7966.000,"kilde":"10-Q 3. kvt. 2026"},
 "aktie":{"aktier":2097306049,"aktierDato":"2026-09-30","kilde":"10-Q 3. kvt. 2026, forsiden"}
};
