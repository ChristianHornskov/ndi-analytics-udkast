"""Small sourced copy repairs, independent of incoming visual redesigns."""
import json
from lxml import html

def repair_data_copy(dest):
    path=dest/'temaer/kvante.html'
    tree=html.fromstring(path.read_text(encoding='utf8'))
    cards=tree.xpath('//*[@id="penge"]//div[contains(concat(" ",@class," ")," penge ")]')
    assert len(cards)==2
    revenue=cards[0].findall('p')
    revenue[1].text='Ca. 224 mio. USD omsatte de seks kvantecomputerselskaber for tilsammen i 2025. Det er selskabernes samlede omsætning, også fra andre produkter og opkøbte aktiviteter — ikke et mål for hele kvantemarkedet.'
    revenue[2].clear(); revenue[2].set('class','note')
    revenue[2].text='Beregnet fra rapporterede tal i mio. USD: IonQ 130,0; Infleqtion 31,1 (korrigeret); Quantinuum 30,9; D-Wave 24,6; Rigetti 7,1; Quantum Computing Inc. 0,7. '
    revenue[2].append(html.fragment_fromstring('<a href="#kilder">Se selskabernes regnskaber</a>'))
    funding=cards[1].findall('p')
    # Keep illustrations but replace their old, unproven paid/unpaid label.
    for child in funding[0]: child.tail=None
    funding[0][-1].tail='Tilsagn til forskning og udvikling'
    funding[1].text='Op til 300 mio. USD er omfattet af tre endelige støttetilsagn: op til 100 mio. USD til hver af D-Wave, Quantinuum og Rigetti. Derudover omtaler NIST en hensigtserklæring på 100 mio. USD til Infleqtion.'
    funding[2].text='De tre endelige tilsagn er fra 8. september 2026; hensigtserklæringen er fra 21. maj. Tilsagn er ikke omsætning. Meddelelserne dokumenterer heller ikke, hvor meget der faktisk er udbetalt.'
    for item in tree.xpath('//li[b[text()="Grænsetilfælde." or text()="Et lille tema med ét stort selskab."]]'):
        item.getparent().remove(item)
    path.write_text(html.tostring(tree,encoding='unicode',doctype='<!doctype html>'),encoding='utf8')

    # One vocabulary for the dates, without pretending different observations
    # belong to the same date. No refresh or mutation of source datasets.
    holdings=json.loads((dest/'data/dagens-tal.json').read_text(encoding='utf8'))
    fund=json.loads((dest/'widget/data.json').read_text(encoding='utf8'))['funds'][0]
    def da(day): return '.'.join(reversed(day.split('-')))
    line=f'Afkast til {da(fund["performanceAsOf"])} · Beholdning pr. {da(holdings["andelsdato"])}'
    for name in ['widget/index.html','tech.html']:
        path=dest/name; text=path.read_text(encoding='utf8')
        tree=html.fromstring(text)
        host=(tree.xpath('//main') or tree.xpath('//body'))[0]
        host.insert(0,html.fragment_fromstring('<p class="up-data-date">'+line+'</p>'))
        path.write_text(html.tostring(tree,encoding='unicode',doctype='<!doctype html>'),encoding='utf8')
