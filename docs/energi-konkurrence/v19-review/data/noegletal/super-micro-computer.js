/* Nøgletal for Super Micro Computer. Regnskabstal fra Super Micro Computers egne regnskaber hos SEC (Net sales og Net income, US GAAP, oplyst i millioner).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata. Regnskabsåret slutter 30. juni, og etiket viser regnskabsåret.
   12 mdr. = regnskabsåret til 30.6.2026 plus kvartalet til 30.9.2026 minus kvartalet til 30.9.2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["super-micro-computer"]={
 "skema":2,"navn":"Super Micro Computer","ticker":"SMCI","valuta":"USD","hentet":"2026-11-13",
 "kilde":"Super Micro Computers regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001375365&type=10-",
 "aar":[
  {"aar":2023,"etiket":"2022/23","til":"2023-06-30","omsaetning":7123.5,"resultat":640.0,"kilde":"10-K 2025"},
  {"aar":2024,"etiket":"2023/24","til":"2024-06-30","omsaetning":14989.2,"resultat":1152.7,"kilde":"10-K 2026"},
  {"aar":2025,"etiket":"2024/25","til":"2025-06-30","omsaetning":21972.0,"resultat":1048.9,"kilde":"10-K 2026"},
  {"aar":2026,"etiket":"2025/26","til":"2026-06-30","omsaetning":39063.1,"resultat":2230.5,"kilde":"10-K 2026"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":53991.1,"resultat":3656.4,"kilde":"10-K 2026 + 10-Q 1. kvt. 2027"},
 "kvartal":{"til":"2026-09-30","omsaetning":19945.8,"sammeKvartalAaretFoer":5017.8,"kilde":"10-Q 1. kvt. 2027"},
 "aktie":{"aktier":659227367,"aktierDato":"2026-10-31","kilde":"10-Q 1. kvt. 2027, forsiden"}
};
