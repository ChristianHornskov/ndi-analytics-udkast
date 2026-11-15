/* Nøgletal for Circle Internet Group. Regnskabstal fra Circles egne regnskaber hos SEC (Total revenue and reserve income og Net income (loss) attributable to common stockholders, US GAAP, oplyst i tusinde dollar og her omregnet til millioner. Aktier er klasse A plus klasse B. Kun klasse A handles på NYSE).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["circle-internet-group"]={
 "skema":2,"navn":"Circle Internet Group","ticker":"CRCL","valuta":"USD","hentet":"2026-11-13",
 "kilde":"Circles regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001876042&type=10-",
 "aar":[
  {"aar":2022,"til":"2022-12-31","omsaetning":772.052,"resultat":-768.847,"kilde":"prospekt (424B4) 2025"},
  {"aar":2023,"til":"2023-12-31","omsaetning":1450.466,"resultat":267.562,"kilde":"10-K 2025"},
  {"aar":2024,"til":"2024-12-31","omsaetning":1676.253,"resultat":155.667,"kilde":"10-K 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":2746.642,"resultat":-69.508,"kilde":"10-K 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":3030.568,"resultat":462.914,"kilde":"10-K 2025 + 10-Q 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":864.888,"sammeKvartalAaretFoer":739.759,"kilde":"10-Q 3. kvt. 2026"},
 "aktie":{"aktier":256553104,"aktierDato":"2026-10-29","kilde":"10-Q 3. kvt. 2026, forsiden"}
};
