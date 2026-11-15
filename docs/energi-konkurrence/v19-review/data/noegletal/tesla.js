/* Nøgletal for Tesla. Regnskabstal fra Teslas egne regnskaber hos SEC (Total revenues og Net income attributable to common stockholders).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["tesla"]={
 "skema":2,"navn":"Tesla","ticker":"TSLA","valuta":"USD","hentet":"2026-11-14",
 "kilde":"Teslas regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001318605&type=10-",
 "aar":[
  {"aar":2022,"til":"2022-12-31","omsaetning":81462.0,"resultat":12556.0,"kilde":"K2"},
  {"aar":2023,"til":"2023-12-31","omsaetning":96773.0,"resultat":14997.0,"kilde":"K1"},
  {"aar":2024,"til":"2024-12-31","omsaetning":97690.0,"resultat":7091.0,"kilde":"K1"},
  {"aar":2025,"til":"2025-12-31","omsaetning":94827.0,"resultat":3794.0,"kilde":"K1"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":103570.0,"resultat":3218.0,"kilde":"K1+K3"},
 "kvartal":{"til":"2026-09-30","omsaetning":28046.0,"sammeKvartalAaretFoer":28095.0,"kilde":"K3"},
 "aktie":{"aktier":3952757946,"aktierDato":"2026-10-15","kilde":"K3 forside"}
};
