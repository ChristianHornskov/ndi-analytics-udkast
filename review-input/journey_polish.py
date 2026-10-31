"""Review-only navigation, media and page-weight refinements; no data changes."""
from pathlib import Path
from html import escape
from lxml import html
import json,re,shutil,hashlib

def polish(dest):
    source=Path(__file__).parent
    data=json.loads((dest/'data/dagens-tal.json').read_text(encoding='utf8'))
    destinations={
      'temaer':'tech.html#temaer','hvert-tema':'tech.html#temaer',
      'top10':'portfolio/index.html#portfolio','portefoeljen':'portfolio/index.html#portfolio',
      'portefoeljen-portfolio':'portfolio/index.html#portfolio','portefoeljen-highs':'portfolio/index.html#highs',
      'portefoeljen-risk-summary':'portfolio/index.html#preview-risk-summary',
      'portefoeljen-method':'portfolio/index.html#method',
      'vigtig-information':'widget/index.html#global-disclaimer','vide':'tech.html#virksomhedsfaser'}
    for path in dest.rglob('*.html'):
        text=path.read_text(encoding='utf8')
        rel='../' if path.parent!=dest else ''
        # Short local asset paths also work on Windows preview servers with MAX_PATH.
        for raw in set(re.findall(r'(?:\.\./)?assets/img/v5-temaer/[^"\s<>]+\.(?:svg|webp|png|jpg)',text)):
            asset=(path.parent/raw).resolve()
            if len(str(asset))<240 or not asset.exists():continue
            name=hashlib.sha256(raw.encode()).hexdigest()[:12]+asset.suffix
            target=dest/'assets/review-img'/name;target.parent.mkdir(exist_ok=True)
            shutil.copyfile(asset,target)
            text=text.replace(raw,rel+'assets/review-img/'+name)
        text=re.sub(r'<section\b[^>]*class="ndi-reading theme-question"[^>]*>.*?</section>','',text,flags=re.S)
        if path.parent.name=='temaer' and path.stem=='fintech':
            companies=next(t['selskaber'] for t in data['temaer'] if t['id']=='fintech')[:3]
            bars=''.join('<a href="../selskaber/'+c['slug']+'.html"><span>'+escape(c['navn'])+'</span><strong>'+str(c['andel']).replace('.',',')+' %</strong></a>' for c in companies)
            replacement='<section class="sektion up-fintech" id="spredt" aria-labelledby="spredt-h"><p class="sektion-kicker">FONDENS STØRSTE POSITIONER I TEMAET</p><h2 id="spredt-h">Flere veje ind i fintech</h2><p>Handelsplatforme, betalinger og finansielle tjenester løser forskellige opgaver. Her er de tre største positioner i temaet.</p><div>'+bars+'</div></section>'
            text=re.sub(r'<section\b[^>]*id="spredt"[^>]*>.*?</section>',replacement,text,flags=re.S)
        def link(m):
            href=m.group(1)
            for old,new in destinations.items():
                if href in (rel+'index.html#'+old,):return 'href="'+rel+new+'"'
            if href==rel+'index.html':return 'href="'+rel+'portfolio/index.html"'
            if 'rumfart.html#retninger' in href:return 'href="'+href.replace('#retninger','#cq-rum')+'"'
            return m.group(0)
        text=re.sub(r'href="([^"]+)"',link,text)
        if path.parent.name in ('temaer','selskaber'):
            page=html.fromstring(text)
            h1=page.xpath('//h1')[0] if page.xpath('//h1') else None
            name=' '.join(h1.itertext()).strip() if h1 is not None else path.stem
            text=re.sub(r'<p class="v18s-tilbage">.*?</p>','',text,flags=re.S)
            if path.parent.name=='selskaber' and max(map(len,name.split()),default=0)>13:
                text=text.replace('class="v18s-hoved ', 'class="up-long-name v18s-hoved ',1)
            parts='<a href="../tech.html">Tech</a>'
            company=data['selskaber'].get(path.stem)
            if path.parent.name=='selskaber' and company:
                parts+=f'<span aria-hidden="true">/</span><a href="../temaer/{company["tema"]}.html">{escape(company["temaNavn"])}</a>'
            parts+='<span aria-hidden="true">/</span><span aria-current="page">'+escape(name)+'</span>'
            trail='<nav class="up-trail" aria-label="Du er her">'+parts+'</nav>'
            choices=[]
            ids=set(page.xpath('//*[@id]/@id'))
            for candidates,label in [(['ck-kaede','cq-dc','cq-fa','cq-rum','cq-ft','cq-kr','cq-pl','cq-rs','cq-sw','cq-su','cq-kv','hvad','forretning'],'Forstå teknologien'),(['kaeden','grupper','selskaberne'],'Selskaberne'),(['mere-fra-ndi'],'Videoer & opslag')]:
                target=next((c for c in candidates if c in ids),None)
                if path.parent.name=='selskaber' and label=='Forstå teknologien':label='Forstå selskabet'
                if target:choices.append(f'<a href="#{target}">{label}</a>')
            if choices:trail+='<nav class="up-shortcuts" aria-label="På denne side">'+''.join(choices)+'</nav>'
            text=re.sub(r'(<main\b[^>]*>)',lambda m:m[0]+trail,text,count=1)
        if path.name!='index.html' or path.parent!=dest:
            text=text.replace('</head>',f'<link rel="stylesheet" href="{rel}assets/css/journey-polish.css?v=20261031b"></head>',1)
            text=text.replace('</body>',f'<script defer src="{rel}assets/js/journey-polish.js?v=20261031"></script></body>',1)
        # Real YouTube thumbnails for existing click-to-play videos. Keep player handlers intact.
        page=html.fromstring(text)
        changed=False
        for frame in page.xpath('//*[contains(concat(" ",normalize-space(@class)," ")," vid-ramme ")]'):
            video=next((v for k,v in frame.attrib.items() if (k=='data-yt' or k.endswith('-yt')) and re.fullmatch(r'[A-Za-z0-9_-]{11}',v)),None)
            buttons=frame.xpath('.//button[contains(concat(" ",normalize-space(@class)," ")," vid-play ")]')
            if not video or not buttons:continue
            button=buttons[0]
            for poster in button.xpath('.//*[contains(concat(" ",normalize-space(@class)," ")," pd-video-poster ")]'):
                poster.getparent().remove(poster)
            if not button.xpath('.//img'):
                img=html.Element('img',src='https://i.ytimg.com/vi/'+video+'/hqdefault.jpg',alt='',loading='lazy',decoding='async')
                img.set('class','up-video-thumbnail');button.insert(0,img)
                button.set('class',button.get('class','')+' up-thumbnail-play')
                changed=True
        if changed:text=html.tostring(page,encoding='unicode',method='html')
        # Remove accumulated serialization whitespace, without touching script, SVG or text.
        text=re.sub(r'>[\r\n\t ]{3,}<','>\n<',text)
        path.write_text(text,encoding='utf8')
    # Keep the existing feed; disclose extra posts before registering lazy observers.
    xp=dest/'assets/js/x-tema.js';text=xp.read_text(encoding='utf8')
    text=text.replace("      pending.forEach(observer);",'''      if(ul.children.length>2){
        var more=el('details','rm-more'), title=el('summary',null,'Se flere X-opslag ('+(ul.children.length-2)+')'), rest=el('ul','x-tema-liste');
        more.appendChild(title);more.appendChild(rest);while(ul.children.length>2)rest.appendChild(ul.children[2]);ul.after(more);
      }
      pending.forEach(observer);''')
    text=text.replace('if (MOBIL.matches) {','if (false) {').replace("rootMargin: '600px 0px'","rootMargin: '100px 0px'")
    xp.write_text(text,encoding='utf8')
    for name,folder in [('journey-polish.css','css'),('journey-polish.js','js')]:shutil.copyfile(source/name,dest/'assets'/folder/name)
    # Only the names already present in the verified directory are linked.
    (dest/'data/company-routes.json').write_text(json.dumps({v['navn']:'../selskaber/'+k+'.html' for k,v in data['selskaber'].items()},ensure_ascii=False),encoding='utf8')
