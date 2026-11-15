/* Nøgletal for Coupang. Regnskabstal fra Coupangs egne regnskaber hos SEC (Total net revenues og Net income (loss), US GAAP, oplyst i millioner. Aktier er klasse A plus klasse B).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = 2025 plus de første ni måneder af 2026 minus de første ni måneder af 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["coupang"]={
 "skema":2,"navn":"Coupang","ticker":"CPNG","valuta":"USD","hentet":"2026-11-13",
 "kilde":"Coupangs regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001834584&type=10-",
 "aar":[
  {"aar":2022,"til":"2022-12-31","omsaetning":20583,"resultat":-92,"kilde":"10-K 2024"},
  {"aar":2023,"til":"2023-12-31","omsaetning":24383,"resultat":1360,"kilde":"10-K 2025"},
  {"aar":2024,"til":"2024-12-31","omsaetning":30268,"resultat":66,"kilde":"10-K 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":34534,"resultat":214,"kilde":"10-K 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":36157,"resultat":-1363,"kilde":"10-K 2025 + 10-Q 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":9962,"sammeKvartalAaretFoer":9267,"kilde":"10-Q 3. kvt. 2026"},
 "aktie":{"aktier":1792297638,"aktierDato":"2026-10-29","kilde":"10-Q 3. kvt. 2026, forsiden"}
};
