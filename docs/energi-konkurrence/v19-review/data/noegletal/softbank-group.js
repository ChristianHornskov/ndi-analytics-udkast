/* Nøgletal for SoftBank Group. Regnskabstal fra SoftBank Groups egne IFRS-regnskaber (Financial Report og Consolidated Financial Report).
   Omsætning er "Net sales" og resultat er "Net income attributable to owners of the parent" (selskabet har store minoritetsinteresser).
   Beløb i mio. i selskabets regnskabsvaluta (JPY). Kilden runder til nærmeste million. Regnskabsåret slutter 31.3. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = regnskabsåret til 31.3.2026 + 6 mdr. til 30.9.2026 - 6 mdr. til 30.9.2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["softbank-group"]={
 "skema":2,"navn":"SoftBank Group","ticker":"9984","valuta":"JPY","hentet":"2026-11-14",
 "kilde":"SoftBank Groups egne regnskaber","kildeUrl":"https://group.softbank/en/ir/financials/annual_reports",
 "aar":[
  {"aar":2023,"etiket":"2022/23","til":"2023-03-31","omsaetning":6570439.0,"resultat":-970144.0,"kilde":"K2c (Financial Report 2024) + K1 elleveårsoversigt"},
  {"aar":2024,"etiket":"2023/24","til":"2024-03-31","omsaetning":6756500.0,"resultat":-227646.0,"kilde":"K2b (Financial Report 2025) + K2c + K1 elleveårsoversigt"},
  {"aar":2025,"etiket":"2024/25","til":"2025-03-31","omsaetning":7243752.0,"resultat":1153332.0,"kilde":"K1b + K2b + K4b"},
  {"aar":2026,"etiket":"2025/26","til":"2026-03-31","omsaetning":7798650.0,"resultat":5002271.0,"kilde":"K1b + K4b + K1 elleveårsoversigt"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":8296844.0,"resultat":1310198.0,"kilde":"K1b + K3 (bekræftet i K5)"},
 "kvartal":{"til":"2026-09-30","omsaetning":2215446.0,"sammeKvartalAaretFoer":1916502.0,"kilde":"K3 (tre måneder til 30.9.), bekræftet med K3 halvår minus 1. kvartal i K5c datasheet"},
 "aktie":{"aktier":5699306663,"aktierDato":"2026-09-30","kilde":"K3 side 2: 5.711.848.120 udstedte minus 12.541.457 egne aktier (samme tal på General Stock Information, K7)"}
};
