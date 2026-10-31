"""Selective integration of Claude 871aa329; preserve current pages and source data."""
from pathlib import Path
import shutil,re
from lxml import html

def integrate(dest):
    source=Path(__file__).with_name('claude-grafik')
    for folder in ['assets','animationer','portfolio']:
        for src in (source/folder).rglob('*'):
            if src.is_file() and src.suffix in ('.js','.css','.svg'):
                out=dest/src.relative_to(source);out.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(src,out)
    def load(path):return html.fromstring(path.read_text(encoding='utf8'))
    def save(tree,path):path.write_text(re.sub(r'>[\r\n\t ]{3,}<','>\n<',html.tostring(tree,encoding='unicode',doctype='<!doctype html>')),encoding='utf8')
    def asset(tree,url):
        if url.endswith('.css'): tree.find('head').append(html.Element('link',rel='stylesheet',href=url+'?v=20261031-integrated'))
        else: tree.find('body').append(html.Element('script',src=url+'?v=20261031-integrated',defer='defer'))
    for filename,ids in [('tech.html',['virksomhedsfaser']),('temaer/fysisk-ai.html',['cq-fa']),('temaer/rumfart.html',['penge'])]:
        path=dest/filename;tree=load(path);new=load(source/filename)
        for ident in ids:
            old=tree.get_element_by_id(ident);replacement=new.get_element_by_id(ident);old.getparent().replace(old,replacement)
        if filename=='tech.html':asset(tree,'assets/css/faser-graf.css')
        save(tree,path)
    # Replace the schematic company-size figure, not the neighbouring overlap text.
    path=dest/'temaer/krypto.html';tree=load(path);supplied=load(source/'temaer/krypto.html')
    old=tree.xpath('//div[@class="bog-g"]/figure[contains(concat(" ",normalize-space(@class)," ")," smaa ")]')
    assert len(old)==1,'Expected one original crypto size figure'
    old[0].getparent().replace(old[0],supplied.get_element_by_id('kr-andele'));save(tree,path)
    for path in (dest/'selskaber').glob('*.html'):
        tree=load(path);changed=False
        if path.stem in ['etoro-group','sofi']:
            supplied=load(source/'selskaber'/path.name)
            xp='//*[contains(concat(" ",normalize-space(@class)," ")," kort--topanim ")]'
            old=tree.xpath(xp);new=supplied.xpath(xp)
            assert len(old)==len(new)==1,path
            old[0].getparent().replace(old[0],new[0]);changed=True
        if tree.xpath('//*[contains(concat(" ",normalize-space(@class)," ")," pd-revenues ")]'):
            asset(tree,'../assets/css/omsaetning.css');asset(tree,'../assets/js/omsaetning.js');changed=True
        if changed:save(tree,path)
    # Desktop histogram; mobile weight bars using the same interval palette.
    css=dest/'portfolio/grafik-v19.css';s=css.read_text(encoding='utf8')
    palette=['#89aeb4','#91b5b5','#9bbbaf','#aac2ad','#bac8ad','#cbd0aa','#ddd8a6','#f5ee9e','#d9b38d','#d38f88']
    for i,color in enumerate(palette,1):
        s+=f'\n.g19-hl-liste li:nth-child({i}) .g19-hl-b i{{background:{color}}}'
    s+='\n.portfolio-analysis #drawdown .g19-nedture-svg text{font-size:revert-layer}\n'
    # Old mobile repair rules must not override the new graph's responsive text.
    s+='\n.portfolio-analysis #drawdown .g19-nedture-svg .g19-akse{font-size:12px}.portfolio-analysis #drawdown .g19-nedture-svg .g19-tal-stor{font-size:14px}.portfolio-analysis #drawdown .g19-nedture-svg .g19-dato{font-size:11px}.portfolio-analysis #drawdown .g19-nedture-svg .g19-tal{font-size:12px}\n'
    css.write_text(s,encoding='utf8')
    path=dest/'portfolio/index.html';tree=load(path);asset(tree,'grafik-v19.css');asset(tree,'grafik-v19.js');save(tree,path)
    # Never guess a company's business model when a name lookup misses.
    path=dest/'assets/v5-temaer/krypto.js';s=path.read_text(encoding='utf8').replace("ROLLE[f]||'Ejer en beholdning'","ROLLE[f]||'Selskab i kryptotemaet'");path.write_text(s,encoding='utf8')
    # Cache-bust only touched assets, preserving all current navigation and media.
    names=['topanimation.js','topanimation.css','pointer.js','v5-faser.js','fysisk-ai.js','fysisk-ai.css','krypto.js','krypto.css','rumfart.css']
    for path in dest.rglob('*.html'):
        s=path.read_text(encoding='utf8');old=s
        for name in names:s=re.sub(r'((?:src|href)="[^"?]*'+re.escape(name)+r')(?:\?[^"]*)?"',r'\1?v=20261031-integrated"',s)
        if s!=old:path.write_text(s,encoding='utf8')
