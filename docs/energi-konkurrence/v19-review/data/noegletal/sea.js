/* Nøgletal for Sea. Regnskabstal fra Seas egne regnskaber hos SEC (Total revenue og Net income attributable to Sea Limited’s ordinary shareholders).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL.sea={
 "skema":2,"navn":"Sea","ticker":"SE","valuta":"USD","hentet":"2026-11-13",
 "kilde":"Seas regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001703399&type=20-",
 "aar":[
  {"aar":2022,"til":"2022-12-31","omsaetning":12449.705,"resultat":-1651.421,"kilde":"20-F 2024"},
  {"aar":2023,"til":"2023-12-31","omsaetning":13063.560,"resultat":150.726,"kilde":"20-F 2025"},
  {"aar":2024,"til":"2024-12-31","omsaetning":16819.866,"resultat":444.321,"kilde":"20-F 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":22938.469,"resultat":1578.149,"kilde":"20-F 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":30319.420,"resultat":1756.615,"kilde":"20-F 2025 + 6-K 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":8582.284,"sammeKvartalAaretFoer":5986.024,"kilde":"6-K 3. kvt. 2026"},
 "aktie":{"aktier":611034168,"aktierDato":"2025-12-31","kilde":"20-F 2025, forsiden"}
};
