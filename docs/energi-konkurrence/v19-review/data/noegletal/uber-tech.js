/* Nøgletal for Uber. Regnskabstal fra Ubers egne regnskaber hos SEC (Total revenue og Net income attributable to Uber Technologies, Inc.).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["uber-tech"]={
 "skema":2,"navn":"Uber","ticker":"UBER","valuta":"USD","hentet":"2026-11-13",
 "kilde":"Ubers regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001543151&type=10-",
 "aar":[
  {"aar":2022,"til":"2022-12-31","omsaetning":31877.0,"resultat":-9141.0,"kilde":"10-K 2024"},
  {"aar":2023,"til":"2023-12-31","omsaetning":37281.0,"resultat":1887.0,"kilde":"10-K 2025"},
  {"aar":2024,"til":"2024-12-31","omsaetning":43978.0,"resultat":9856.0,"kilde":"10-K 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":52017.0,"resultat":10053.0,"kilde":"10-K 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":56526.0,"resultat":3465.0,"kilde":"10-K 2025 + 10-Q 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":14766.0,"sammeKvartalAaretFoer":13467.0,"kilde":"10-Q 3. kvt. 2026"},
 "aktie":{"aktier":2041898070,"aktierDato":"2026-10-30","kilde":"10-Q 3. kvt. 2026, forsiden"}
};
