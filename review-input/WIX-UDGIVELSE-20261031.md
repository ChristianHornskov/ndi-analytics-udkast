# Separat Wix-review, 31. oktober 2026

Christian har udtrykkeligt godkendt udgivelse af den gennemgåede version på en separat Wix-adresse, med widgeten som indgang. Forsiden og eksisterende grafer må ikke ændres.

## Færdig statisk udgivelse

- Kildecommit: `acb70dc` på `codex/v18-animation-integration-20261031`.
- Byggeoutput: `docs/energi-konkurrence/v19-review/`.
- Indgang: `widget/index.html`; de to indgange fører til `portfolio/index.html` og `tech.html`.
- Azure: `graph/v19-review/releases/20261031-acb70dc/` i den eksisterende konto `ndigrafdatab5174313`.
- Alle 1773 uploadede filer er læst tilbage og SHA256-kontrolleret mod de lokale filer. Upload brugte betinget oprettelse; eksisterende filer overskrives ikke.
- Ingen private noter, tokens eller logins indgår. Ingen cloudjobs er ændret.

## Wix

- Eksisterende site: NewDeal Invest (`3c2faaeb-9928-4aa2-990d-ed01b7041b3b`).
- Ny side: Graf review, ønsket adresse `/graf-review`.
- Kun den nye side indlejrer den statiske udgivelse. Ingen nye links fra hjemmesidens navigation.
- Udgivelses- og browserkontrol: under udførelse; dette notat er ikke bevis for, at Wix-siden er offentlig endnu.

## Datagrundlag

Det er en dateret reviewversion: afkast til 29. oktober 2026 og beholdning pr. 30. oktober. Udgivelsen gør ikke snapshotdata til et dagligt opdateret feed.

## Udgivet og kontrolleret

- Offentligt link: https://www.newdealinvest.dk/graf-review
- Wix-side: wglv3. Noindex; ingen menulinks.
- Den native HTML-komponent var tom på den offentlige side. Løst med separat Custom Code, "Kun Graf review – widget og fordybelse", anvendt kun på Graf review, Body-slut, essentiel. Koden har desuden eksplicit sti-kontrol og fjerner sin egen iframe ved navigation væk.
- Ren URL genindlæst og widget verificeret. Widget → portefølje → widget → tech afprøvet på offentlig Wix-side.
- Forsiden kontrolleret: ingen review-iframe og ingen links til graf-review.
- Direkte release er tidligere kontrolleret ved mobilbredde. Wix-browserens viewport-override slog ikke igennem i sidste kontrol; fysisk mobil/Safari er ikke testet.
- Snapshotbegrænsningen ovenfor gælder fortsat.
