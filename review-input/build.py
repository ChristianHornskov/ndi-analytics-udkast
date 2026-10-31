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
    text=html.tostring(tree, encoding='unicode', doctype='<!doctype html>')
    for phrase in [' Skematisk, ikke i målestok.',' Skematisk tegning, ikke i målestok.','Principskitse — ikke konkrete selskabstal eller en prognose. ']:
        text=text.replace(phrase,'')
    path.write_text(text,encoding='utf-8')

def build():
    shutil.copytree(SOURCE, DEST, dirs_exist_ok=True)
    shutil.copyfile(Path(__file__).with_name('review.css'), DEST/'assets/css/review.css')
    compile_funds(SOURCE,DEST)
    shutil.copytree(Path(__file__).with_name('zoom-assets'),DEST/'assets/review-zoom',dirs_exist_ok=True)
    shutil.copyfile(Path(__file__).with_name('journey.js'),DEST/'assets/js/review-journey.js')
    atlas_source=(SOURCE/'assets/v5-atlas/atlas-living.mjs').read_text(encoding='utf-8')
    atlas_source=atlas_source.replace('simpleConnections=false}={}', 'simpleConnections=false,introOnly=false}={}')
    atlas_source=atlas_source.replace('pauseBtn.hidden=reducedMotion', 'pauseBtn.hidden=reducedMotion||introOnly')
    atlas_source=atlas_source.replace("host.classList.add('is-gathered');if(counter)counter.textContent=String(layout.dots.length)","host.classList.add('is-gathered');if(counter)counter.textContent=String(layout.dots.length);if(introOnly)setPaused(true)")
    atlas_source=atlas_source.replace("['data-theme','class','style']","['data-theme','data-tema','class','style']")
    (DEST/'assets/v5-atlas/atlas-living.mjs').write_text(atlas_source,encoding='utf-8')
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
            for node in cls(tree,'maerke-sub'):node.text='Tech-guide'
            for node in cls(tree,'maerke-navn'):node.text='Tech'
            nav=tree.xpath('//*[@id="sm-h-fond"]/following-sibling::ul')[0]
            nav.insert(0,html.fragment_fromstring('<li><a class="sm-link" href="#ai-rejsen" data-spy="ai-rejsen">Fra skærm til strøm</a></li>'))
            nav.insert(0,html.fragment_fromstring('<li><a class="sm-link" href="#forbindelser" data-spy="forbindelser">Se forbindelserne</a></li>'))
            for name in ['allocation-review','v18-top']:
                for node in cls(tree,name): remove(node)
            for node in tree.xpath('//*[@id="portefoeljen"]'): remove(node)
            atlas = tree.xpath('//*[@id="forbindelser"]')[0]
            for script in atlas.findall('script'):
                script.text=script.text.replace('simpleConnections:true','simpleConnections:true,introOnly:true')
            for map_host in atlas.xpath('.//*[@id="living-map"]'):map_host.attrib.pop('style',None)
            hub.addnext(atlas)
            atlas.addnext(html.fragment_fromstring('<section id="ai-rejsen" class="review-journey"></section>'))
            tree.find('body').append(html.fragment_fromstring('<script src="assets/js/review-journey.js"></script>'))
            for node in tree.xpath('//*[@data-spy="top10" or @data-spy="portefoeljen"]'):
                remove(node.getparent())
            for node in tree.xpath('//*[@data-portefolje]'):
                if node.getparent() is not None: remove(node)
        else:
            for name in ['v18-atlas', 'v18-faser','photo-theme-grid']:
                for node in cls(tree,name): remove(node)
            heading=tree.xpath('//*[@id="h-temaer"]')[0];heading.text='Hvor er pengene investeret?'
            for p in tree.xpath('//*[@id="temaer"]/p'):
                p.clear();p.text='Temaerne viser, hvilke dele af teknologiens værdikæder fonden investerer i. Vælg et tema for at se selskaberne bag.'
            for heading in tree.xpath('//*[@id="h-fylder"]'):remove(heading)
            for section in cls(tree,'allocation-review'):section.set('aria-labelledby','h-temaer')
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
    original_info=chart[start:end].replace('function vigtig()', 'function pmindiVigtig()')
    chart=chart[:start]+original_info+'''  function vigtig() {
      if(F.id==='PMINDI'){pmindiVigtig();return;}
      if(info) info.innerHTML='<p>Grafen viser totalafkast efter fondens løbende omkostninger. Historisk afkast er ingen garanti for fremtidigt afkast. Du kan tabe penge. <a target="_blank" rel="noopener" href="'+F.kidUrl+'">Læs klassens PRIIP-KID ↗</a> · <a href="https://www.newdealinvest.dk/risici" target="_blank" rel="noopener">Risici ↗</a></p>';
  }
''' +chart[end:]
    start=chart.index('  if (app) {\n    app.innerHTML = skelet();')
    chart=chart[:start]+Path(__file__).with_name('widget-controller.js').read_text(encoding='utf-8')
    (DEST/'assets/js/review-widget.js').write_text(chart,encoding='utf-8')
    spacex=html.parse(str(SOURCE/'selskaber/spacex.html')).getroot()
    spacex.find('head').append(html.fragment_fromstring('<link rel="stylesheet" href="../assets/css/review.css">'))
    history=spacex.xpath('//*[@id="historik"]')
    cards=cls(spacex,'kort--andel')
    if history and cards:
        card=cards[0];card.set('id','andel-historie')
        for graph in spacex.xpath('//*[@id="minigraf"]'):remove(graph.getparent())
        for footer in card.findall('footer'):remove(footer)
        card.append(html.fragment_fromstring('<div id="historik"><h3>Positionen måned for måned</h3><p class="lille">Andel af PMINDI. Den kan ændre sig både ved kursbevægelser og ved køb eller salg.</p></div>'))
        for node in history[0].xpath('.//*[@id="graf-andel"]|.//template[@id="tpl-historik"]|.//details[@class="tabel-fold"]|.//p[@class="kildelinje"]'):
            card.append(node)
        remove(history[0])
    for fold in spacex.xpath('//details[summary[contains(.,"Se billedet af sideboosterne")]]'):
        fold.tag='div'
        for summary in fold.findall('summary'):remove(summary)
    save(spacex,DEST/'selskaber/spacex.html')
    # A consistent route back from every company and technology page.
    for path in list((DEST/'selskaber').glob('*.html'))+list((DEST/'temaer').glob('*.html')):
        page=html.parse(str(path)).getroot()
        menus=cls(page,'sm-top')
        if menus:
            menus[0].addnext(html.fragment_fromstring('<nav class="review-section-nav" aria-label="Vælg indgang"><a href="../index.html">Porteføljen</a><a href="../tech.html">Tech</a><a href="../widget/index.html">Afkast</a></nav>'))
            if not page.xpath('//link[contains(@href,"review.css")]'):
                page.find('head').append(html.fragment_fromstring('<link rel="stylesheet" href="../assets/css/review.css">'))
            save(page,path)
    print('Built isolated preview:', DEST)

if __name__ == '__main__': build()
