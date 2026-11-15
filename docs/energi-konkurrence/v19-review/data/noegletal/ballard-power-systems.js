/* Nøgletal for Ballard Power Systems. Regnskabstal fra Ballards egne regnskaber hos SEC (Product and service revenues og Net loss).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 6 mdr. 2026 - 6 mdr. 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["ballard-power-systems"]={
 "skema":2,"navn":"Ballard Power Systems","ticker":"BLDP","valuta":"USD","hentet":"2026-11-14",
 "kilde":"Ballards regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001453015&type=40-",
 "aar":[
  {"aar":2022,"til":"2022-12-31","omsaetning":81.860,"resultat":-173.494,"kilde":"40-F 2023"},
  {"aar":2023,"til":"2023-12-31","omsaetning":102.368,"resultat":-177.716,"kilde":"40-F 2024"},
  {"aar":2024,"til":"2024-12-31","omsaetning":69.731,"resultat":-324.245,"kilde":"40-F 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":99.370,"resultat":-90.914,"kilde":"40-F 2025"}
 ],
 "ttm":{"til":"2026-06-30","omsaetning":106.158,"resultat":-77.266,"kilde":"40-F 2025 + 6-K 2. kvt. 2026"},
 "kvartal":{"til":"2026-06-30","omsaetning":20.598,"sammeKvartalAaretFoer":17.842,"kilde":"6-K 2. kvt. 2026"},
 "aktie":{"aktier":301506494,"aktierDato":"2026-06-30","kilde":"6-K 2. kvt. 2026"}
};
