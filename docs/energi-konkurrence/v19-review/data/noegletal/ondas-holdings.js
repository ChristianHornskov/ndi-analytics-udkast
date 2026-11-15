/* Nøgletal for Ondas. Regnskabstal fra Ondas' egne regnskaber hos SEC (Revenue og Net income (loss) attributable to Ondas Inc., US GAAP, oplyst i tusinde dollar og her omregnet til millioner. Kun tre år, fordi årsrapporten for 2025 som mindre rapporterende selskab kun viser to år, og årsrapporten for 2024 tilføjer 2023).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = 2025 plus de første ni måneder af 2026 minus de første ni måneder af 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["ondas-holdings"]={
 "skema":2,"navn":"Ondas","ticker":"ONDS","valuta":"USD","hentet":"2026-11-13",
 "kilde":"Ondas' regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001646188&type=10-",
 "aar":[
  {"aar":2023,"til":"2023-12-31","omsaetning":15.691,"resultat":-46.359,"kilde":"10-K 2024"},
  {"aar":2024,"til":"2024-12-31","omsaetning":7.193,"resultat":-42.419,"kilde":"10-K 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":50.731,"resultat":-137.171,"kilde":"10-K 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":331.494,"resultat":109.482,"kilde":"10-K 2025 + 10-Q 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":167.489,"sammeKvartalAaretFoer":10.098,"kilde":"10-Q 3. kvt. 2026"},
 "aktie":{"aktier":591442459,"aktierDato":"2026-11-10","kilde":"10-Q 3. kvt. 2026, forsiden"}
};
