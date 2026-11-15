/* Nøgletal for Gemini Space Station. Regnskabstal fra Geminis egne regnskaber hos SEC (Total revenue og Net loss).
   Beløb i mio. i selskabets regnskabsvaluta (USD). Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Filen skal erstattes af det automatiske datajob.
   Der er kun tre reviderede år i 10-K og i børsprospektet (2023, 2024 og 2025). */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["gemini-space-station"]={
 "skema":2,"navn":"Gemini Space Station","ticker":"GEMI","valuta":"USD","hentet":"2026-11-13",
 "kilde":"Geminis regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0002055592&type=10-",
 "aar":[
  {"aar":2023,"til":"2023-12-31","omsaetning":98.137,"resultat":-319.675,"kilde":"10-K 2025"},
  {"aar":2024,"til":"2024-12-31","omsaetning":142.165,"resultat":-158.546,"kilde":"10-K 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":179.572,"resultat":-582.813,"kilde":"10-K 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":196.971,"resultat":-416.159,"kilde":"10-K 2025 + 10-Q 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":40.881,"sammeKvartalAaretFoer":50.618,"kilde":"10-Q 3. kvt. 2026"},
 "aktie":{"aktier":131025652,"aktierDato":"2026-11-06","kilde":"10-Q 3. kvt. 2026, forsiden"}
};
