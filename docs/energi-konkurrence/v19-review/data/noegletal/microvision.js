/* Nøgletal for MicroVision. Regnskabstal fra MicroVisions egne regnskaber hos SEC (Revenue og Net loss, US GAAP).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL.microvision={
 "skema":2,"navn":"MicroVision","ticker":"MVIS","valuta":"USD","hentet":"2026-11-13",
 "kilde":"MicroVisions regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000065770&type=10-",
 "aar":[
  {"aar":2022,"til":"2022-12-31","omsaetning":0.664,"resultat":-53.091,"kilde":"10-K 2024"},
  {"aar":2023,"til":"2023-12-31","omsaetning":7.259,"resultat":-82.842,"kilde":"10-K 2025"},
  {"aar":2024,"til":"2024-12-31","omsaetning":4.696,"resultat":-96.915,"kilde":"10-K 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":1.208,"resultat":-94.981,"kilde":"10-K 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":5.031,"resultat":-112.221,"kilde":"10-K 2025 + 10-Q 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":2.400,"sammeKvartalAaretFoer":0.241,"kilde":"10-Q 3. kvt. 2026"},
 "aktie":{"aktier":34047688,"aktierDato":"2026-10-21","kilde":"10-Q 3. kvt. 2026, forsiden"}
};
