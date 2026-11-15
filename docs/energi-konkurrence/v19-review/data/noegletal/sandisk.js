/* Nøgletal for Sandisk. Regnskabstal fra Sandisks egne regnskaber hos SEC (Revenue, net og Net income (loss)).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   Regnskabsåret slutter typisk den fredag, der ligger tættest på 30. juni, og etiket viser regnskabsåret.
   12 mdr. = årsregnskab 2025/26 + 1. kvt. 2026/27 - 1. kvt. 2025/26. Årene 2022/23-2024/25 er i Sandisks egne 10-K'er opgjort som udskilte (carve-out) tal. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL.sandisk={
 "skema":2,"navn":"Sandisk","ticker":"SNDK","valuta":"USD","hentet":"2026-11-14",
 "kilde":"Sandisks regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0002023554&type=10-",
 "aar":[
  {"aar":2023,"etiket":"2022/23","til":"2023-06-30","omsaetning":6086.000,"resultat":-2143.000,"kilde":"10-K 2025"},
  {"aar":2024,"etiket":"2023/24","til":"2024-06-28","omsaetning":6663.000,"resultat":-672.000,"kilde":"10-K 2026"},
  {"aar":2025,"etiket":"2024/25","til":"2025-06-27","omsaetning":7355.000,"resultat":-1641.000,"kilde":"10-K 2026"},
  {"aar":2026,"etiket":"2025/26","til":"2026-07-03","omsaetning":20248.000,"resultat":11433.000,"kilde":"10-K 2026"}
 ],
 "ttm":{"til":"2026-10-02","omsaetning":28971.000,"resultat":19422.000,"kilde":"10-K 2026 + 10-Q 1. kvt. 2027"},
 "kvartal":{"til":"2026-10-02","omsaetning":11031.000,"sammeKvartalAaretFoer":2308.000,"kilde":"10-Q 1. kvt. 2027"},
 "aktie":{"aktier":142289365,"aktierDato":"2026-10-26","kilde":"10-Q 1. kvt. 2027, forsiden"}
};
