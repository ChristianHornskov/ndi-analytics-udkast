/* Nøgletal for NVIDIA. Regnskabstal fra NVIDIAs egne regnskaber hos SEC (Revenue og Net income, US GAAP, oplyst i millioner dollar. Regnskabsåret slutter den sidste søndag i januar, og etiket viser regnskabsåret).
   Beløb i mio. i selskabets regnskabsvaluta. Kurs og kursnøgletal kommer fra fondens kursdata.
   12 mdr. = årsregnskab 2026 plus de første seks måneder af 2027 minus de første seks måneder af 2026. Filen skal erstattes af det automatiske datajob. */
window.NDI_NOEGLETAL=window.NDI_NOEGLETAL||{};
window.NDI_NOEGLETAL["nvidia"]={
 "skema":2,"navn":"NVIDIA","ticker":"NVDA","valuta":"USD","hentet":"2026-11-13",
 "kilde":"NVIDIAs regnskaber hos SEC","kildeUrl":"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001045810&type=10-",
 "aar":[
  {"aar":2023,"til":"2023-01-29","etiket":"2022/23","omsaetning":26974.000,"resultat":4368.000,"kilde":"10-K 2025"},
  {"aar":2024,"til":"2024-01-28","etiket":"2023/24","omsaetning":60922.000,"resultat":29760.000,"kilde":"10-K 2026"},
  {"aar":2025,"til":"2025-01-26","etiket":"2024/25","omsaetning":130497.000,"resultat":72880.000,"kilde":"10-K 2026"},
  {"aar":2026,"til":"2026-01-25","etiket":"2025/26","omsaetning":215938.000,"resultat":120067.000,"kilde":"10-K 2026"}
 ],
 "ttm":{"til":"2026-07-26","omsaetning":302970.000,"resultat":192880.000,"kilde":"10-K 2026 + 10-Q 2. kvt. 2027"},
 "kvartal":{"til":"2026-07-26","omsaetning":96221.000,"sammeKvartalAaretFoer":46743.000,"kilde":"10-Q 2. kvt. 2027"},
 "aktie":{"aktier":24100000000,"aktierDato":"2026-08-21","kilde":"10-Q 2. kvt. 2027, forsiden"}
};
