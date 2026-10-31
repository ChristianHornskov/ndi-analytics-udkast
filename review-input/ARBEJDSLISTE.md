# Arbejdsliste — 31. oktober 2026

## Arbejdsform
Delrapporter, tests og commits afslutter ikke opgaven. Fortsæt uafhængige autoriserede punkter. Gamle designs, der foretrækkes frem for forslag, kræver Christians billedbaserede godkendelse.

## Godkendt og indarbejdet
- Kompakte eksisterende nøgletal/risiko og uændrede omkostninger.
- Lodret mobilkalender, rød/grøn; Claudes nedtursgraf.
- 52-ugers-visning: desktopdiagram, mobile vægtbjælker i oprindelig farveskala.
- Selskaber: nye mobilkort med røde/grønne afkast; sorterbar tabel på computer.
- Sektorer: ét felt pr. sektor, ikke et felt for hvert selskab.

## Seneste arbejde
- Claude-integration committed/pushet som 2d10201; 19 tests og 5 medietests bestod.
- Geografiens vægtbjælker bruger samme kontrollerede data og fælles 0–100 %-skala; filtre bevaret.
- Fysisk AI: inaktive grupper er læselige i lyst tema.
- Mobilkort: alle seks afkastperioder, topafstand, kort historik og kursdato bevaret. Sortering, selskabslinks, søgning og tomt resultat kontrolleret ved 390 px.
- Rettet søgningens gamle callback, som ellers genindførte en forældet firekolonners tabel.
- Desktop 1280 px: oprindelig tabel med 11 kolonner, ingen mobilkort. Ingen vandret sideoverflow i mobilkontrollen.

## Senest afsluttet og til visuel vurdering
- Ny grafisk top godkendt og implementeret; kontrolleret ved 390 og 1280 px.
- Ny grafisk udlodningstidslinje godkendt og implementeret med bekræftede datoer.
- Porteføljeknappens illustration afventer visuel vurdering.
- Metodeforslagets procesvisning er indarbejdet med korrekte oplysninger om fast reviewudtræk; eksisterende metode- og kildeoplysninger bevares.

## Afgrænsning
Kun reviewgren. Ingen main-merge, Wix, Azure, nye datakilder eller afsluttende compliancegennemgang. Ingen fysisk iPhone/Safari-test.


## Afsluttende kontrol
19 automatiske tests og 5 medietests bestået. JavaScript-syntaks kontrolleret. To dokumenterede udlodningsmarkører verificeret i browser; gammel dublet skjult. Ingen vandret overflow ved 390 px. Fysisk Safari/Wix ikke testet. Implementeringsomgangen er klar til Christians visuelle review; ingen liveudgivelse.

