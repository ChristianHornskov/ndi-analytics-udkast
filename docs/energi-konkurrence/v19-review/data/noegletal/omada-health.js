/* Nøgletal for Omada Health. Regnskabstal fra Omada Healths egne regnskaber hos SEC (Total revenue og Net income (loss), US GAAP, oplyst i tusinder og her omregnet til millioner).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["omada-health"]={
 "skema":2,"navn":"Omada Health","ticker":"OMDA","valuta":"USD","hentet":"2026-11-13",
 "kilde":"Omada Healths regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001611115&type=10-",
 "aar":[
  {"aar":2023,"til":"2023-12-31","omsaetning":122.784,"resultat":-67.511,"kilde":"10-K 2025"},
  {"aar":2024,"til":"2024-12-31","omsaetning":169.8,"resultat":-47.137,"kilde":"10-K 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":260.21,"resultat":-12.778,"kilde":"10-K 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":333.035,"resultat":14.034,"kilde":"10-K 2025 + 10-Q 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":91.306,"sammeKvartalAaretFoer":68.03,"kilde":"10-Q 3. kvt. 2026"},
 "aktie":{"aktier":62037725,"aktierDato":"2026-11-03","kilde":"10-Q 3. kvt. 2026, forsiden"}
};
