"""Build the isolated review site. Never uploads or changes the V18 source."""
from pathlib import Path
import shutil
import os
from lxml import html
from funds import compile_funds

ROOT = Path(__file__).resolve().parents[1]
if os.name == 'nt':
    ROOT = Path('\\\\?\\' + str(ROOT))
SOURCE = ROOT / 'docs/energi-konkurrence/v18'
DEST = ROOT / 'docs/energi-konkurrence/v19-review'

def remove(node):
    node.getparent().remove(node)

def cls(tree, name):
    return tree.xpath('//*[contains(concat(" ",normalize-space(@class)," ")," '+name+' ")]')

def save(tree, path):
    path.write_bytes(html.tostring(tree, encoding='utf-8', doctype='<!doctype html>'))

def build():
    shutil.copytree(SOURCE, DEST, dirs_exist_ok=True)
    shutil.copyfile(Path(__file__).with_name('review.css'), DEST/'assets/css/review.css')
    compile_funds(SOURCE,DEST)
    for filename, tech in [('index.html', False), ('tech.html', True)]:
        tree = html.parse(str(SOURCE/'index.html')).getroot()
        tree.find('head').append(html.fragment_fromstring('<link rel="stylesheet" href="assets/css/review.css">'))
        tree.find('head/title').text = ('Gå på opdagelse i tech' if tech else 'Gå på opdagelse i porteføljen')+' · NewDeal Invest'
        hub = cls(tree, 'v18-hub')[0]
        hub.clear(); hub.set('class', 'v18-hub review-intro')
        hub.append(html.fragment_fromstring('<nav class="review-paths" aria-label="Vælg indgang"><a href="index.html" '+('' if tech else 'aria-current="page"')+'>Porteføljen</a><a href="tech.html" '+('aria-current="page"' if tech else '')+'>Tech</a><a href="widget/index.html">Fondens udvikling</a></nav>'))
        title = 'Teknologi hænger sammen.' if tech else 'Se, hvad du investerer i.'
        intro = ('En AI-model kræver chips. Chips kræver fabrikker, energi og materialer. Følg forbindelserne og opdag selskaberne, der gør teknologien mulig — også hvis du bare er nysgerrig på, hvordan det hele virker.' if tech else 'Vi ser teknologi som mere end software og store amerikanske navne. Fonden investerer på tværs af de selskaber, der bygger, driver og bruger ny teknologi. Her har vi samlet investeringerne i 12 temaer, så du kan forstå både selskaberne og sammenhængene.')
        hub.append(html.fragment_fromstring('<h1>'+title+'</h1>'))
        hub.append(html.fragment_fromstring('<p class="review-lead">'+intro+'</p>'))
        for node in cls(tree, 'two-paths'): remove(node)
        if tech:
            tree.find('body').set('class','review-tech')
            for node in cls(tree,'sm-tal')+cls(tree,'sm-overskrift-note'): remove(node)
            for node in tree.xpath('//*[@id="sm-h-fond"]/span'): node.text='Gå på opdagelse'
            for node in tree.xpath('//a[@data-spy="temaer"]/span'): node.text='De 12 temaer'
            for name in ['allocation-review','v18-top']:
                for node in cls(tree,name): remove(node)
            for node in tree.xpath('//*[@id="portefoeljen"]'): remove(node)
            atlas = tree.xpath('//*[@id="forbindelser"]')[0]
            hub.addnext(atlas)
            for node in tree.xpath('//*[@data-spy="top10" or @data-spy="portefoeljen"]'):
                remove(node.getparent())
            for node in tree.xpath('//*[@data-portefolje]'):
                if node.getparent() is not None: remove(node)
        else:
            for name in ['v18-atlas', 'v18-faser']:
                for node in cls(tree,name): remove(node)
        for details in tree.xpath('//*[@id="virksomhedsfaser"]//details'):
            details.tag='div'; details.set('class','review-risk-text')
            for summary in details.findall('summary'): summary.tag='h4'
        for row in tree.xpath('//template[@id="tpl-v5-top"]//a'):
            row.insert(1,html.fragment_fromstring('<span class="review-company-logo" data-f="forbogstav"></span>'))
        # Keep navigation to removed sections useful rather than leaving dead anchors.
        ids = set(tree.xpath('//*[@id]/@id'))
        for a in tree.xpath('//a[starts-with(@href,"#")]'):
            anchor=a.get('href')[1:]
            if anchor and anchor not in ids:
                a.set('href',('index.html' if tech else 'tech.html')+'#'+anchor)
                a.attrib.pop('data-spy',None)
        save(tree,DEST/filename)
    widget=html.parse(str(SOURCE/'widget/index.html')).getroot()
    widget.find('head').append(html.fragment_fromstring('<link rel="stylesheet" href="../assets/css/review.css">'))
    nav=cls(widget,'v18-widget-knapper')[0]
    nav.clear(); nav.set('class','review-entry-cards'); nav.set('aria-label','Gå på opdagelse')
    for href,title,text in [('index.html','Gå på opdagelse i porteføljen','Se investeringerne, vægtene og selskaberne bag fonden.'),('tech.html','Gå på opdagelse i tech','Forstå teknologien og forbindelserne mellem selskaberne.')]:
        nav.append(html.fragment_fromstring('<a href="../'+href+'"><strong>'+title+' <span aria-hidden="true">↗</span></strong><span>'+text+'</span></a>'))
    save(widget,DEST/'widget/index.html')
    # Only the widget receives a class selector. Portfolio data stays PMINDI.
    widget_path=DEST/'widget/index.html'
    markup=widget_path.read_text(encoding='utf-8')
    markup=markup.replace('<script src="../assets/js/v18-afkast.js"', '<script src="../data/review-funds.js"></script><script src="../assets/js/review-widget.js"')
    widget_path.write_text(markup,encoding='utf-8')
    chart=(SOURCE/'assets/js/v18-afkast.js').read_text(encoding='utf-8')
    chart=chart.replace('(U.kalender || []).map', '(U.kalender || []).slice(0,3).map')
    start=chart.index('  function vigtig()')
    end=chart.index('  function opdater()',start)
    chart=chart[:start]+'''  function vigtig() {
      if(info) info.innerHTML='<p>Grafen viser totalafkast efter fondens løbende omkostninger. Historisk afkast er ingen garanti for fremtidigt afkast. Du kan tabe penge. <a target="_blank" rel="noopener" href="'+F.kidUrl+'">Læs klassens PRIIP-KID ↗</a> · <a href="https://www.newdealinvest.dk/risici" target="_blank" rel="noopener">Risici ↗</a></p>';
  }
''' +chart[end:]
    start=chart.index('  if (app) {\n    app.innerHTML = skelet();')
    chart=chart[:start]+Path(__file__).with_name('widget-controller.js').read_text(encoding='utf-8')
    (DEST/'assets/js/review-widget.js').write_text(chart,encoding='utf-8')
    spacex=html.parse(str(SOURCE/'selskaber/spacex.html')).getroot()
    spacex.find('head').append(html.fragment_fromstring('<link rel="stylesheet" href="../assets/css/review.css">'))
    for graph in spacex.xpath('//*[@id="minigraf"]'):
        fold=graph.getparent()
        if fold.tag=='details':
            fold.tag='div'
            for summary in fold.findall('summary'):remove(summary)
    history=spacex.xpath('//*[@id="historik"]')
    overview=spacex.xpath('//*[@id="overblik"]')
    if history and overview: overview[0].addnext(history[0])
    for fold in spacex.xpath('//details[summary[contains(.,"Se billedet af sideboosterne")]]'):
        fold.tag='div'
        for summary in fold.findall('summary'):remove(summary)
    save(spacex,DEST/'selskaber/spacex.html')
    print('Built isolated preview:', DEST)

if __name__ == '__main__': build()
