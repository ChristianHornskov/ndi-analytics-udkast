"""Scoped visual explanations for the approved review direction; preserve source prose."""
from pathlib import Path
from lxml import html
import shutil
import re


def improve_sections(dest):
    improve_crypto(dest)
    improve_nvidia(dest)
    improve_materials(dest)
    improve_annual_evidence(dest)
    improve_quantum(dest)
    improve_physical_scale(dest)
    alphabet=dest/'selskaber/alphabet.html'
    alphabet_tree=html.fromstring(alphabet.read_text(encoding='utf8'))
    alphabet_tree.find('body').set('data-company-review','alphabet')
    alphabet_tree.find('head').append(html.Element('link',rel='stylesheet',href='../assets/css/section-visuals.css?v=20261031-1'))
    alphabet.write_text(html.tostring(alphabet_tree,encoding='unicode',doctype='<!doctype html>'),encoding='utf8')
    path=dest/'temaer/energi.html'
    tree=html.fromstring(path.read_text(encoding='utf8'))
    section=tree.get_element_by_id('strommen-gik')
    box=section.xpath('.//div[@class="box"]')[0]
    story=box[0]
    story.set('class','sv-outage-story')
    # The original story remains the source; replace only its decorative clock/city.
    for old in list(box)[1:]:box.remove(old)
    box.set('class','box sv-outage')
    graphic=html.fragment_fromstring('''<div class="sv-outage-map">
      <p class="sv-caption">Strøm skal både produceres, flyttes og nå frem</p>
      <ol class="sv-power-path" aria-label="Fra strømproduktion til forbrug">
        <li><svg viewBox="0 0 80 70" aria-hidden="true"><path d="M40 62V26m0 0L14 13m26 13L62 8M40 26l5 27M30 63h20"/><circle cx="40" cy="26" r="5"/></svg><span>01 · Produktion</span><strong>Laver strøm</strong></li>
        <li class="sv-grid-node"><svg viewBox="0 0 80 70" aria-hidden="true"><path d="M24 63L40 7l16 56M22 23h36M16 38h48M26 59l25-21M29 38l19-15M51 59L29 38M47 38L32 23M20 24v8M60 24v8"/></svg><span>02 · Elnettet</span><strong>Flytter strøm</strong><em>Forbindelsen er afgørende</em></li>
        <li><svg viewBox="0 0 80 70" aria-hidden="true"><path d="M12 62V28h24v34m0 0V10h30v52M6 62h68M19 36h9m-9 10h9m17-26h12m-12 10h12m-12 10h12m-12 10h12"/></svg><span>03 · Forbrug</span><strong>Bruger strøm</strong></li>
      </ol>
      <div class="sv-support"><span class="sv-support-line" aria-hidden="true"></span><p><strong>Lagring</strong> og <strong>reservestrøm</strong><br><span>Hører også med, når strømforsyningen skal kunne modstå udfald.</span></p></div>
      <div class="sv-outage-time" aria-label="Forløbet den 28. april 2025"><div><strong>12.33</strong><span>Strømmen går</span></div><div class="sv-time-gap"><i aria-hidden="true"></i><span>Mange timer uden strøm</span></div><div><strong>Strømmen tilbage</strong><span>Genopretning</span></div></div>
    </div>''')
    box.append(graphic)
    tree.find('head').append(html.Element('link',rel='stylesheet',href='../assets/css/section-visuals.css?v=20261031-1'))
    target=dest/'assets/css/section-visuals.css'
    shutil.copyfile(Path(__file__).with_name('section-visuals.css'),target)
    path.write_text(html.tostring(tree,encoding='unicode',doctype='<!doctype html>'),encoding='utf8')


