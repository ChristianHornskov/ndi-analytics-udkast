/* Nøgletal for Reddit. Regnskabstal fra Reddits egne regnskaber hos SEC (Total revenue og Net income (loss)).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL.reddit={
 "skema":2,"navn":"Reddit","ticker":"RDDT","valuta":"USD","hentet":"2026-11-13",
 "kilde":"Reddits regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001713445&type=10-",
 "aar":[
  {"aar":2022,"til":"2022-12-31","omsaetning":666.701,"resultat":-158.550,"kilde":"10-K 2024"},
  {"aar":2023,"til":"2023-12-31","omsaetning":804.029,"resultat":-90.824,"kilde":"10-K 2025"},
  {"aar":2024,"til":"2024-12-31","omsaetning":1300.205,"resultat":-484.276,"kilde":"10-K 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":2202.506,"resultat":529.721,"kilde":"10-K 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":3088.880,"resultat":991.696,"kilde":"10-K 2025 + 10-Q 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":894.957,"sammeKvartalAaretFoer":584.911,"kilde":"10-Q 3. kvt. 2026"},
 "aktie":{"aktier":193093731,"aktierDato":"2026-10-28","kilde":"10-Q 3. kvt. 2026, forsiden (Class A og Class B)"}
};
