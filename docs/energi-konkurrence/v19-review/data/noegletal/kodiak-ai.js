/* Nøgletal for Kodiak AI. Regnskabstal fra Kodiak AIs egne regnskaber hos SEC (Revenues og Net loss / Net (loss) income attributable to common stockholders).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["kodiak-ai"]={
 "skema":2,"navn":"Kodiak AI","ticker":"KDK","valuta":"USD","hentet":"2026-11-14",
 "kilde":"Kodiak AIs regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001853138&type=10-",
 "aar":[
  {"aar":2023,"til":"2023-12-31","omsaetning":16.946,"resultat":-56.945,"kilde":"10-K 2025"},
  {"aar":2024,"til":"2024-12-31","omsaetning":14.933,"resultat":-69.459,"kilde":"10-K 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":3.797,"resultat":-585.525,"kilde":"10-K 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":9.351,"resultat":-66.312,"kilde":"10-K 2025 + 10-Q 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":2.969,"sammeKvartalAaretFoer":0.770,"kilde":"10-Q 3. kvt. 2026"},
 "aktie":{"aktier":204083603,"aktierDato":"2026-10-30","kilde":"10-Q 3. kvt. 2026, forsiden"}
};
