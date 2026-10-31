"""Reuse the publicly released homepage widget; isolate preview-only additions."""
from pathlib import Path
import shutil
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
    tree.find('head').append(html.fragment_fromstring('<link rel="stylesheet" href="preview-adapter.css?v=20261031d">'))
    body=tree.find('body')
    for src in ['homepage-patch.js','../data/review-funds.js','preview-adapter.js?v=20261031d']:
        body.append(html.fragment_fromstring('<script src="'+src+'"></script>'))
    (widget/'index.html').write_text(html.tostring(tree,encoding='unicode',doctype='<!doctype html>'),encoding='utf-8')
    for name in ['preview-adapter.js','preview-adapter.css']:
        shutil.copyfile(Path(__file__).with_name(name),widget/name)
