/* Nøgletal for Sigma Lithium. Regnskabstal fra Sigma Lithiums egne regnskaber hos SEC (Net sales revenue og Net loss for the year, IFRS, oplyst i tusinde dollar og her omregnet til millioner).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Kun 2024 og 2025 indgår, fordi præsentationsvalutaen først er USD fra 1.1.2024. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["sigma-lithium"]={
 "skema":2,"navn":"Sigma Lithium","ticker":"SGML","valuta":"USD","hentet":"2026-11-14",
 "kilde":"Sigma Lithiums regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001848309&type=40-F",
 "aar":[
  {"aar":2024,"til":"2024-12-31","omsaetning":151.352,"resultat":-51.396,"kilde":"40-F 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":110.012,"resultat":-50.185,"kilde":"40-F 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":127.467,"resultat":-41.868,"kilde":"40-F 2025 + 6-K 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":13.522,"sammeKvartalAaretFoer":28.549,"kilde":"6-K 3. kvt. 2026"},
 "aktie":{"aktier":112690313,"aktierDato":"2026-11-13","kilde":"6-K 3. kvt. 2026, Current Share Data, 13.11.2026"}
};
