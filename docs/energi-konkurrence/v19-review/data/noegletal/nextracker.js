/* Nøgletal for Nextpower (tidligere Nextracker). Regnskabstal fra Nextpowers egne regnskaber hos SEC (Revenue og Net income attributable to Nextpower Inc. / Nextracker Inc.).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025/26 + 6 mdr. 2026/27 - 6 mdr. 2025/26. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL.nextracker={
 "skema":2,"navn":"Nextpower","ticker":"NXT","valuta":"USD","hentet":"2026-11-13",
 "kilde":"Nextpowers regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001852131&type=10-",
 "aar":[
  {"aar":2023,"etiket":"2022/23","til":"2023-03-31","omsaetning":1902.137,"resultat":1.143,"kilde":"10-K 2025"},
  {"aar":2024,"etiket":"2023/24","til":"2024-03-31","omsaetning":2499.841,"resultat":306.241,"kilde":"10-K 2026"},
  {"aar":2025,"etiket":"2024/25","til":"2025-03-31","omsaetning":2959.197,"resultat":509.168,"kilde":"10-K 2026"},
  {"aar":2026,"etiket":"2025/26","til":"2026-03-31","omsaetning":3559.390,"resultat":585.883,"kilde":"10-K 2026"}
 ],
 "ttm":{"til":"2026-10-02","omsaetning":3834.315,"resultat":612.647,"kilde":"10-K 2026 + 10-Q 2. kvt. 2026/27"},
 "kvartal":{"til":"2026-10-02","omsaetning":1109.276,"sammeKvartalAaretFoer":905.268,"kilde":"10-Q 2. kvt. 2026/27"},
 "aktie":{"aktier":150575535,"aktierDato":"2026-10-26","kilde":"10-Q 2. kvt. 2026/27, forsiden"}
};
