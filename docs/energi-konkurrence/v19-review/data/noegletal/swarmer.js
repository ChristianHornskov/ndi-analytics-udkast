/* Nøgletal for Swarmer. Regnskabstal fra Swarmers egne regnskaber hos SEC (Revenue og Net loss).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 6 mdr. 2026 - 6 mdr. 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL.swarmer={
 "skema":2,"navn":"Swarmer","ticker":"SWMR","valuta":"USD","hentet":"2026-11-13",
 "kilde":"Swarmers regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0002092574&type=10-",
 "aar":[
  {"aar":2024,"til":"2024-12-31","omsaetning":0.329,"resultat":-2.070,"kilde":"424B4 2026"},
  {"aar":2025,"til":"2025-12-31","omsaetning":0.310,"resultat":-8.529,"kilde":"424B4 2026"}
 ],
 "ttm":{"til":"2026-06-30","omsaetning":0.298,"resultat":-17.992,"kilde":"424B4 2026 + 10-Q 2. kvt. 2026"},
 "kvartal":{"til":"2026-06-30","omsaetning":0.216,"sammeKvartalAaretFoer":0.138,"kilde":"10-Q 2. kvt. 2026"},
 "aktie":{"aktier":11922750,"aktierDato":"2026-08-10","kilde":"10-Q 2. kvt. 2026, forsiden"}
};
