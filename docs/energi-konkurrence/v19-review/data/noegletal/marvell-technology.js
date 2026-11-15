/* Nøgletal for Marvell Technology. Regnskabstal fra Marvells egne regnskaber hos SEC
   (Net revenue og Net income (loss), US GAAP. Regnskabsåret slutter den lørdag, der ligger tættest på 31. januar, og etiket viser regnskabsåret).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2026 plus de første seks måneder af 2027 minus de første seks måneder af 2026. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["marvell-technology"]={
 "skema":2,"navn":"Marvell Technology","ticker":"MRVL","valuta":"USD","hentet":"2026-11-14",
 "kilde":"Marvells regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001835632&type=10-",
 "aar":[
  {"aar":2023,"til":"2023-01-28","etiket":"2022/23","omsaetning":5919.6,"resultat":-163.5,"kilde":"10-K 2025"},
  {"aar":2024,"til":"2024-02-03","etiket":"2023/24","omsaetning":5507.7,"resultat":-933.4,"kilde":"10-K 2026"},
  {"aar":2025,"til":"2025-02-01","etiket":"2024/25","omsaetning":5767.3,"resultat":-885.0,"kilde":"10-K 2026"},
  {"aar":2026,"til":"2026-01-31","etiket":"2025/26","omsaetning":8194.6,"resultat":2670.1,"kilde":"10-K 2026"}
 ],
 "ttm":{"til":"2026-08-01","omsaetning":9450.3,"resultat":2639.9,"kilde":"10-K 2026 + 10-Q 2. kvt. 2027"},
 "kvartal":{"til":"2026-08-01","omsaetning":2739.3,"sammeKvartalAaretFoer":2006.1,"kilde":"10-Q 2. kvt. 2027"},
 "aktie":{"aktier":876900000,"aktierDato":"2026-08-21","kilde":"10-Q 2. kvt. 2027, forsiden"}
};
