/* Nøgletal for Serve Robotics. Regnskabstal fra Serve Robotics egne regnskaber hos SEC (Revenues og Net loss, US GAAP, oplyst i tusinde dollar i 10-K 2025 og 10-Q 3. kvt. 2026 og i hele dollar i 10-K 2023 og 10-K 2024, her omregnet til millioner).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["serve-robotics"]={
 "skema":2,"navn":"Serve Robotics","ticker":"SERV","valuta":"USD","hentet":"2026-11-13",
 "kilde":"Serve Robotics’ regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001832483&type=10-",
 "aar":[
  {"aar":2022,"til":"2022-12-31","omsaetning":0.108,"resultat":-21.855,"kilde":"10-K 2023"},
  {"aar":2023,"til":"2023-12-31","omsaetning":0.208,"resultat":-24.814,"kilde":"10-K 2024"},
  {"aar":2024,"til":"2024-12-31","omsaetning":1.813,"resultat":-39.191,"kilde":"10-K 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":2.651,"resultat":-101.361,"kilde":"10-K 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":9.939,"resultat":-206.634,"kilde":"10-K 2025 + 10-Q 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":2.835,"sammeKvartalAaretFoer":0.687,"kilde":"10-Q 3. kvt. 2026"},
 "aktie":{"aktier":87884752,"aktierDato":"2026-11-03","kilde":"10-Q 3. kvt. 2026, forsiden"}
};
