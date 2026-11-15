/* Nøgletal for Fluor. Regnskabstal fra Fluors egne regnskaber hos SEC (Total revenue og Net earnings (loss) attributable to Fluor).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL.fluor={
 "skema":2,"navn":"Fluor","ticker":"FLR","valuta":"USD","hentet":"2026-11-13",
 "kilde":"Fluors regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001124198&type=10-",
 "aar":[
  {"aar":2022,"til":"2022-12-31","omsaetning":13744.000,"resultat":145.000,"kilde":"10-K 2024"},
  {"aar":2023,"til":"2023-12-31","omsaetning":15474.000,"resultat":139.000,"kilde":"10-K 2025"},
  {"aar":2024,"til":"2024-12-31","omsaetning":16315.000,"resultat":2145.000,"kilde":"10-K 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":15503.000,"resultat":-51.000,"kilde":"10-K 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":15887.000,"resultat":-1141.000,"kilde":"10-K 2025 + 10-Q 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":3720.000,"sammeKvartalAaretFoer":3368.000,"kilde":"10-Q 3. kvt. 2026"},
 "aktie":{"aktier":128184260,"aktierDato":"2026-10-30","kilde":"10-Q 3. kvt. 2026, forsiden"}
};
