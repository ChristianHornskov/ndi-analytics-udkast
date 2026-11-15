/* Nøgletal for Wolfspeed. Regnskabstal fra Wolfspeeds egne regnskaber hos SEC (Revenue, net og Net (loss) income, US GAAP, oplyst i millioner. Regnskabsåret 2025/26 er summen af Predecessor- og Successor-perioden).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata. Regnskabsåret slutter sidste søndag i juni, og etiket viser regnskabsåret.
   12 mdr. = Successor-perioderne alene: 30.9.2025 til 28.6.2026 plus 1. kvartal 2026/27 (se rapporten). Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["wolfspeed"]={
 "skema":2,"navn":"Wolfspeed","ticker":"WOLF","valuta":"USD","hentet":"2026-11-13",
 "kilde":"Wolfspeeds regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000895419&type=10-",
 "aar":[
  {"aar":2023,"etiket":"2022/23","til":"2023-06-25","omsaetning":758.5,"resultat":-329.9,"kilde":"10-K 2025"},
  {"aar":2024,"etiket":"2023/24","til":"2024-06-30","omsaetning":807.2,"resultat":-864.2,"kilde":"10-K 2026"},
  {"aar":2025,"etiket":"2024/25","til":"2025-06-29","omsaetning":757.6,"resultat":-1609.2,"kilde":"10-K 2026"},
  {"aar":2026,"etiket":"2025/26","til":"2026-06-28","omsaetning":665.1,"resultat":4.4,"kilde":"10-K 2026"}
 ],
 "ttm":{"til":"2026-09-27","omsaetning":623.3,"resultat":-559.6,"kilde":"10-K 2026 + 10-Q 1. kvt. 2027"},
 "kvartal":{"til":"2026-09-27","omsaetning":155.0,"sammeKvartalAaretFoer":196.8,"kilde":"10-Q 1. kvt. 2027"},
 "aktie":{"aktier":53581878,"aktierDato":"2026-10-30","kilde":"10-Q 1. kvt. 2027, forsiden"}
};
