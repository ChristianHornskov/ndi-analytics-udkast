/* Nøgletal for Carvana. Regnskabstal fra Carvanas egne regnskaber hos SEC (Net sales and operating revenues og Net income attributable to Carvana Co., US GAAP, oplyst i millioner dollar).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 plus de første ni måneder af 2026 minus de første ni måneder af 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["carvana"]={
 "skema":2,"navn":"Carvana","ticker":"CVNA","valuta":"USD","hentet":"2026-11-13",
 "kilde":"Carvanas regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001690820&type=10-",
 "aar":[
  {"aar":2022,"til":"2022-12-31","omsaetning":13604.000,"resultat":-1587.000,"kilde":"10-K 2024"},
  {"aar":2023,"til":"2023-12-31","omsaetning":10771.000,"resultat":450.000,"kilde":"10-K 2025"},
  {"aar":2024,"til":"2024-12-31","omsaetning":13673.000,"resultat":210.000,"kilde":"10-K 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":20322.000,"resultat":1407.000,"kilde":"10-K 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":27451.000,"resultat":1706.000,"kilde":"10-K 2025 + 10-Q 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":8040.000,"sammeKvartalAaretFoer":5647.000,"kilde":"10-Q 3. kvt. 2026"},
 "aktie":{"aktier":722713745,"aktierDato":"2026-10-26","kilde":"10-Q 3. kvt. 2026, forsiden"}
};
