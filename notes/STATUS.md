# STATUS – NDI Analytics overnight build

**2026-10-15 21:00 CEST — Sole lead. Precheck HARD. NOT DONE / NOT BLOCKED.**

## HARD RULE (every push)
```bash
bash scripts/precheck.sh          # must exit 0
bash scripts/push.sh origin main  # wraps precheck
bash scripts/test-precheck.sh     # after editing precheck
```
Prompt footer: `notes/AGENT-PROMPT-FOOTER.md` · Hook sample: `scripts/git-hooks/pre-push`

Fails on: notes in docs/ (except stub warning+index), raw data.json, holdings >2026-06-01, d1/per-stock returns, JS reading those fields.

## Live
https://christianhornskov.github.io/ndi-analytics-udkast/ · notes → 404

## HEAD
(see git log — updated on push)

## Quality this hour
- Start-date default (VIDENSBOT #5): **første NAV** = `portfolio.funds[].inception` for all afkast/"siden start"/100k/embed. Documented in `notes/DATA-DEFINITIONS.md`. UI copy says "første NAV". `fund-meta.legalInception` = juridisk only.
- Unique-metrics: 9 ISINs, qualitative NDI-linse only; note scrubbed of advice words (smoke 96/96).
- om-data: første-NAV glossary + datakilde bullet; fixed duplicate main id.
- Grok quality2 (375px doors/metrics/sticky): metrics-rettelse landet. Døre og sticky header målt, uændrede.

## Agents
Grok visual polish cycle 2: se Fra Grok. Claude quality2 finished earlier.

## NEXT
- UX-review.md @ 22:00 CEST (MUST items only)
- VIDENSBOT-live-check.md when it arrives (blockers first)
- Keep Claude↔Grok cycles; quality > speed; never report done

## Fra Grok

**2026-10-15 21:05 CEST. Visuel polish ved 375 px. Ikke færdig.**

Entré-døre, sekundære døre, lær-døre og den sticky header er målt i browseren. De står som de var: døre i én kolonne, teksten inden for kortet, headeren fuld bredde og sticky. Ingen vandret scroll.

To brud i nøgletallene er rettet. Ingen nye tal. `portfolio.json` er urørt.

1. Ordliste-mærket "?" faldt ned på sin egen linje i den smalle 2-kolonne, så "+4,0 %" og "5 / 7" ikke startede lige. Labelen er nu et gitter: teksten til venstre, mærket 24×24 til højre. Tallene i samme række starter lige.
2. På PMINDIAKK stod sætningen "Vises efter 12 måneder" i en halv kolonne og brød over. Den står nu i fuld bredde under NAV.

Tjekket igen ved 375 og 1280: ingen sidescroll, ingen konsolfejl på de målte sider, desktop stadig fire kolonner. Døre og header er uændrede.

## Fra Claude quality3 (2026-10-15)
- **Værdikæde** (`docs/vaerdikaede.html`): tema-knapper fremhæver led (aria-pressed, `?tema=`), selskabssøgning lyser alle led op ud fra primært tema + multi-tags (`?isin=`), og hvert led har en sammenklappet liste over de 5 største positioner med vægt (themes.json, beholdning pr. 1. jun. 2026). Compute er koblet til led 3 og energiressourcer til led 1. Andet/uklassificeret vises som antal/vægt i et bånd. Ingen kurser, afkast eller nøgletal. Dobbelt `id="main"` er rettet.
- **Default (Leo):** `physical` forbliver på led 2 "Datacenter & racks" (pædagogisk forenkling). Documented in notes/DATA-DEFINITIONS.md. Kan splits senere af Christian/Mads.
- **VIDENSBOT #13**: selskab.html mærker profiltekst med `AI-udkast`-badge på 4 paneler plus linjen "genereret med AI og tjekket mod kilden [dato]. Afventer NDI's endelige gennemgang." Påstår **ikke**, at NDI har gennemgået teksten, fordi `reviewedAt` ikke dokumenterer det. Ret teksten, hvis NDI faktisk har godkendt profilerne.
- **Datostempler**: det globale stempel på index sagde "Data pr. [beholdningsdato]" på alle visninger, også Fonden. Det siger nu "Afkast pr. 14. okt. 2026 · Beholdning pr. 1. jun. 2026 (forsinket)". om-data har fået ordlisteopslaget `#g-datostempler`. På fonden var stemplerne allerede adskilt.
- multi-tags.json, SoftBank: "primært platforms" er ændret til "primært tema: Platforme".
- Sprunget over: UX-review.md har kun en 22:00-*skabelon* og ingen udfyldt review, så der er ingen MUST-punkter. VIDENSBOT-live-check.md findes ikke.
- Smoke 50/50, cycle3 58/58, quality 96/96 (1280+375, 0 konsolfejl). Precheck OK. Bygger oven på Grok 9f88824 (375-metrics). ndi.css er ikke rørt.

## Fra Claude quality4 (2026-10-15 ~21:20 CEST)
- **risici.html**: Risikolisten fra KID'et vises nu også for PMINDIAKK. Den stod allerede i fund-meta, men blev kun vist for PMINDI. Begge klasser bruger samme visning. "Central Information Dokument" er rettet til "dokument med central information (KID)". "Anbefalet ejertid" er rettet til "Anbefalet investeringsperiode ifølge KID". Overskrifterne har fået (udloddende) og (akkumulerende). USD- og tech-punktet er skrevet om til hele sætninger. Alle advarsler står der stadig.
- **laer/**: Intern jargon er fjernet: "Level 1", "v1", "senere iteration … i UI" og "idiosynkratisk" (det sidste er nu forklaret som selskabsspecifik varians). Hvorfor-mange-aktier har fået en linje om, at spredning ikke fjerner markedsrisikoen. "Temaerne på denne side" pegede på en side uden temaer og linker nu til Temaer og Værdikæde. Krydslinks er tilføjet: sådan-tænker-vi → P/E, spredning og risici; udbytte-vs-akk → risici; faq-mangler-aktie → forsinket beholdning. Lær-forsiden har fået en dør til Risici.
- **HTML-fejl**: `<main id="main" id="main">` (dobbelt attribut) er rettet i 12 filer (laer/*, invester, kort, nyhedsarkiv).
- Ingen ændringer i data, CSS eller JS.
- Sprunget over: VIDENSBOT-live-check.md findes ikke. UX-review.md har kun en 22:00-skabelon og ingen MUST-punkter.
- Smoke 50/50, cycle3 58/58 og quality 96/96 ved 1280 og 375 px, inkl. radiogroup/roving tabindex og dialog-a11y. Precheck OK. Undervejs fik cycle3 2 fejl, fordi FAQ-søgningen efter "varians" ikke ramte noget, da ordet var fjernet fra artiklen. Ordet er sat tilbage.

## Fra Claude quality5 (2026-10-15 ~21:25 CEST)
- **Smoke, værdikæde**: `scripts/smoke-cycle3.mjs` har fået 4 tjek ved 1280 og 375 px. Ved start er kun "Alle led" `aria-pressed="true"`. Et klik på Chips sætter netop den knap til true (og kun den), fremhæver mindst ét led og sætter `?tema=chips`. Et klik på "Alle led" nulstiller. Cycle3 er nu 66/66.
- **Krydslinks**: om-data har nu links til Risici / KID og Sidekort. risici har nu et link til Sidekort ud over Ordliste: SRI. Entré og kort.html linkede allerede til både risici og om-data, så de er ikke ændret.
- **id="main"**: Ingen dubletter under docs/. Hver side har højst én, og ingen tag har attributten to gange. (index.html bruger `<main>` uden id.)
- Ikke rørt: ndi.css og vaerdikaede.html, fordi Grok quality3 måske stadig arbejder i dem.
- Sprunget over: UX-review.md har kun 22:00-skabelonen, så der er ingen MUST-punkter. VIDENSBOT-live-check.md findes ikke.
- Smoke 50/50, cycle3 66/66 og quality 96/96 (1280+375, 0 konsolfejl).
