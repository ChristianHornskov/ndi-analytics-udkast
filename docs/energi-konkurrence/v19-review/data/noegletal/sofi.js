/* Nøgletal for SoFi. Regnskabstal fra SoFis egne regnskaber hos SEC (Total net revenue og Net income (loss)).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL.sofi={
 "skema":2,"navn":"SoFi","ticker":"SOFI","valuta":"USD","hentet":"2026-11-14",
 "kilde":"SoFis regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001818874&type=10-",
 "aar":[
  {"aar":2022,"til":"2022-12-31","omsaetning":1573.535,"resultat":-320.407,"kilde":"10-K 2024"},
  {"aar":2023,"til":"2023-12-31","omsaetning":2122.789,"resultat":-300.742,"kilde":"10-K 2025"},
  {"aar":2024,"til":"2024-12-31","omsaetning":2674.859,"resultat":498.665,"kilde":"10-K 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":3613.354,"resultat":481.320,"kilde":"10-K 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":4729.194,"resultat":737.861,"kilde":"10-K 2025 + 10-Q 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":1385.099,"sammeKvartalAaretFoer":961.600,"kilde":"10-Q 3. kvt. 2026"},
 "aktie":{"aktier":1297840447,"aktierDato":"2026-10-30","kilde":"10-Q 3. kvt. 2026, forsiden"}
};
