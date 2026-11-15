/* Nøgletal for MNTN. Regnskabstal fra MNTNs egne regnskaber hos SEC (Revenue og Net loss, US GAAP, oplyst i tusinde dollar og her omregnet til millioner. Aktier er klasse A plus klasse B. Kun tre år, fordi selskabet blev børsnoteret i 2025).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = 2025 plus de første ni måneder af 2026 minus de første ni måneder af 2025. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["mntn"]={
 "skema":2,"navn":"MNTN","ticker":"MNTN","valuta":"USD","hentet":"2026-11-13",
 "kilde":"MNTNs regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001891027&type=10-",
 "aar":[
  {"aar":2023,"til":"2023-12-31","omsaetning":176.3,"resultat":-53.3,"kilde":"prospekt (424B4) 2025"},
  {"aar":2024,"til":"2024-12-31","omsaetning":225.6,"resultat":-32.9,"kilde":"10-K 2025"},
  {"aar":2025,"til":"2025-12-31","omsaetning":290.1,"resultat":-6.4,"kilde":"10-K 2025"}
 ],
 "ttm":{"til":"2026-09-30","omsaetning":323.6,"resultat":57.6,"kilde":"10-K 2025 + 10-Q 3. kvt. 2026"},
 "kvartal":{"til":"2026-09-30","omsaetning":80.3,"sammeKvartalAaretFoer":70.0,"kilde":"10-Q 3. kvt. 2026"},
 "aktie":{"aktier":75789711,"aktierDato":"2026-10-30","kilde":"10-Q 3. kvt. 2026, forsiden"}
};
