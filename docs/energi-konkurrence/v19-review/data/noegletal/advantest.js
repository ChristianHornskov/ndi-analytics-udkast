/* Nøgletal for Advantest. Regnskabstal fra Advantests egne regnskaber (Annual Securities Report, Semi-Annual Securities Report og tanshin, IFRS).
   Omsætning er "Net sales" og resultat er "Net income attributable to: Owners of the parent".
   Beløb i mio. i selskabets regnskabsvaluta (JPY). Kilden runder til nærmeste million. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = regnskabsåret til 31.3.2026 + 6 mdr. til 30.9.2026 - 6 mdr. til 30.9.2025.
   2. kvartal = halvåret til 30.9.2026 minus første kvartal til 30.6.2026 (officielle tanshin). Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL.advantest={
 "skema":2,"navn":"Advantest","ticker":"6857","valuta":"JPY","hentet":"2026-11-13",
 "kilde":"Advantests egne regnskaber","kildeUrl":"https://www.advantest.com/en/investors/ir-library/report/",
 "aar":[
  {"aar":2023,"etiket":"2022/23","til":"2023-03-31","omsaetning":560191.0,"resultat":130400.0,"kilde":"Annual Securities Report FY2025"},
  {"aar":2024,"etiket":"2023/24","til":"2024-03-31","omsaetning":486507.0,"resultat":62290.0,"kilde":"Annual Securities Report FY2024"},
  {"aar":2025,"etiket":"2024/25","til":"2025-03-31","omsaetning":779707.0,"resultat":161177.0,"kilde":"Annual Securities Report FY2025"},
  {"aar":2026,"etiket":"2025/26","til":"2026-03-31","omsaetning":1128610.0,"resultat":375353.0,"kilde":"Annual Securities Report FY2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":1447077.0,"resultat":573623.0,"kilde":"Annual Securities Report FY2025 + Semi-Annual Securities Report H1 FY2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":477727.0,"sammeKvartalAaretFoer":262957.0,"kilde":"H1 tanshin 28.10.2026 minus Q1 tanshin 29.7.2026, og tilsvarende året før"},
 "aktie":{"aktier":721952905,"aktierDato":"2026-09-30","kilde":"FY2026 Q2 tanshin 28.10.2026: 732000000 udstedt minus 10047095 egne aktier"}
};
