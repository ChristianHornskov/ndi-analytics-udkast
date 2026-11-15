/* Nøgletal for United States Antimony. Regnskabstal fra United States Antimonys egne regnskaber hos SEC (Revenues og Net loss).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["united-states-antimony"]={
 "skema":2,"navn":"United States Antimony","ticker":"UAMY","valuta":"USD","hentet":"2026-11-14",
 "kilde":"United States Antimonys regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000101538&type=10-",
 "aar":[
  {"aar":2022,"til":"2022-12-31","omsaetning":11.045,"resultat":0.429,"kilde":"10-K 2023"},
  {"aar":2023,"til":"2023-12-31","omsaetning":8.693,"resultat":-6.348,"kilde":"10-K 2024"},
  {"aar":2024,"til":"2024-12-31","omsaetning":14.938,"resultat":-1.730,"kilde":"10-K 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":39.258,"resultat":-4.340,"kilde":"10-K 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":37.874,"resultat":-20.997,"kilde":"10-K 2025 + 10-Q 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":10.133,"sammeKvartalAaretFoer":8.702,"kilde":"10-Q 3. kvt. 2026"},
 "aktie":{"aktier":149329434,"aktierDato":"2026-11-09","kilde":"10-Q 3. kvt. 2026, forsiden"}
};
