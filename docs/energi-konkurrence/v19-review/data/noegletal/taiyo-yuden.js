/* Nøgletal for Taiyo Yuden. Regnskabstal fra Taiyo Yudens egne regnskaber (Securities Report og halvårsrapport, japansk regnskabsstandard).
   Omsætning er "Net sales" (売上高) og resultat er resultatet til moderselskabets aktionærer (親会社株主に帰属する当期純利益).
   Beløb i mio. i selskabets regnskabsvaluta (JPY). Kilden runder ned til hele millioner. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = regnskabsåret til 31.3.2026 + 6 mdr. til 30.9.2026 - 6 mdr. til 30.9.2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["taiyo-yuden"]={
 "skema":2,"navn":"Taiyo Yuden","ticker":"6976","valuta":"JPY","hentet":"2026-11-13",
 "kilde":"Taiyo Yudens egne regnskaber","kildeUrl":"https://www.yuden.co.jp/jp/ir/library/security_reports.html",
 "aar":[
  {"aar":2023,"etiket":"2022/23","til":"2023-03-31","omsaetning":319504.000,"resultat":23216.000,"kilde":"Securities Report 2026"},
  {"aar":2024,"etiket":"2023/24","til":"2024-03-31","omsaetning":322647.000,"resultat":8317.000,"kilde":"Securities Report 2026"},
  {"aar":2025,"etiket":"2024/25","til":"2025-03-31","omsaetning":341438.000,"resultat":2328.000,"kilde":"Securities Report 2026"},
  {"aar":2026,"etiket":"2025/26","til":"2026-03-31","omsaetning":355341.000,"resultat":14806.000,"kilde":"Securities Report 2026"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":383751.000,"resultat":17401.000,"kilde":"Securities Report 2026 + halvårsrapport 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":112136.000,"sammeKvartalAaretFoer":92813.000,"kilde":"Investorpræsentation 5.11.2026"},
 "aktie":{"aktier":133131054,"aktierDato":"2026-09-30","kilde":"Regnskabsmeddelelse 5.11.2026, forsiden"}
};
