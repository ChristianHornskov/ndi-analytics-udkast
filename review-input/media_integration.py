from pathlib import Path
from lxml import html
from html import escape
import json,shutil

def build_media(dest):
    source=Path(__file__).parent
    data=json.loads((source/'media-selection.json').read_text(encoding='utf8'))
    counts={'pages':0,'youtube':0,'instagram':0,'x':0}
    for file,entry in data.items():
        path=dest/file;text=path.read_text(encoding='utf8');page=html.fromstring(text)
        groups=[]
        for kind in ['youtube','instagram','x']:
            cards=[]
            for item in entry[kind]:
                if item['id'] in text:continue
                if kind=='youtube':
                    title=item['title'] if '\ufffd' not in item['title'] else 'Mads Christiansen om '+entry['name']
                    start=int(item['start']);stamp=f'{start//60}:{start%60:02d}'
                    cards.append(f'<article class="rm-video"><button type="button" class="rm-play" data-youtube="{escape(item["id"])}" data-start="{start}" aria-label="Afspil {escape(title)}"><img loading="lazy" src="https://i.ytimg.com/vi/{escape(item["id"])}/hqdefault.jpg" alt=""><span class="rm-play-icon" aria-hidden="true">▶</span><span class="rm-start">Se fra {stamp}</span></button><div class="rm-caption"><p class="rm-source">NEWDEAL INVEST · {escape(item["date"])}</p><h3>{escape(title)}</h3><a href="https://www.youtube.com/watch?v={escape(item["id"])}&amp;t={start}s" target="_blank" rel="noopener">Se på YouTube ↗</a></div></article>')
                elif kind=='instagram':
                    cards.append(f'<article class="rm-social"><p class="rm-source">INSTAGRAM · NEWDEAL INVEST · {escape(item["date"])}</p><h3>Kort om {escape(entry["name"])}</h3><button type="button" data-instagram="{escape(item["url"])}">Afspil klippet her</button><a href="{escape(item["url"])}" target="_blank" rel="noopener">Åbn på Instagram ↗</a><div class="rm-embed"></div></article>')
                else:
                    label='Skrevet af Mads Christiansen' if item['type']=='egen' else 'Delt af Mads Christiansen'
                    cards.append(f'<article class="rm-social rm-x"><p class="rm-source">X · {escape(item["date"])}</p><h3>{label}</h3><div class="rm-embed" data-x="{escape(item["id"])}"></div><a href="{escape(item["url"])}" target="_blank" rel="noopener">Læs det originale opslag på X ↗</a></article>')
                counts[kind]+=1
            if cards:
                label={'youtube':'videoer','instagram':'korte klip','x':'opslag'}[kind]
                shown=cards[:2];extra=cards[2:]
                groups.append('<div class="rm-grid rm-grid-'+kind+'">'+''.join(shown)+'</div>')
                if extra:
                    groups.append('<details class="rm-more"><summary>Se flere '+label+' ('+str(len(extra))+')</summary><div class="rm-grid rm-grid-'+kind+'">'+''.join(extra)+'</div></details>')
        if not groups:continue
        section=html.fragment_fromstring('<section class="rm-section" id="mere-fra-ndi" aria-labelledby="rm-title"><p class="rm-source">VIDEOER OG OPSLAG</p><h2 id="rm-title">Bliv klogere på '+escape(entry['name'])+'</h2>'+''.join(groups)+'</section>')
        markup=html.tostring(section,encoding='unicode')
        # Insert without reserializing unrelated page markup or SVGs.
        import re
        match=re.search(r'<section\b[^>]*\bid="(?:videre|kilder)"',text)
        if match:text=text[:match.start()]+markup+text[match.start():]
        else:text=text.replace('</main>',markup+'</main>',1)
        text=text.replace('</head>','<link rel="stylesheet" href="../assets/css/review-media.css?v=20261031-1"></head>',1)
        text=text.replace('</body>','<script defer src="../assets/js/review-media.js?v=20261031-1"></script></body>',1)
        path.write_text(text,encoding='utf8');counts['pages']+=1
    for name,folder in [('review-media.css','css'),('review-media.js','js')]:shutil.copyfile(source/name,dest/'assets'/folder/name)
    (source/'MEDIA-INTEGRATION-STATUS.json').write_text(json.dumps(counts,indent=2),encoding='utf8')
    print('Media integration:',counts)
