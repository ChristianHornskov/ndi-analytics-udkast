/* v18: Christians afgjorte valg D1-D5 (30.10.2026). Spejl af _kilde/valg.py. Ret begge steder og byg igen. */
window.NDI_VALG = {
  D1_afkastmodul: true,        // afkastmodulet på forsiden som v5
  D1_kalender_foldet: true,    // afkastkalenderen foldet på forsiden bag en knap
  D1_kursgraf_aar: 5,          // tema/selskab: kurs ca. 5 år bagud uden %
  D2_standardtema: "mørk",     // "mørk" | "lys"
  D3_fond: "PMINDI",           // kun PMINDI, ingen vælger
  D3_fondsvaelger: false,
  D4_tidligere_kun_alle: true, // tidligere selskaber kun under "Alle selskaber"
  D5_topliste: "top10",        // "de ti største"
  procesvisualer_vis: false,  // Leo 18:13: Claudes procesvisualer på temasiderne (data/procesvisualer.js). I review til 08:00. true = vises
  Aa9_nasdaq: true             // Å9 (30.10 17:42): Leo (via Byggespec): serien vises allerede på live og må bruges. Ordlyd ordret fra v5 forside-v5.mjs:22, linjenavn og farve fra :15. false = ingen spor af Nasdaq
};
