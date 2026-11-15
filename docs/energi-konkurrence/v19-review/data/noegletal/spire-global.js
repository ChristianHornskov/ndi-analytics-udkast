/* Nøgletal for Spire Global. Regnskabstal fra Spires egne regnskaber hos SEC (Revenue og Net income (loss)).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["spire-global"]={
 "skema":2,"navn":"Spire Global","ticker":"SPIR","valuta":"USD","hentet":"2026-11-13",
 "kilde":"Spires regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001816017&type=10-",
 "aar":[
  {"aar":2022,"til":"2022-12-31","omsaetning":70.767,"resultat":-99.012,"kilde":"10-K/A 2023"},
  {"aar":2023,"til":"2023-12-31","omsaetning":97.612,"resultat":-77.558,"kilde":"10-K/A 2024"},
  {"aar":2024,"til":"2024-12-31","omsaetning":110.451,"resultat":-103.359,"kilde":"10-K 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":71.553,"resultat":51.305,"kilde":"10-K 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":67.705,"resultat":-91.158,"kilde":"10-K 2025 + 10-Q 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":17.998,"sammeKvartalAaretFoer":12.670,"kilde":"10-Q 3. kvt. 2026"},
 "aktie":{"aktier":39261216,"aktierDato":"2026-11-06","kilde":"10-Q 3. kvt. 2026, forsiden"}
};
