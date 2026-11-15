/* Nøgletal for Cipher Digital. Regnskabstal fra Cipher Digitals egne regnskaber hos SEC (Revenue og Net loss available for common stockholders).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["cipher-mining"]={
 "skema":2,"navn":"Cipher Digital","ticker":"CIFR","valuta":"USD","hentet":"2026-11-14",
 "kilde":"Cipher Digitals regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001819989&type=10-",
 "aar":[
  {"aar":2022,"til":"2022-12-31","omsaetning":3.037,"resultat":-39.053,"kilde":"10-K 2023"},
  {"aar":2023,"til":"2023-12-31","omsaetning":126.842,"resultat":-25.777,"kilde":"10-K 2025"},
  {"aar":2024,"til":"2024-12-31","omsaetning":151.270,"resultat":-44.635,"kilde":"10-K 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":223.942,"resultat":-822.244,"kilde":"10-K 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":146.087,"resultat":-1084.445,"kilde":"10-K 2025 + 10-Q 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":26.701,"sammeKvartalAaretFoer":71.707,"kilde":"10-Q 3. kvt. 2026"},
 "aktie":{"aktier":456365113,"aktierDato":"2026-10-30","kilde":"10-Q 3. kvt. 2026, forsiden"}
};
