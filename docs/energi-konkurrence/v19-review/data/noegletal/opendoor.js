/* Nøgletal for Opendoor. Regnskabstal fra Opendoors egne regnskaber hos SEC (Revenue og Net loss, US GAAP).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["opendoor"]={
 "skema":2,"navn":"Opendoor","ticker":"OPEN","valuta":"USD","hentet":"2026-11-13",
 "kilde":"Opendoors regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001801169&type=10-",
 "aar":[
  {"aar":2022,"til":"2022-12-31","omsaetning":15567,"resultat":-1353,"kilde":"10-K 2024"},
  {"aar":2023,"til":"2023-12-31","omsaetning":6946,"resultat":-275,"kilde":"10-K 2025"},
  {"aar":2024,"til":"2024-12-31","omsaetning":5153,"resultat":-392,"kilde":"10-K 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":4371,"resultat":-1300,"kilde":"10-K 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":3361,"resultat":-1649,"kilde":"10-K 2025 + 10-Q 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":1022,"sammeKvartalAaretFoer":915,"kilde":"10-Q 3. kvt. 2026"},
 "aktie":{"aktier":930238919,"aktierDato":"2026-10-29","kilde":"10-Q 3. kvt. 2026, forsiden"}
};
