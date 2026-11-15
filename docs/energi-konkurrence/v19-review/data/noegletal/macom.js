/* Nøgletal for MACOM. Regnskabstal fra MACOMs egne regnskaber hos SEC (Revenue og Net income (loss), US GAAP).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2026 (regnskabsåret til 2.10.2026), fordi årsregnskabet er nyere end seneste kvartalsregnskab. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL.macom={
 "skema":2,"navn":"MACOM","ticker":"MTSI","valuta":"USD","hentet":"2026-11-13",
 "kilde":"MACOMs regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001493594&type=10-",
 "aar":[
  {"aar":2023,"etiket":"2022/23","til":"2023-09-29","omsaetning":648.407,"resultat":91.577,"kilde":"10-K 2025"},
  {"aar":2024,"etiket":"2023/24","til":"2024-09-27","omsaetning":729.578,"resultat":76.859,"kilde":"10-K 2026"},
  {"aar":2025,"etiket":"2024/25","til":"2025-10-03","omsaetning":967.258,"resultat":-54.210,"kilde":"10-K 2026"},
  {"aar":2026,"etiket":"2025/26","til":"2026-10-02","omsaetning":1327.623,"resultat":335.251,"kilde":"10-K 2026"}
 ],
 "ttm":{"til":"2026-10-02","omsaetning":1327.623,"resultat":335.251,"kilde":"10-K 2026"},
 "kvartal":{"til":"2026-10-02","omsaetning":424.819,"sammeKvartalAaretFoer":261.170,"kilde":"8-K 5.11.2026 (4. kvt. 2026)"},
 "aktie":{"aktier":76787562,"aktierDato":"2026-11-10","kilde":"10-K 2026, forsiden"}
};
