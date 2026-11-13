/* Nøgletal for Upstart. Regnskabstal fra Upstarts egne regnskaber hos SEC (Total revenue og Net income (loss)).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL.upstart={
 "skema":2,"navn":"Upstart","ticker":"UPST","valuta":"USD","hentet":"2026-11-12",
 "kilde":"Upstarts regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001647639&type=10-",
 "aar":[
  {"aar":2022,"til":"2022-12-31","omsaetning":842.444,"resultat":-108.665,"kilde":"10-K 2024"},
  {"aar":2023,"til":"2023-12-31","omsaetning":513.562,"resultat":-240.132,"kilde":"10-K 2025"},
  {"aar":2024,"til":"2024-12-31","omsaetning":636.528,"resultat":-128.581,"kilde":"10-K 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":1043.857,"resultat":53.601,"kilde":"10-K 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":1339.534,"resultat":65.107,"kilde":"10-K 2025 + 10-Q 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":370.522,"sammeKvartalAaretFoer":277.105,"kilde":"10-Q 3. kvt. 2026"},
 "aktie":{"dato":"2026-11-11","kurs":20.56,"markedsvaerdi":2033.562,"aktier":98908658,"aktierDato":"2026-10-27","kilde":"10-Q 3. kvt. 2026, forsiden"}
};
