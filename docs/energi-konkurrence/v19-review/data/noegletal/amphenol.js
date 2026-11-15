/* Nøgletal for Amphenol. Regnskabstal fra Amphenols egne regnskaber hos SEC (Net sales og Net income attributable to Amphenol Corporation).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL.amphenol={
 "skema":2,"navn":"Amphenol","ticker":"APH","valuta":"USD","hentet":"2026-11-13",
 "kilde":"Amphenols regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000820313&type=10-",
 "aar":[
  {"aar":2022,"til":"2022-12-31","omsaetning":12623.000,"resultat":1902.300,"kilde":"10-K 2024"},
  {"aar":2023,"til":"2023-12-31","omsaetning":12554.700,"resultat":1928.000,"kilde":"10-K 2025"},
  {"aar":2024,"til":"2024-12-31","omsaetning":15222.700,"resultat":2424.000,"kilde":"10-K 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":23094.700,"resultat":4270.300,"kilde":"10-K 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":33046.900,"resultat":5932.000,"kilde":"10-K 2025 + 10-Q 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":10229.700,"sammeKvartalAaretFoer":6194.400,"kilde":"10-Q 3. kvt. 2026"},
 "aktie":{"aktier":2469261188,"aktierDato":"2026-10-27","kilde":"10-Q 3. kvt. 2026, forsiden"}
};
