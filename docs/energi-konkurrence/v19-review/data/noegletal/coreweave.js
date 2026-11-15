/* Nøgletal for CoreWeave. Regnskabstal fra CoreWeaves egne regnskaber hos SEC (Revenue og Net loss and comprehensive loss).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL.coreweave={
 "skema":2,"navn":"CoreWeave","ticker":"CRWV","valuta":"USD","hentet":"2026-11-13",
 "kilde":"CoreWeaves regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001769628&type=10-",
 "aar":[
  {"aar":2022,"til":"2022-12-31","omsaetning":15.830,"resultat":-31.055,"kilde":"424B4 2025"},
  {"aar":2023,"til":"2023-12-31","omsaetning":229.000,"resultat":-594.000,"kilde":"10-K 2025"},
  {"aar":2024,"til":"2024-12-31","omsaetning":1915.000,"resultat":-863.000,"kilde":"10-K 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":5131.000,"resultat":-1167.000,"kilde":"10-K 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":9886.000,"resultat":-2527.000,"kilde":"10-K 2025 + 10-Q 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":3661.000,"sammeKvartalAaretFoer":1365.000,"kilde":"10-Q 3. kvt. 2026"},
 "aktie":{"aktier":556125724,"aktierDato":"2026-10-30","kilde":"10-Q 3. kvt. 2026, forsiden"}
};
