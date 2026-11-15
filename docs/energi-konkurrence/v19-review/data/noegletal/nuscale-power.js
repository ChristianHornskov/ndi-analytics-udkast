/* Nøgletal for NuScale Power. Regnskabstal fra NuScale Powers egne regnskaber hos SEC
   (Revenue og Net Loss Attributable to Class A Common Stockholders).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["nuscale-power"]={
 "skema":2,"navn":"NuScale Power","ticker":"SMR","valuta":"USD","hentet":"2026-11-13",
 "kilde":"NuScale Powers regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001822966&type=10-",
 "aar":[
  {"aar":2022,"til":"2022-12-31","omsaetning":11.804,"resultat":-25.914,"kilde":"10-K 2024"},
  {"aar":2023,"til":"2023-12-31","omsaetning":22.810,"resultat":-58.362,"kilde":"10-K 2025"},
  {"aar":2024,"til":"2024-12-31","omsaetning":37.045,"resultat":-136.623,"kilde":"10-K 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":31.479,"resultat":-355.794,"kilde":"10-K 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":2.729,"resultat":-186.036,"kilde":"10-K 2025 + 10-Q 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":0.281,"sammeKvartalAaretFoer":8.242,"kilde":"10-Q 3. kvt. 2026"},
 "aktie":{"aktier":410568229,"aktierDato":"2026-10-30","kilde":"10-Q 3. kvt. 2026, forsiden"}
};
