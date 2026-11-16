/* Nøgletal for GlobalFoundries. Regnskabstal fra GlobalFoundries' egne regnskaber hos SEC (Net revenue og Net income (loss), IFRS, i mio. dollar).
   Resultatet er for hele koncernen. Minoritetsinteresserne er 3 mio. dollar eller mindre om året.
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["globalfoundries"]={
 "skema":2,"navn":"GlobalFoundries","ticker":"GFS","valuta":"USD","hentet":"2026-11-14",
 "kilde":"GlobalFoundries’ regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001709048&type=20-F",
 "aar":[
  {"aar":2022,"til":"2022-12-31","omsaetning":8108.000,"resultat":1446.000,"kilde":"20-F 2024"},
  {"aar":2023,"til":"2023-12-31","omsaetning":7392.000,"resultat":1018.000,"kilde":"20-F 2025"},
  {"aar":2024,"til":"2024-12-31","omsaetning":6750.000,"resultat":-262.000,"kilde":"20-F 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":6791.000,"resultat":888.000,"kilde":"20-F 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":7149.000,"resultat":201.000,"kilde":"20-F 2025 + 6-K 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":1899.000,"sammeKvartalAaretFoer":1688.000,"kilde":"6-K 3. kvt. 2026"},
 "aktie":{"aktier":557448741,"aktierDato":"2026-09-30","kilde":"Delårsregnskab 3. kvt. 2026 (6-K)"}
};