def improve_physical_scale(dest):
    path=dest/'temaer/fysisk-ai.html'
    tree=html.fromstring(path.read_text(encoding='utf8'))
    host=tree.get_element_by_id('vaegt').xpath('.//div[@class="vaegt-g"]')[0]
    figure=html.fragment_fromstring('''<figure class="sv-five-to-one">
      <figcaption>En størrelsesforskel på omkring <strong>5 til 1</strong></figcaption>
      <div><h3>Teslas samlede omsætning</h3><div class="sv-scale-blocks" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div><p>Biler, energi og tjenester · 2025</p></div>
      <div><h3>Nyinstallerede industrirobotter</h3><div class="sv-scale-blocks sv-scale-one" aria-hidden="true"><i></i></div><p>Værdien af robotterne installeret i verden · 2025</p></div>
      <p class="sv-scale-note">To forskellige størrelser, der sætter omfanget i perspektiv. Det er ikke fondens vægte eller Teslas robotomsætning.</p>
    </figure>''')
    host.append(figure)
    tree.find('head').append(html.Element('link',rel='stylesheet',href='../assets/css/section-visuals.css?v=20261031-1'))
    path.write_text(html.tostring(tree,encoding='unicode',doctype='<!doctype html>'),encoding='utf8')


def improve_quantum(dest):
    path=dest/'temaer/kvante.html'
    tree=html.fromstring(path.read_text(encoding='utf8'))
    cards=tree.xpath('//div[@class="penge-g"]/div')
    source=cards[0].xpath('./p[@class="note"]')[0].text_content()
    values=re.findall(r'(IonQ|Infleqtion|Quantinuum|D-Wave|Rigetti|Quantum Computing Inc\.) (\d+,\d+)',source)
    if len(values)!=6:raise ValueError('Quantum revenue source no longer matches six reported values')
    chart=html.Element('div',attrib={'class':'sv-quantum-revenue','aria-label':'Omsætning 2025 i mio. USD'})
    maximum=max(float(v.replace(',','.')) for _,v in values)
    for name,value in values:
        row=html.Element('div');label=html.Element('span');label.text=name;row.append(label)
        track=html.Element('span',attrib={'class':'sv-q-track','aria-hidden':'true'})
        bar=html.Element('i',style=f"width:{float(value.replace(',','.'))/maximum*100:.4f}%");track.append(bar);row.append(track)
        number=html.Element('strong');number.text=value;row.append(number);chart.append(row)
    cards[0].insert(2,chart)
    stages=html.fragment_fromstring('''<ol class="sv-funding-stages" aria-label="Status for støtte, ikke omsætning">
      <li><span>01 · Hensigtserklæring</span><strong>Infleqtion</strong><p>100 mio. USD · 21. maj 2026</p></li>
      <li><span>02 · Endeligt tilsagn</span><strong>D-Wave · Quantinuum · Rigetti</strong><p>Op til 100 mio. USD hver · 8. september 2026</p></li>
      <li class="sv-unconfirmed"><span>03 · Udbetalt</span><strong>Ikke dokumenteret her</strong><p>Et tilsagn fortæller ikke, hvor meget der er udbetalt.</p></li>
    </ol>''')
    cards[1].insert(1,stages)
    tree.find('head').append(html.Element('link',rel='stylesheet',href='../assets/css/section-visuals.css?v=20261031-1'))
    path.write_text(html.tostring(tree,encoding='unicode',doctype='<!doctype html>'),encoding='utf8')


