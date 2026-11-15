/* Nøgletal for Celanese. Regnskabstal fra Celaneses egne regnskaber hos SEC (Net sales og Net earnings (loss) attributable to Celanese Corporation, US GAAP).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["celanese"]={
 "skema":2,"navn":"Celanese","ticker":"CE","valuta":"USD","hentet":"2026-11-13",
 "kilde":"Celaneses regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001306830&type=10-",
 "aar":[
  {"aar":2022,"til":"2022-12-31","omsaetning":9673,"resultat":1894,"kilde":"10-K 2024"},
  {"aar":2023,"til":"2023-12-31","omsaetning":10926,"resultat":1943,"kilde":"10-K 2025"},
  {"aar":2024,"til":"2024-12-31","omsaetning":10268,"resultat":-1542,"kilde":"10-K 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":9544,"resultat":-1165,"kilde":"10-K 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":9849,"resultat":262,"kilde":"10-K 2025 + 10-Q 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":2556,"sammeKvartalAaretFoer":2419,"kilde":"10-Q 3. kvt. 2026"},
 "aktie":{"aktier":109752752,"aktierDato":"2026-10-30","kilde":"10-Q 3. kvt. 2026, forsiden"}
};
