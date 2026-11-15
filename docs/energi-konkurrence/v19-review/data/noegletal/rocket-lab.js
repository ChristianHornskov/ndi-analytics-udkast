/* Nøgletal for Rocket Lab. Regnskabstal fra Rocket Labs egne regnskaber hos SEC (Total revenues og Net loss).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["rocket-lab"]={
 "skema":2,"navn":"Rocket Lab","ticker":"RKLB","valuta":"USD","hentet":"2026-11-13",
 "kilde":"Rocket Labs regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001819994&type=10-",
 "aar":[
  {"aar":2022,"til":"2022-12-31","omsaetning":210.996,"resultat":-135.944,"kilde":"10-K 2024"},
  {"aar":2023,"til":"2023-12-31","omsaetning":244.592,"resultat":-182.571,"kilde":"10-K 2025"},
  {"aar":2024,"til":"2024-12-31","omsaetning":436.214,"resultat":-190.175,"kilde":"10-K 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":601.799,"resultat":-198.209,"kilde":"10-K 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":881.9,"resultat":-226.879,"kilde":"10-K 2025 + 10-Q 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":267.834,"sammeKvartalAaretFoer":155.08,"kilde":"10-Q 3. kvt. 2026"},
 "aktie":{"aktier":632020915,"aktierDato":"2026-11-04","kilde":"10-Q 3. kvt. 2026, forsiden"}
};
