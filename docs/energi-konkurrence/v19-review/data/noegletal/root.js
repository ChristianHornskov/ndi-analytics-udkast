/* Nøgletal for Root. Regnskabstal fra Roots egne regnskaber hos SEC (Total revenues og Net income (loss)).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL.root={
 "skema":2,"navn":"Root","ticker":"ROOT","valuta":"USD","hentet":"2026-11-14",
 "kilde":"Roots regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001788882&type=10-",
 "aar":[
  {"aar":2022,"til":"2022-12-31","omsaetning":310.8,"resultat":-297.7,"kilde":"10-K 2024"},
  {"aar":2023,"til":"2023-12-31","omsaetning":455.0,"resultat":-147.4,"kilde":"10-K 2025"},
  {"aar":2024,"til":"2024-12-31","omsaetning":1176.5,"resultat":30.9,"kilde":"10-K 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":1517.1,"resultat":40.3,"kilde":"10-K 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":1561.0,"resultat":81.0,"kilde":"10-K 2025 + 10-Q 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":381.3,"sammeKvartalAaretFoer":387.8,"kilde":"10-Q 3. kvt. 2026"},
 "aktie":{"aktier":15192249,"aktierDato":"2026-10-28","kilde":"10-Q 3. kvt. 2026, forsiden"}
};
