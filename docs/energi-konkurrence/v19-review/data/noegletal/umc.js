/* Nøgletal for UMC. Regnskabstal fra UMC's egne regnskaber hos SEC (Operating revenues og Net income attributable to the parent company, IFRS).
   Beløb i mio. i selskabets regnskabsvaluta (NTD). Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL.umc={
 "skema":2,"navn":"UMC","ticker":"UMC","valuta":"NTD","kursValuta":"USD","adsForhold":5,"hentet":"2026-11-13",
 "kilde":"UMC's regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001033767&type=20-F",
 "aar":[
  {"aar":2022,"til":"2022-12-31","omsaetning":278705.264,"resultat":89478.805,"kilde":"20-F 2024"},
  {"aar":2023,"til":"2023-12-31","omsaetning":222533.000,"resultat":59688.950,"kilde":"20-F 2025"},
  {"aar":2024,"til":"2024-12-31","omsaetning":232302.584,"resultat":48779.300,"kilde":"20-F 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":237553.199,"resultat":40360.314,"kilde":"20-F 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":265819.226,"resultat":83564.366,"kilde":"20-F 2025 + 6-K 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":74239.117,"sammeKvartalAaretFoer":59127.040,"kilde":"6-K 3. kvt. 2026"},
 "aktie":{"aktier":12588156344,"aktierDato":"2025-12-31","kilde":"20-F 2025, forsiden"}
};
