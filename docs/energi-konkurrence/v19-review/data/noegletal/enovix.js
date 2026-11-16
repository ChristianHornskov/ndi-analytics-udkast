/* Nøgletal for Enovix. Regnskabstal fra Enovix' egne regnskaber hos SEC (Revenue og Net loss attributable to Enovix).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Hvert tal er bekræftet i to dokumenter hos SEC. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL.enovix={
 "skema":2,"navn":"Enovix","ticker":"ENVX","valuta":"USD","hentet":"2026-11-14",
 "kilde":"Enovix’ regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001828318&type=10-",
 "aar":[
  {"aar":2022,"etiket":"2022","til":"2023-01-01","omsaetning":6.202,"resultat":-51.622,"kilde":"10-K 2024 og 10-K 2023"},
  {"aar":2023,"etiket":"2023","til":"2023-12-31","omsaetning":7.644,"resultat":-214.071,"kilde":"10-K 2025 og 10-K 2024"},
  {"aar":2024,"etiket":"2024","til":"2024-12-29","omsaetning":23.074,"resultat":-222.241,"kilde":"10-K 2025 og regnskabsmeddelelse 25.2.2026"},
  {"aar":2025,"etiket":"2025","til":"2025-12-28","omsaetning":31.821,"resultat":-156.741,"kilde":"10-K 2025 og regnskabsmeddelelse 25.2.2026"}
 ],
 "ttm":{"til":"2026-10-04","omsaetning":38.928,"resultat":-158.259,"kilde":"10-K 2025 + 10-Q 3. kvt. 2026"},
 "kvartal":{"til":"2026-10-04","omsaetning":11.039,"sammeKvartalAaretFoer":7.990,"kilde":"10-Q 3. kvt. 2026 og regnskabsmeddelelse 12.11.2026"},
 "aktie":{"aktier":212206365,"aktierDato":"2026-11-06","kilde":"10-Q 3. kvt. 2026, forsiden"}
};
