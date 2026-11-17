# Claude: gennemgang af live-udgaven 17.11.2026 (mobil, menu og sprog)

Grundlag: den udgivne version `c8c50f05` på `codex/claude-rettelser-20261116`.
Mine rettelser ligger på grenen `claude/live-runde3-20261117`, som bygger direkte på `c8c50f05`.

## A. Det skal Codex gøre

1. **Udgiv grenen `claude/live-runde3-20261117`** som ny frontend-release. Kun `docs/energi-konkurrence/v19-review` skal med. Ændrede filer:
   - `assets/js/beta.js`: på mobil (under 700 px) står beta-boksen nu nederst i stedet for øverst. På mobil skubbede den hele sidens indhold en skærm ned.
   - `assets/claude/41-undernavigation.js`: fanebjælken på porteføljesiden ruller nu med, så den aktive fane altid kan ses på mobil. Før forsvandt "Nedture & afkast" og "Datagrundlag" ud til højre.
   - `assets/js/live-theme-values.js`: den tomme boks "Positionen måned for måned" på SpaceX-siden skjules, indtil der er historiske data. Før stod der "Historiske beholdningsdata er endnu ikke tilgængelige i det fælles datagrundlag."
   - `widget/` og `portfolio/` (homepage-patch.js, review.js): sprog, se B.
   - `data/portefolje.js`/`.json`, `temaer/kvante.html` og `assets/claude/23-tema-fintech.js`: sprog, se B.

2. **Genudgiv review-data** fra `review-input/homepage-source/` (highs.json). Kursnoten om børsnoteringen i maj 2026 er rettet.

3. **Forsidens graf på mobil (Wix).** På mobil er HTML-komponenten på forsiden låst til 728 px, mens indholdet er cirka 6.300 px højt. Den besøgende får en lille boks med sin egen rullebjælke inde i siden, og det første, man ser, er klassevælgeren og ikke grafen. Højden tilpasses rigtigt på desktop (`ndi-home-height`), men ikke på mobil. To muligheder:
   - Lad Wix' mobilvisning også bruge højden fra `ndi-home-height` (Velo-kode eller indstilling i mobil-editoren).
   - Eller vis en kort udgave på mobil med `embed=home`: graf, tre nøgletal og knappen til porteføljen, og flyt klassevælgeren ind på /graf-review.

4. **Antal selskaber pr. tema stemmer ikke.** Netværkskortet på `tech.html` viser ét selskab færre end temasiden for seks temaer:

   | Tema | tech.html | Temaside |
   |---|---|---|
   | Chips og halvledere | 75 | 76 |
   | Energi og elnet | 69 | 70 |
   | Robotter & fysisk AI | 26 | 27 |
   | Råstoffer | 36 | 37 |
   | Software & AI | 15 | 16 |
   | Sundhed og biotek | 12 | 13 |

   Tallene i kortet kommer fra `assets/v5-atlas/atlas-living.mjs` (`c.count`). Det ligner, at kortet tæller fra en ældre beholdning. Kortet bør tælle fra samme data som temasiderne.

5. **Venstremenuen på desktop** bør bygges om. Se forslaget i C. Det er ikke nødvendigt i dag.

## B. Rettet sprog (alle på grenen)

| Før | Efter |
|---|---|
| Fabrinet: "Operationelt hovedsæde. Selskabets SEC-indberetning angiver en principal-executive-office-adresse hos Walkers på Cayman Islands." | "Selskabet oplyser selv, at hovedsædet ligger i Kookot, Pathum Thani, Thailand. I indberetningerne til SEC står en adresse hos Walkers på Caymanøerne. Kortet bruger hovedsædet i Thailand, ikke registreringsadressen." |
| X-FAB: "Operationelt hovedsæde. Holdingselskabets belgiske adresse i imprint anvendes ikke ..." | "Selskabet oplyser selv, at hovedsædet ligger i Erfurt, Tyskland. Holdingselskabets belgiske adresse på hjemmesiden er ikke brugt som hovedsæde." |
| "ERock Inc.s investorside angiver Headquarters: 1113 Vine Street ..." | "Ifølge ERocks investorside ligger hovedsædet i Houston, Texas, USA." |
| "Veecos årsrapport angiver corporate headquarters i Plainview ..." | "Ifølge Veecos årsrapport ligger hovedsædet i Plainview, New York, USA." |
| "Hyperliquid Strategies Inc.s SEC-indberetning angiver ... 22nd Floor ..." | "Ifølge selskabets indberetning til SEC ligger kontoret i New York, USA. Adressen gælder selskabet og siger ikke noget om, hvor Hyperliquid-netværket bruges." |
| "IPO i maj 2026. Primærkilder angiver forskellige begivenhedsdatoer 6.–8. maj; alle bekræfter ..." | "Børsnoteret i maj 2026. Kilderne angiver datoer fra 6. til 8. maj, men alle viser, at aktien har handlet i under et år." |
| "0,02 procentpoints" | "0,02 procentpoint" |
| "SHA-256 for afkast- og beholdningssnapshot: …" i metodeafsnittet | Fjernet. Det er en intern kontrolsum. |
| Kvantetemaets kilder: "Infleqtion 31,1 (rettet tal)" | "Infleqtion 31,1" |
| Fintech/platforme, gruppen "Endnu ikke i en gruppe": "Selskabet er nyt i temaet, og beskrivelsen er på vej." | "Selskaber, der endnu ikke er placeret i en af grupperne ovenfor." |