def improve_annual_evidence(dest):
    # The validated evidence JSON remains unchanged. Render each selected class from it.
    for folder in ('portfolio','widget'):
        js=dest/folder/'evidence.js'
        source=js.read_text(encoding='utf8')
        start=source.index('<section class="source-evidence"><h3>Afstemning til årsrapport')
        end=source.index('</section>',start)+len('</section>')
        markup='''<section class="source-evidence sv-annual"><header><div><span class="eyebrow">Kildekontrol</span><h3>Afstemning til årsrapport</h3><p>Afsluttede års afkast er kontrolleret mod årsrapporten.</p></div><a href="${esc(annualEvidence.source)}" target="_blank" rel="noopener">Årsrapport 2025 ↗<small>PDF-side ${annual.pdfPage}</small></a></header><div class="sv-annual-grid"><div><h4>Afkast i afsluttede år</h4><div class="sv-annual-years">${Object.entries(annual.returns).map(([y,v])=>`<div><strong>${esc(y)}</strong><span class="sv-annual-track"><i class="${v<0?'negative':''} ${y===annual.inception.slice(0,4)?'partial':''}" style="width:${Math.min(100,Math.abs(v))}%"></i></span><b>${pct(v)}</b></div>`).join('')}</div><p class="small muted">Startåret er en delperiode. Stribet bjælke markerer startåret.</p></div><div><h4>To forskellige startdatoer</h4><ol class="sv-date-line">${[{date:annual.firstGraphPoint,label:'Første punkt i grafgrundlaget'},{date:annual.inception,label:'Klassen påbegyndte investeringer'}].sort((a,b)=>a.date.localeCompare(b.date)).map(item=>`<li><time datetime="${esc(item.date)}">${esc(item.date)}</time><span>${item.label}</span></li>`).join('')}</ol><p class="small muted">Grafens første dato er ikke nødvendigvis dagen, investeringerne begyndte.</p></div></div>${annual.unresolved?`<p class="callout">Uafklaret kildeforskel: ${esc(annual.unresolved)} Grafen bruger årsrapportens oplyste afkast; dette er ikke en fuld NAV-afstemning.</p>`:''}</section>'''
        js.write_text(source[:start]+markup+source[end:],encoding='utf8')
        path=dest/folder/'index.html'
        tree=html.fromstring(path.read_text(encoding='utf8'))
        tree.find('head').append(html.Element('link',rel='stylesheet',href='../assets/css/section-visuals.css?v=20261031-1'))
        path.write_text(html.tostring(tree,encoding='unicode',doctype='<!doctype html>'),encoding='utf8')


def improve_materials(dest):
    path=dest/'temaer/raastoffer.html'
    tree=html.fromstring(path.read_text(encoding='utf8'))
    box=tree.xpath('//div[@class="v18-perspektiv-boks"]')[0]
    intro=box.xpath('./p[@class="v18-perspektiv-intro"]')[0]
    visual=html.fragment_fromstring('''<div class="sv-materials">
      <div class="sv-supply"><span class="sv-label">Udbud og efterspørgsel</span><h3>Er der kobber nok?</h3><ul><li>Hvor meget får verden brug for?</li><li>Hvor meget bliver produceret?</li><li>Bliver der underskud eller overskud?</li></ul></div>
      <div class="sv-material-chain"><span class="sv-label">Det næste spørgsmål</span><h3>Hvem er vi afhængige af?</h3><ol>
        <li><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 42s14-16 14-27a14 14 0 0 0-28 0c0 11 14 27 14 27Z"/><circle cx="24" cy="15" r="5"/></svg><strong>Oprindelse</strong><p>Hvor kommer kobberet fra?</p></li>
        <li><svg viewBox="0 0 48 48" aria-hidden="true"><path d="m8 42 26-29M19 6q18 0 23 18M26 9l12 12"/></svg><strong>Minerne</strong><p>Hvem kontrollerer dem?</p></li>
        <li><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M5 42V22l12-8v12l12-8v8h7V5h6v37ZM13 33v5m9-5v5m9-5v5"/></svg><strong>Raffinering</strong><p>Hvem forarbejder råstoffet?</p></li>
        <li><svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="9" cy="24" r="6"/><circle cx="37" cy="9" r="6"/><circle cx="37" cy="39" r="6"/><path d="m15 21 16-9M15 27l16 9"/></svg><strong>Afhængighed</strong><p>Hvilke lande vil være afhængige af hinanden?</p></li>
      </ol></div>
    </div>''')
    intro.addnext(visual)
    original=box.xpath('./blockquote[@lang="en"]')[0]
    box.remove(original)
    details=html.Element('details',attrib={'class':'sv-source-detail'})
    summary=html.Element('summary');summary.text='Læs det originale citat på engelsk';details.append(summary);details.append(original)
    box.xpath('./p[contains(@class,"skrevet-oversat")]')[0].addnext(details)
    tree.find('head').append(html.Element('link',rel='stylesheet',href='../assets/css/section-visuals.css?v=20261031-1'))
    path.write_text(html.tostring(tree,encoding='unicode',doctype='<!doctype html>'),encoding='utf8')


