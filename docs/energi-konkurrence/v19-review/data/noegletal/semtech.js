/* Nøgletal for Semtech. Regnskabstal fra Semtechs egne regnskaber hos SEC (Total net sales og Net (loss) income attributable to common stockholders / Net income (loss)).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2025/26 + 6 mdr. til 26.7.2026 - 6 mdr. til 27.7.2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL.semtech={
 "skema":2,"navn":"Semtech","ticker":"SMTC","valuta":"USD","hentet":"2026-11-13",
 "kilde":"Semtechs regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000088941&type=10-",
 "aar":[
  {"aar":2023,"etiket":"2022/23","til":"2023-01-29","omsaetning":756.533,"resultat":61.380,"kilde":"K2"},
  {"aar":2024,"etiket":"2023/24","til":"2024-01-28","omsaetning":868.758,"resultat":-1092.030,"kilde":"K1"},
  {"aar":2025,"etiket":"2024/25","til":"2025-01-26","omsaetning":909.287,"resultat":-161.896,"kilde":"K1"},
  {"aar":2026,"etiket":"2025/26","til":"2026-01-25","omsaetning":1049.975,"resultat":-40.376,"kilde":"K1"}
 ],
 "ttm":{"til":"2026-07-26","omsaetning":1174.215,"resultat":154.027,"kilde":"K1+K3"},
 "kvartal":{"til":"2026-07-26","omsaetning":341.871,"sammeKvartalAaretFoer":257.589,"kilde":"K3"},
 "aktie":{"aktier":93325626,"aktierDato":"2026-08-21","kilde":"K3 forside"}
};
