/* Nøgletal for Silicon Motion. Regnskabstal fra Silicon Motions egne regnskaber hos SEC (Net sales og Net income, US GAAP, oplyst i tusinde dollar og her omregnet til millioner. Et ADS svarer til fire stamaktier).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 plus de første ni måneder af 2026 minus de første ni måneder af 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["silicon-motion"]={
 "skema":2,"navn":"Silicon Motion","ticker":"SIMO","valuta":"USD","adsForhold":4,"hentet":"2026-11-13",
 "kilde":"Silicon Motions regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001329394&type=20-F",
 "aar":[
  {"aar":2022,"til":"2022-12-31","omsaetning":945.921,"resultat":172.510,"kilde":"20-F 2024"},
  {"aar":2023,"til":"2023-12-31","omsaetning":639.142,"resultat":52.873,"kilde":"20-F 2025"},
  {"aar":2024,"til":"2024-12-31","omsaetning":803.552,"resultat":89.249,"kilde":"20-F 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":885.627,"resultat":122.635,"kilde":"20-F 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":1631.784,"resultat":315.969,"kilde":"20-F 2025 + 6-K 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":560.216,"sammeKvartalAaretFoer":241.999,"kilde":"6-K 3. kvt. 2026"},
 "aktie":{"aktier":135631340,"aktierDato":"2026-03-31","kilde":"20-F 2025, Item 7"}
};
