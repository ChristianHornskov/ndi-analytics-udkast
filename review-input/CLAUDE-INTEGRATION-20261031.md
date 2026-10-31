# Claude-grafik: selektiv integration, 31. oktober 2026

Kilde: claude-v19-grafik-20261031, commit 871aa329, baseret på 5612ea1e. Kildesnapshots er gemt i claude-grafik/. build.py anvender claude_integration.py efter de eksisterende tilpasninger. Der er ikke flettet til main eller udgivet på Wix/Azure.

## Integreret
- Mobil: 52-ugers-intervaller med vandrette vægtbjælker og den oprindelige farveskala; desktop beholder sit histogram.
- Kalenderens mobile orientering og den nye nedtursgraf. Widgetkalenderen har samme mobile orientering og bruger sin egen valgte fondsklasses eksisterende tal.
- Fasegrafens kurver og fasevalg, fysisk AI's selskabsfliser, eToro/SoFi-topanimationer.
- Omsætningsfigurer, der beregnes fra de eksisterende tal i selskabssidernes markup.
- Rumfartens procentfordelinger og kryptotemaets vægtbjælker. Kryptosidens naboafsnit er bevaret; størrelsesfiguren er det korrekte integrationspunkt.
- Logoets baggrundsplade beskærer ikke længere logoet i lyst tema.

## Godkendte fravalg
Christian har set før/efter og godkendt:
- Kompakte eksisterende nøgletal og risiko bevares.
- Eksisterende omkostningssektion bevares uændret.

Andre Grok-forslag er fortsat til vurdering. Ingen anbefaling om at beholde en gammel version regnes som godkendt, før Christian har set billederne og sagt ja. Forslagene til kalender/nedture/52-ugers-visning er afløst af Christians konkrete valg af Claude-løsningerne.

## Kontrol
19 automatiske tests og 5 runtime-tests for medier bestået. Browserkontroller omfatter mobilkalenderens klasseskift, 52-ugersintervallets selskabsfilter, nedtursgraf, fasevalg, fysisk AI's selskabspanel, eToro/SoFi-genafspilning, Tesla-omsætning, krypto og rumfart. SpaceX kontrolleret for mobiloverløb og bevarede sektioner. Krypto og fasegraf kontrolleret i lyst desktoptema; flere øvrige i mørkt tema.

Begrænsninger: Ingen test på fysisk iPhone/Safari eller inde i Wix. Ingen ny samlet faktakontrol af eksisterende indhold. Porteføljeknappens nye illustration er et reviewforslag til Christian, ikke en endeligt godkendt retning.
