# Medieintegration og mobilkontrol – 31. oktober 2026

Kun testgrenen. Ingen udgivelse til main, Wix eller Azure.

## Integreret
- 56 sider har fået yderligere medier: 98 YouTube-placeringer, 9 Instagram-placeringer og 26 X-placeringer. Det er placeringer, ikke antal unikke videoer.
- Udgangspunkt: afleveringen a097ab72 fra ndi-analytics-noter, udvalg.json/register.json. Kun offentlige links og de nødvendige metadata kopieret til media-selection.json. Interne noter og lokale stier er ikke kopieret til sitet.
- Eksisterende medie-ID'er springes over. Flagget/afventende video, MAR-markeret materiale og forældede videoer er udeladt af denne integration.
- YouTube afspilles efter klik ved den foreslåede tidskode. Instagram indlæses efter klik. X indlæses, når afsnittet nærmer sig skærmen; original-link bevares.
- Ingen fondstal ændret. Dateret snapshot: beholdning 30/10, NAV 29/10.

## Kontrolleret
- 10 automatiske tests: bl.a. udelukkelser, dubletter, starttid, ressourcer og eksisterende widgetberegninger.
- Mobil 390 px: chips, YouTube-afspilning ved 21:26, Instagram og originalt X-opslag. Instagramens minimumsbredde rettet ved at lade spilleren bruge hele kortets bredde.
- Widgetens porteføljeknap åbner portfolio/index.html. Krydshenvisningen åbner tech.html. Ingen vandret side-overløb på disse mobilvisninger.

## Resterende
- Ikke alle 98 video-placeringer er individuelt afspillet. Koblinger/tider bygger på det afleverede register; de er ikke alle aflyttet af et menneske.
- Instagram/X kan være utilgængelige pga. tredjepartsbegrænsninger; direkte links er altid synlige.
- Ingen nye koblinger er gættet for videoer uden dokumenteret relevans.
- Testen er browserbaseret mobilvisning, ikke en fysisk iPhone/Safari-test.
- Den fulde visuelle prioritering af de øvrige sider afventer Groks og Claudes review. Dette er medieintegration og en målrettet gennemgang, ikke en påstand om, at hele produktet er færdigt.
