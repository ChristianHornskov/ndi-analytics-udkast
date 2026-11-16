/* Nøgletal for Comstock Resources. Regnskabstal fra Comstock Resources' egne regnskaber hos SEC (Total revenues and other operating income og Net income (loss) available to Comstock / the Company).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["comstock-resources"]={
 "skema":2,"navn":"Comstock Resources","ticker":"CRK","valuta":"USD","hentet":"2026-11-13",
 "kilde":"Comstock Resources’ regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000023194&type=10-",
 "aar":[
  {"aar":2022,"til":"2022-12-31","omsaetning":3628.397,"resultat":1124.868,"kilde":"10-K 2024"},
  {"aar":2023,"til":"2023-12-31","omsaetning":1565.234,"resultat":211.117,"kilde":"10-K 2025"},
  {"aar":2024,"til":"2024-12-31","omsaetning":1254.455,"resultat":-229.651,"kilde":"10-K 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":2220.289,"resultat":395.611,"kilde":"10-K 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":2114.813,"resultat":419.405,"kilde":"10-K 2025 + 10-Q 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":384.363,"sammeKvartalAaretFoer":447.359,"kilde":"10-Q 3. kvt. 2026"},
 "aktie":{"aktier":293613651,"aktierDato":"2026-11-04","kilde":"10-Q 3. kvt. 2026, forsiden"}
};
