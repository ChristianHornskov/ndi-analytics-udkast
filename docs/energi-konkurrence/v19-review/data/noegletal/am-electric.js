/* Nøgletal for American Electric Power. Regnskabstal fra selskabets egne regnskaber hos SEC (Total Revenues og Earnings Attributable to AEP Common Shareholders, US GAAP, USD).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["am-electric"]={
 "skema":2,"navn":"American Electric Power","ticker":"AEP","valuta":"USD","hentet":"2026-11-13",
 "kilde":"American Electric Powers regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000004904&type=10-",
 "aar":[
  {"aar":2022,"til":"2022-12-31","omsaetning":19639.5,"resultat":2307.2,"kilde":"10-K 2024"},
  {"aar":2023,"til":"2023-12-31","omsaetning":18982.0,"resultat":2208.0,"kilde":"10-K 2025"},
  {"aar":2024,"til":"2024-12-31","omsaetning":19721.0,"resultat":2967.0,"kilde":"10-K 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":21876.0,"resultat":3580.0,"kilde":"10-K 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":23612.0,"resultat":3356.0,"kilde":"10-K 2025 + 10-Q 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":6832.0,"sammeKvartalAaretFoer":6011.0,"kilde":"10-Q 3. kvt. 2026"},
 "aktie":{"aktier":544526330,"aktierDato":"2026-10-28","kilde":"10-Q 3. kvt. 2026, forsiden"}
};
