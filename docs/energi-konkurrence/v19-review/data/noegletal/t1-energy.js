/* Nøgletal for T1 Energy. Regnskabstal fra T1 Energys egne regnskaber hos SEC (Total net sales og Net loss).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["t1-energy"]={
 "skema":2,"navn":"T1 Energy","ticker":"TE","valuta":"USD","hentet":"2026-11-13",
 "kilde":"T1 Energys regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001992243&type=10-",
 "aar":[
  {"aar":2022,"til":"2022-12-31","omsaetning":0.000,"resultat":-99.119,"kilde":"10-K 2023"},
  {"aar":2023,"til":"2023-12-31","omsaetning":0.000,"resultat":-73.096,"kilde":"10-K 2024"},
  {"aar":2024,"til":"2024-12-31","omsaetning":2.942,"resultat":-450.554,"kilde":"10-K 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":755.295,"resultat":-367.834,"kilde":"10-K 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":982.919,"resultat":-293.647,"kilde":"10-K 2025 + 10-Q 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":196.590,"sammeKvartalAaretFoer":210.522,"kilde":"10-Q 3. kvt. 2026"},
 "aktie":{"aktier":300601542,"aktierDato":"2026-11-09","kilde":"10-Q 3. kvt. 2026, forsiden"}
};
