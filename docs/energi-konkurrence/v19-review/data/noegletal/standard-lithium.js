/* Nøgletal for Standard Lithium. Regnskabstal fra Standard Lithiums egne regnskaber hos SEC (Form 40-F og Form 6-K).
   Beløb i mio. i selskabets regnskabsvaluta (USD). Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025 + 9 mdr. 2026 - 9 mdr. 2025. Filen skal erstattes af det automatiske datajob.
   Der er kun tre reviderede perioder i USD: året til 30.6.2024, overgangsperioden på 6 måneder til 31.12.2024, og året til 31.12.2025. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["standard-lithium"]={
 "skema":2,"navn":"Standard Lithium","ticker":"SLI","valuta":"USD","hentet":"2026-11-13",
 "kilde":"Standard Lithiums regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001537137&type=40-F",
 "aar":[
  {"aar":2023,"etiket":"2023/24","til":"2024-06-30","omsaetning":0,"resultat":105.801,"kilde":"40-F 2025"},
  {"aar":2024,"etiket":"2024 (6 mdr.)","til":"2024-12-31","omsaetning":0,"resultat":-29.511,"kilde":"40-F 2025"},
  {"aar":2025,"etiket":"2025","til":"2025-12-31","omsaetning":0,"resultat":-48.398,"kilde":"40-F 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":0,"resultat":-78.252,"kilde":"40-F 2025 + 6-K 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":0,"sammeKvartalAaretFoer":0,"kilde":"6-K 3. kvt. 2026"},
 "aktie":{"aktier":246784162,"aktierDato":"2026-09-30","kilde":"6-K 3. kvt. 2026, egenkapitalopgørelsen"}
};