def improve_crypto(dest):
    path=dest/'temaer/krypto.html'
    tree=html.fromstring(path.read_text(encoding='utf8'))
    section=tree.get_element_by_id('fod').xpath('./div')[0]
    visual=html.fragment_fromstring('''<div class="sv-overlap">
      <div class="sv-orbits" aria-hidden="true"><span>Datacentre</span><span>Krypto</span><span>Fintech</span></div>
      <p class="sv-overlap-intro">Samme selskab kan forbinde flere teknologier. I fondens opdeling tæller vi det kun i ét hovedtema.</p>
      <div class="sv-overlap-pairs">
        <article><h3>Datacentre ↔ Krypto</h3><p>Strøm, computere og bygninger er forbindelsen. Nogle selskaber miner krypto; andre bruger kapaciteten til AI.</p><h4>Tælles i Krypto</h4><p class="sv-names">CleanSpark · Bitdeer · Riot Platforms · Keel Infrastructure · Galaxy Digital · Bit Digital</p><h4>Tælles i Datacentre</h4><p class="sv-names">IREN · Core Scientific · Cipher Digital · TeraWulf</p><a href="datacenter.html">Udforsk datacentre →</a></article>
        <article><h3>Krypto ↔ Fintech</h3><p>Handel, betaling og finansielle tjenester forbinder de to temaer.</p><h4>Tælles i Krypto</h4><p class="sv-names">Coinbase · Circle</p><h4>Tælles i Fintech</h4><p class="sv-names">Robinhood · Figure</p><a href="fintech.html">Udforsk fintech →</a></article>
      </div>
    </div>''')
    # Keep the original classification and explanation available, including historic names.
    details=html.Element('details',attrib={'class':'sv-source-detail'})
    summary=html.Element('summary');summary.text='Læs mere om selskabernes placering';details.append(summary)
    for child in list(section):
        if child.tag in ('p','ul') and 'eyebrow' not in child.get('class',''):
            section.remove(child);details.append(child)
    section.append(visual);section.append(details)
    risk=tree.get_element_by_id('risiko-liste')
    explanation=html.fragment_fromstring('''<div class="sv-crypto-business">
      <div class="sv-share-route"><span>Fonden</span><b aria-hidden="true">→</b><span>Aktier i selskaber</span><b aria-hidden="true">→</b><span>Forretninger omkring krypto</span></div>
      <p>Du får eksponering mod selskabernes forretning — fonden ejer ikke kryptovaluta direkte.</p>
      <div class="sv-business-rows"><div><strong>Mining</strong><span>Bitcoinprisen på den ene side. Strøm og udstyr på den anden.</span></div><div><strong>Handelsplatforme</strong><span>Kundernes handelsaktivitet påvirker indtjeningen.</span></div><div><strong>Egne beholdninger</strong><span>Kryptokurserne påvirker værdien af det, selskabet ejer.</span></div></div>
      <p class="sv-business-note">Derfor kan to aktier i samme tema udvikle sig forskelligt. Regler og sikkerhed spiller også en rolle.</p>
    </div>''')
    risk.addprevious(explanation)
    tree.find('head').append(html.Element('link',rel='stylesheet',href='../assets/css/section-visuals.css?v=20261031-1'))
    path.write_text(html.tostring(tree,encoding='unicode',doctype='<!doctype html>'),encoding='utf8')
    js=dest/'assets/v5-temaer/krypto.js'
    js.write_text(js.read_text(encoding='utf8').replace('../datacenter/index.html','datacenter.html').replace('../fintech/index.html','fintech.html'),encoding='utf8')

