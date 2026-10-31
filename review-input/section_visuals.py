"""Scoped visual explanations for the approved review direction; preserve source prose."""
from pathlib import Path
from lxml import html
import shutil


def improve_sections(dest):
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

