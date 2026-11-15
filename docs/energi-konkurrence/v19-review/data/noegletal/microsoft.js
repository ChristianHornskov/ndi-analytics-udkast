/* Nøgletal for Microsoft. Regnskabstal fra Microsofts egne regnskaber hos SEC (Revenue og Net income).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025/26 + 3 mdr. til 30.9.2026 - 3 mdr. til 30.9.2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["microsoft"]={
 "skema":2,"navn":"Microsoft","ticker":"MSFT","valuta":"USD","hentet":"2026-11-14",
 "kilde":"Microsofts regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000789019&type=10-",
 "aar":[
  {"aar":2023,"etiket":"2022/23","til":"2023-06-30","omsaetning":211915.000,"resultat":72361.000,"kilde":"10-K 2025"},
  {"aar":2024,"etiket":"2023/24","til":"2024-06-30","omsaetning":245122.000,"resultat":88136.000,"kilde":"10-K 2026"},
  {"aar":2025,"etiket":"2024/25","til":"2025-06-30","omsaetning":281724.000,"resultat":101832.000,"kilde":"10-K 2026"},
  {"aar":2026,"etiket":"2025/26","til":"2026-06-30","omsaetning":331839.000,"resultat":133749.000,"kilde":"10-K 2026"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":346445.000,"resultat":142631.000,"kilde":"10-K 2026 + 10-Q 1. kvt. 2027"},
 "kvartal":{"til":"2026-09-30","omsaetning":92279.000,"sammeKvartalAaretFoer":77673.000,"kilde":"10-Q 1. kvt. 2027"},
 "aktie":{"aktier":7426194552,"aktierDato":"2026-10-22","kilde":"10-Q 1. kvt. 2027, forsiden"}
};