Ikke rettet, til Codex' vurdering:
- `tech.html` skriver "andelsklasse n", mens porteføljen og sidefoden skriver "kl. n". Fundmarkets eget navn er "NewDeal Invest, kl n".
- Temasiderne viser andelen med to decimaler ("22,20 %"), mens `tech.html` viser én ("23,5 %").
- Datoformatet skifter mellem "30.6.2026" og "30.06.2026" i kildelinjerne.
- Grafteksten på forsiden siger "Peg på grafen ... På mobil: træk en finger ...". På mobil kan første halvdel skjules og på desktop den anden.

## C. Venstremenuen på desktop

Sådan ser den ud i dag (1440 × 900):
- Menuen er 268 px bred og 1.700 til 2.600 px høj, så den skal rulles for sig selv i et vindue på 900 px.
- Rækkefølgen er: logo, AI-boks, "Til NewDeal Invests forside", sidens egne hop eller "Fonden", 12 temaer, links til fondens sider, 10 selskaber, "Se alle selskaber", "Lyst tema" og en datanote.
- På `tech.html` kommer "Positionerne →" og "Fondens afkast →" først 930 px nede, og "Selskaber" begynder 1.005 px nede. De vigtigste links står altså under folden.
- AI-boksen fylder 140 px i toppen.
- Menuen er ikke ens på tværs af siderne:
  - Tech-siden har "Gå på opdagelse".
  - Temasiderne og alle-selskaber har "Fonden" med "Positionerne" to gange.
  - Upstart har "Upstart · På siden" før "Fonden".
  - SpaceX har sine underpunkter foldet ind under SpaceX i selskabslisten.
- "Fondens afkast" og "Positionerne" står både i topbjælken og i menuen.
- Rækkerne har forskellig højde: temaerne 28 px, selskaberne 44 px, og LPKF fylder 61 px, fordi navnet ombrydes.

Forslag, i samme rækkefølge på alle sider:
1. **Logo og de tre hovedsider** øverst og altid ens: Fondens afkast · Positionerne · Udforsk selskaberne. Hovedsiderne fjernes fra "Fonden"-gruppen.
2. **"På denne side"** lige under, med sidens egne hop. Gruppen vises kun, hvor siden har hop, og står altid samme sted. Dermed forsvinder "Gå på opdagelse", "Upstart · På siden" og SpaceX' indfoldede underpunkter som særtilfælde.
3. **Temaer**, 12 rækker à 28 px med andelen højrestillet, som i dag.
4. **Største selskaber**, de 10 rækker også à 28 px med andelen højrestillet (ikke 44 px), og "Se alle 375 selskaber" til sidst.
5. **Nederst** står én linje om AI-indhold med link til "Om indhold og kilder", linket til NewDeal Invests forside og datanoten. "Lyst tema" bliver et lille ikon i topbjælken.

Med 28 px rækker og 16 px mellem grupperne fylder menuen cirka 1.000 px. Så står hovedsiderne, sidens hop og temaerne inden for de første 900 px på alle sider.

## D. Kontrolleret og i orden

- **Forsiden på mobil (375 px):** intet er bredere end skærmen, og knapperne er store nok. Månedstabellen er foldet sammen, og grafen kan bruges med fingeren.
- **Porteføljen på mobil:** alle sektioner er gennemgået. Fanerne virker, og SK hynix står nu under Teknologi. Noterne om hovedsæder er på dansk, bortset fra de fem, der er rettet i B.
- **Tech og temasider på mobil:** billederne indlæses, og fotokortene og de interaktive figurer passer til skærmen.
- **Selskabssider på mobil:** 15 sider er testet, ingen er bredere end skærmen, og der er ingen fejl. Det gælder SpaceX, Tesla, NVIDIA, Upstart, Oklo, Rocket Lab, Eli Lilly, Apple, IREN, Hims & Hers, Amphenol, IonQ, Eos, LPKF og SK hynix.
- **Kildelinjen om AI i danske virksomheder** (software-temaet): 59 % i 2026 er dækket af Statistikbankens tabel ITAV28, og 2023 og 2024 af Nyt fra 12.3.2025.
