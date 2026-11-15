/* Nøgletal for Samsung Electronics. Regnskabstal fra Samsungs egne regnskaber (Business Report og reviewede kvartalsregnskaber, K-IFRS).
   Omsætning er "Revenue" og resultat er "Profit attributable to owners of the parent company".
   Beløb i mio. i selskabets regnskabsvaluta (KRW). Fonden ejer GDR'er i London (SMSN), der handles i USD. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 1. halvår 2026 - 1. halvår 2025. Regnskabet for 3. kvartal 2026 findes endnu kun med afrundede tal. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["samsung-electronics"]={
 "skema":2,"navn":"Samsung Electronics","ticker":"SMSN","valuta":"KRW","kursValuta":"USD","hentet":"2026-11-14",
 "kilde":"Samsungs egne regnskaber","kildeUrl":"https://www.samsung.com/global/ir/reports-disclosures/business-report/",
 "aar":[
  {"aar":2022,"til":"2022-12-31","omsaetning":302231.360,"resultat":54730.018,"kilde":"Business Report 2024 og 2023"},
  {"aar":2023,"til":"2023-12-31","omsaetning":258935.494,"resultat":14473.401,"kilde":"Business Report 2025"},
  {"aar":2024,"til":"2024-12-31","omsaetning":300870.903,"resultat":33621.363,"kilde":"Business Report 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":333605.938,"resultat":44260.956,"kilde":"Business Report 2025"}
 ],
 "ttm":{"til":"2026-06-30","omsaetning":485272.032,"resultat":149669.173,"kilde":"Business Report 2025 + halvårsrapport 2026"},
 "kvartal":{"til":"2026-06-30","omsaetning":171499.470,"sammeKvartalAaretFoer":74566.317,"kilde":"Halvårsrapport 2026"},
 "aktie":{"aktier":5764191903,"aktierDato":"2026-06-30","kilde":"Halvårsrapport 2026, stamaktier i omløb"}
};
