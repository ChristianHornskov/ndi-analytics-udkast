/* Nøgletal for Sharplink. Regnskabstal fra Sharplinks egne regnskaber hos SEC (Total revenue og Net income (loss)).
   Beløb i mio. i selskabets regnskabsvaluta (USD). Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["sharplink-gaming"]={
 "skema":2,"navn":"Sharplink","ticker":"SBET","valuta":"USD","hentet":"2026-11-13",
 "kilde":"Sharplinks regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001981535&type=10-",
 "aar":[
  {"aar":2022,"til":"2022-12-31","omsaetning":3.490,"resultat":-15.233,"kilde":"10-K 2023"},
  {"aar":2023,"til":"2023-12-31","omsaetning":4.953,"resultat":-14.243,"kilde":"10-K 2024"},
  {"aar":2024,"til":"2024-12-31","omsaetning":3.662,"resultat":10.099,"kilde":"10-K 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":28.055,"resultat":-734.587,"kilde":"10-K 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":52.815,"resultat":-1062.852,"kilde":"10-K 2025 + 10-Q 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":13.456,"sammeKvartalAaretFoer":10.844,"kilde":"10-Q 3. kvt. 2026"},
 "aktie":{"aktier":217346200,"aktierDato":"2026-11-03","kilde":"10-Q 3. kvt. 2026, forsiden"}
};
