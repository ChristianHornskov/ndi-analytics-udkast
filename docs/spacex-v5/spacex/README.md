# SpaceX selskabsudkast · 24. oktober 2026

## Åbn
Start v4-lab/scripts/preview.mjs fra v4-lab med PORT=8896. Åbn /v5/#selskab/US84615Q1031.

## Redaktionel idé
Følg selskabet fra mekanisme til forretning, historiske resultater og markedets forventninger. Rumfart, Starlink og AI har hver deres forklaring, fremhævelse i kredsløbsillustrationen og økonomi. Siden skal kunne bruges som struktur for andre selskaber, men deres illustration og hovedfortælling skal være egne.

Energireference: https://christianhornskov.github.io/ndi-analytics-udkast/energi-konkurrence/runde3/ (brugerens reference 5d90ea3). Genbruger brandets ro, store billeder og tydelige afsnit; ikke energisidens komposition.

## Datagrundlag
- Q3 2026 samt Q2-sammenligning: https://www.sec.gov/Archives/edgar/data/1181412/000162828026066482/spaceexplorationtechnologi.htm. Offentliggjort 20. oktober. Milliarder USD; driftsresultat og anlægsinvesteringer vises særskilt.
- Børsnotering/ticker: https://ir.spacex.com/faqs-and-contact/
- price.json: faktiske daglige lukkekurser fra Yahoo Finance. Kilde og hentetid står i filen. Serien starter 12. juni og slutter 23. oktober 2026. Et gemt datasæt, ikke en livekurs. Ingen konstrueret 12-månedershistorik.
- Fondsvægte: eksisterende reused-data.json; beholdningsdato står på siden.
- demo2.jpg: https://www.nasa.gov/wp-content/uploads/2023/03/nhq202005300065.jpg. Foto NASA/Joel Kowsky. Kildeside: https://www.nasa.gov/image-article/spacex-demo-2-mission-launches-into-history/
- Videoer A0FZIwabctw og KzpVUXxdc68: officielle SpaceX-videoer, verificeret via YouTube oEmbed. Miniaturer hentet fra de returnerede thumbnail-adresser. Afspilning indlæses først ved klik.
- X: to officielle opslag, 2108291133025698301 og 2109962954762527179, kontrolleret via oEmbed 24. oktober. Prototypens udvalg er tydeligt markeret. Den fælles Azure-strøm erstatter eksemplerne, når den indeholder et SpaceX-udvalg. Ingen rå opslagstekst eller medier er arkiveret.

## Kontrol
7 automatiske tests bestået: eksisterende sider i begge afdelinger, ruter og fondsvægte samt kursdatasæt og grafgeometri (også flade serier).
I browseren kontrolleret: Starlink-knap skifter forklaring og illustration; Q2 skifter regnskabstal; månedsperiode skifter kursændring; fondsskift viser 1,4/1,2 procent; video-knap opretter korrekt YouTube-iframe. Ingen konsolfejl ved sidste kontrol. DOM-måling ved 390 px: ingen vandret overflow. Desktopbillede visuelt gennemgået; billedplacering rettet og mobilens vandrette kapitelscroll fjernet. Browserens screenshotfunktion er ustabil, så mobilens fulde visuelle gennemgang er ikke afsluttet.

## Afgrænsning
Udkast til Christians gennemgang, ikke publiceret på Wix. Regnskabs- og kursdata er daterede snapshots. Automatisk SpaceX-udvalg fra X mangler endnu. Videoafspilningens iframe er kontrolleret, men fuld afspilning er ikke bekræftet. Den gule kommentarkasse skal fjernes ved en senere publicering.
