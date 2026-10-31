"""Reuse the publicly released homepage widget; isolate preview-only additions."""
from pathlib import Path
import shutil,json
from lxml import html

def build_homepage_widget(dest):
    source=Path(__file__).with_name('homepage-source')
    widget=dest/'widget'
    for path in source.iterdir():
        if path.name not in ('loader.html','provenance.json','simple-embed.html'):
            shutil.copyfile(path,widget/path.name)
    # The preview is pinned. Never let the production refresh redirect out of it.
    production=widget/'production-embed.js'
    code=production.read_text(encoding='utf-8')
    start=code.index('setInterval(async()=>{')
    end=code.index('},300000);',start)+len('},300000);')
    production.write_text(code[:start]+'// Preview: pinned to the documented release.\n'+code[end:],encoding='utf-8')
    tree=html.parse(str(source/'simple-embed.html')).getroot()
    tree.find('head/title').text='Fondens udvikling · NewDeal Invest · Preview'
    tree.find('head').append(html.fragment_fromstring('<link rel="stylesheet" href="preview-adapter.css?v=20261031g">'))
    body=tree.find('body')
    for src in ['homepage-patch.js','../data/review-funds.js','preview-adapter.js?v=20261031g']:
        body.append(html.fragment_fromstring('<script src="'+src+'"></script>'))
    (widget/'index.html').write_text(html.tostring(tree,encoding='unicode',doctype='<!doctype html>'),encoding='utf-8')
    for name in ['preview-adapter.js','preview-adapter.css']:
        shutil.copyfile(Path(__file__).with_name(name),widget/name)

    portfolio=dest/'portfolio'
    portfolio.mkdir(exist_ok=True)
    for path in widget.iterdir():
        if path.is_file() and path.name not in ('index.html','preview-adapter.js','preview-adapter.css'):
            shutil.copyfile(path,portfolio/path.name)
    analysis=html.parse(str(source/'simple-embed.html')).getroot()
    analysis.find('head/title').text='Porteføljeanalyse · PMINDI · NewDeal Invest'
    analysis.find('head').append(html.fragment_fromstring('<link rel="stylesheet" href="portfolio.css?v=20261031e">'))
    supplement=json.loads(Path(__file__).with_name('portfolio-market-supplement.json').read_text(encoding='utf8'))
    (portfolio/'market-supplement.js').write_text('window.NDI_PORTFOLIO_SUPPLEMENT='+json.dumps(supplement,ensure_ascii=False)+';',encoding='utf8')
    for src in ['homepage-patch.js','market-supplement.js','portfolio.js?v=20261031f']:
        analysis.find('body').append(html.fragment_fromstring('<script src="'+src+'"></script>'))
    (portfolio/'index.html').write_text(html.tostring(analysis,encoding='unicode',doctype='<!doctype html>'),encoding='utf-8')
    for name in ['portfolio.js','portfolio.css']:
        shutil.copyfile(Path(__file__).with_name(name),portfolio/name)
    (dest/'index.html').write_text('<!doctype html><html lang="da"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Porteføljeanalyse</title></head><body><a href="portfolio/index.html">Åbn porteføljeanalysen</a><script>location.replace("portfolio/index.html"+location.hash)</script></body></html>',encoding='utf-8')
