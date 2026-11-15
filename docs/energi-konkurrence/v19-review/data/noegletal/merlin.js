/* Nøgletal for Merlin. Regnskabstal fra Merlins egne regnskaber hos SEC (Revenue og Net income (loss)).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL.merlin={
 "skema":2,"navn":"Merlin","ticker":"MRLN","valuta":"USD","hentet":"2026-11-14",
 "kilde":"Merlins regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0002028707&type=10-",
 "aar":[
  {"aar":2024,"til":"2024-12-31","omsaetning":1.229,"resultat":-55.253,"kilde":"424B3 13.5.2026 og 8-K 20.3.2026, bilag 99.1"},
  {"aar":2025,"til":"2025-12-31","omsaetning":7.551,"resultat":-74.778,"kilde":"424B3 13.5.2026 og 8-K 20.3.2026, bilag 99.1"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":8.309,"resultat":-94.062,"kilde":"424B3 13.5.2026 + 10-Q 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":3.461,"sammeKvartalAaretFoer":1.924,"kilde":"10-Q 3. kvt. 2026"},
 "aktie":{"aktier":102418930,"aktierDato":"2026-11-10","kilde":"10-Q 3. kvt. 2026, forsiden"}
};
