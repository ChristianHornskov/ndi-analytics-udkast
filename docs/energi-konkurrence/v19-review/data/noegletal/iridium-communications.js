/* Nøgletal for Iridium Communications. Regnskabstal fra Iridiums egne regnskaber hos SEC (Total revenue og Net income).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["iridium-communications"]={
 "skema":2,"navn":"Iridium Communications","ticker":"IRDM","valuta":"USD","hentet":"2026-11-13",
 "kilde":"Iridiums regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001418819&type=10-",
 "aar":[
  {"aar":2022,"til":"2022-12-31","omsaetning":721.034,"resultat":8.722,"kilde":"10-K 2024"},
  {"aar":2023,"til":"2023-12-31","omsaetning":790.723,"resultat":15.415,"kilde":"10-K 2025"},
  {"aar":2024,"til":"2024-12-31","omsaetning":830.682,"resultat":112.776,"kilde":"10-K 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":871.659,"resultat":114.372,"kilde":"10-K 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":902.967,"resultat":163.034,"kilde":"10-K 2025 + 10-Q 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":245.733,"sammeKvartalAaretFoer":226.935,"kilde":"10-Q 3. kvt. 2026"},
 "aktie":{"aktier":106158479,"aktierDato":"2026-10-13","kilde":"10-Q 3. kvt. 2026, forsiden"}
};