def improve_nvidia(dest):
    path=dest/'selskaber/nvidia.html'
    tree=html.fromstring(path.read_text(encoding='utf8'))
    what=tree.get_element_by_id('hvad')
    depth=what.xpath('.//section[contains(@class,"company-depth")]')[0]
    flow=depth.xpath('./div[contains(@class,"company-flow")]')[0]
    visual=html.fragment_fromstring('''<div class="sv-nvidia-flow" aria-label="Fra beregningsproblem til NVIDIA-produkter og brugere">
      <div class="sv-nvidia-problem"><span class="sv-label">Problemet</span><svg viewBox="0 0 140 90" aria-hidden="true"><g fill="currentColor"><circle cx="22" cy="20" r="5"/><circle cx="70" cy="20" r="5"/><circle cx="118" cy="20" r="5"/><circle cx="22" cy="70" r="5"/><circle cx="70" cy="70" r="5"/><circle cx="118" cy="70" r="5"/></g><path d="M22 25v40M70 25v40M118 25v40M26 24l40 42M74 24l40 42M66 24L26 66M114 24L74 66" fill="none" stroke="currentColor" stroke-width="1.5"/></svg><h4>Mange beregninger på én gang</h4><p>Store AI-modeller kræver massiv parallel beregning.</p></div>
      <div class="sv-nvidia-stack"><span class="sv-label">NVIDIAs løsning</span><div><b>CUDA</b><span>Softwareplatformen</span></div><div><b>Netværk</b><span>Forbindelser mellem systemerne</span></div><div><b>GPU’er</b><span>Chips og computersystemer</span></div><p>Hardware og software, der fungerer som et samlet lag.</p></div>
      <div class="sv-nvidia-users"><span class="sv-label">Hvem bruger det?</span><h4>Fra datacenter til anvendelse</h4><ul><li>Systemproducenter og distributører</li><li>Cloududbydere og AI-modeludviklere</li><li>Virksomheder og det offentlige</li></ul><p>Brugerne kan være direkte kunder eller få adgang gennem andre leverandører.</p></div>
    </div>''')
    flow.getparent().replace(flow,visual)
    # Retain precise customer definitions as an optional detail, rather than repeat three cards.
    details=html.Element('details',attrib={'class':'sv-source-detail'})
    summary=html.Element('summary');summary.text='Produkter, kunder og rolle — flere detaljer';details.append(summary);details.append(flow)
    visual.addnext(details)
    role=tree.get_element_by_id('rolle')
    steps=[('tegnes','Tegnes'),('materialer','Materialer'),('maskiner','Maskiner'),('fremstilles','Fremstilles'),('samles','Samles og testes'),('regner','Regner'),('husker','Husker'),('styrer','Styrer strøm')]
    chain=html.Element('ol',attrib={'class':'sv-chip-role','aria-label':'Chipkædens otte trin med NVIDIA ved Regner'})
    for i,(slug,label) in enumerate(steps,1):
        li=html.Element('li');a=html.Element('a',href='../temaer/chips.html#ck-trin-'+slug)
        number=html.Element('span');number.text=f'{i:02d}';a.append(number)
        title=html.Element('strong');title.text=label;a.append(title)
        if i==6:
            li.set('class','sv-chip-active');tag=html.Element('b');tag.text='NVIDIA';a.append(tag)
        li.append(a);chain.append(li)
    role.xpath('./h2')[0].addnext(chain)
    for a in role.xpath('.//a[@href]'):
        a.set('href',a.get('href').replace('#h-ct-','#ck-trin-'))
    tree.find('head').append(html.Element('link',rel='stylesheet',href='../assets/css/section-visuals.css?v=20261031-1'))
    path.write_text(html.tostring(tree,encoding='unicode',doctype='<!doctype html>'),encoding='utf8')

