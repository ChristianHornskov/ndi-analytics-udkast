"""Company finder and editorial context, using the reviewed local inputs."""
import json
from pathlib import Path
from html import escape
from lxml import html

def redesign(page, dest):
    data=json.loads((dest/'data/dagens-tal.json').read_text(encoding='utf8'))
    stages=json.loads(Path(__file__).with_name('chipkaede').joinpath('data.json').read_text(encoding='utf8'))
    rows=[]
    filters=['<button type="button" data-sector="all" aria-pressed="true">Alle led</button>']
    seen=set()
    for stage in stages:
        slug=stage['slug']
        filters.append(f'<button type="button" data-sector="{slug}" aria-pressed="false">{escape(stage["navn"])}</button>')
        descriptions={c['navn']:c for c in stage['selskaber']}
        for company in data['grupper']['chips:'+slug]['selskaber']:
            if company['slug'] in seen: raise ValueError('Duplicate company in chip directory')
            seen.add(company['slug'])
            info=descriptions.get(company['navn'],{})
            logo=company.get('logo')
            logo='../'+logo if logo else info.get('logo')
            mark=f'<img loading="lazy" src="{escape(logo)}" alt="">' if logo else '<span>'+escape(info.get('mono') or company['navn'][:2])+'</span>'
            name=escape(company['navn']); description=escape(info.get('d') or stage['sub'])
            weight=f'{company["andel"]:.2f}'.replace('.',',')
            rows.append((company['andel'],f'<li data-stage="{slug}"><a class="cf-company" href="../selskaber/{company["slug"]}.html"><span class="cf-logo">{mark}</span><span class="cf-info"><strong>{name}</strong><span>{description}</span><small>{escape(stage["sub"])}</small></span><span class="cf-weight">{weight} %<span aria-hidden="true">↗</span></span></a></li>'))
    rows.sort(key=lambda row:row[0],reverse=True)
    chain=page.xpath('//*[@id="kaeden"]')[0]
    grid=chain.xpath('.//*[@class="cc-grid"]')[0]
    finder=html.fragment_fromstring(f'''<div class="cf-finder">
      <div class="cf-toolbar"><label for="cf-search">Find et selskab<input id="cf-search" type="search" placeholder="Søg navn eller teknologi…" autocomplete="off"></label><p>Andel af PMINDI<br><span data-tal="andelsdatoTekst" data-fmt="tekst">{data['andelsdatoTekst']}</span></p></div>
      <div class="cf-filters" role="group" aria-label="Filtrér selskaber efter led">{''.join(filters)}</div>
      <p class="cf-count" aria-live="polite">{len(rows)} selskaber · største positioner først</p>
      <ul class="cf-results">{''.join(row[1] for row in rows)}</ul>
      <button type="button" class="cf-more" hidden>Vis flere selskaber</button>
    </div>''')
    # Preserve templates used by the shared data renderer, even though the old overview is gone.
    for template in grid.xpath('.//template'):finder.append(template)
    grid.getparent().replace(grid,finder)
    chain.xpath('.//*[@id="h-kaeden"]')[0].text='Hvem gør hvad i chipindustrien?'
    chain.xpath('.//p[@class="sektion-intro"]')[0].text='Find selskaberne bag teknologien. Se deres opgave i kæden, og hvor meget de fylder i fonden.'
    old=page.xpath('//*[@id="vide"]')[0]
    source=old.xpath('.//p[@class="kildelinje"]')[0]
    count=data['grupper']['chips:ikkeChips']['antal']
    diagrams=[
      f'<div class="ci-number">{count}<span>af {len(rows)} selskaber</span></div><div class="ci-track"><span>Software</span><i>→</i><span>Udstyr</span><i>→</i><span>Chip</span></div>',
      '<svg viewBox="0 0 320 130" aria-hidden="true"><path class="ci-axis" d="M10 110H310"/><path class="ci-wave" d="M10 90C45 90 45 25 85 25S130 100 170 100S220 25 260 25S290 65 310 65"/><circle cx="85" cy="25" r="6"/><circle cx="170" cy="100" r="6"/></svg><div class="ci-labels"><span>Efterspørgslen vokser</span><span>Kapaciteten indhenter den</span></div>',
      '<div class="ci-network"><span>Chipdesign<br><b>NVIDIA</b></span><i>↔</i><span class="ci-taiwan">Produktion i Taiwan<br><b>TSMC</b></span></div><div class="ci-rule">Eksportregler påvirker, hvem der må sælge til hvem</div>'
    ]
    articles=[
      ('En chipinvestering behøver ikke være en chipfabrik',f'{count} af temaets {len(rows)} selskaber laver ikke selv chips. De leverer blandt andet software, materialer og maskiner – eller samler og tester chips for andre.','Se maskinleverandørerne','maskiner'),
      ('God teknologi fjerner ikke konjunkturerne','Chipselskabernes salg svinger med efterspørgslen. Det gælder især hukommelse. Derfor er det ikke nok at forstå chippen; man skal også forstå, hvor selskabet befinder sig i industriens cyklus.','Se hukommelsesselskaberne','husker'),
      ('En global industri med et geografisk knudepunkt','Selskaber som NVIDIA er afhængige af produktion i Taiwan. TSMC står centralt i den produktion. Samtidig påvirker amerikanske eksportregler salget af chips og chipmaskiner til Kina.','Se chipfabrikkerne','fremstilles')
    ]
    content=''
    for i,(title,body,cta,sector) in enumerate(articles):
        content+=f'<article class="ci-story"><div class="ci-visual">{diagrams[i]}</div><div class="ci-copy"><p class="ci-eyebrow">0{i+1} / Det større billede</p><h3>{title}</h3><p>{body}</p><a href="#kaeden" data-find-stage="{sector}">{cta} <span aria-hidden="true">→</span></a></div></article>'
    new=html.fragment_fromstring('<section id="vide" class="sektion ci-context" aria-labelledby="h-vide"><header><p class="sektion-kicker">FORSTÅ FORRETNINGEN</p><h2 id="h-vide">Chippen er kun en del af historien</h2><p>Tre sammenhænge, der hjælper med at forstå forskellene mellem selskaberne.</p></header>'+content+'</section>')
    new.append(source)
    old.getparent().replace(old,new)

