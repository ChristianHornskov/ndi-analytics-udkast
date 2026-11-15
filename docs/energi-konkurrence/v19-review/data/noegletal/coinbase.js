/* Nøgletal for Coinbase. Regnskabstal fra Coinbases egne regnskaber hos SEC (Total revenue og Net income (loss)).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL.coinbase={
 "skema":2,"navn":"Coinbase","ticker":"COIN","valuta":"USD","hentet":"2026-11-13",
 "kilde":"Coinbases regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001679788&type=10-",
 "aar":[
  {"aar":2022,"til":"2022-12-31","omsaetning":3194.208,"resultat":-2624.949,"kilde":"10-K 2024"},
  {"aar":2023,"til":"2023-12-31","omsaetning":3108.383,"resultat":94.871,"kilde":"10-K 2025"},
  {"aar":2024,"til":"2024-12-31","omsaetning":6564.028,"resultat":2579.066,"kilde":"10-K 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":7181.325,"resultat":1260.327,"kilde":"10-K 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":5629.761,"resultat":-701.621,"kilde":"10-K 2025 + 10-Q 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":1215.582,"sammeKvartalAaretFoer":1868.693,"kilde":"10-Q 3. kvt. 2026"},
 "aktie":{"aktier":264763418,"aktierDato":"2026-10-22","kilde":"10-Q 3. kvt. 2026, forsiden"}
};
