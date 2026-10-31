from lxml import html


def enrich_spacex(page):
    timeline = page.xpath('//ol[@class="tidslinje"]')[0]
    stage = html.fragment_fromstring('<div class="sx-history"><div class="sx-history-art" aria-hidden="true"></div><div class="sx-history-content"><p class="sx-history-eyebrow">EN REJSE GENNEM SPACEX</p><div class="sx-years" role="group" aria-label="Vælg en milepæl"></div><div class="sx-chapters"></div></div></div>')
    # A shared orbital scene; each milestone lights a different part of the system.
    stage[0].append(html.fragment_fromstring('''<svg viewBox="0 0 520 600" class="sx-journey-scene"><defs><radialGradient id="sx-journey-earth"><stop stop-color="#497b89"/><stop offset="1" stop-color="#112c40"/></radialGradient></defs><g fill="#b9dae3" opacity=".55"><circle cx="80" cy="70" r="2"/><circle cx="460" cy="90" r="2"/><circle cx="395" cy="200" r="1.5"/><circle cx="90" cy="300" r="1.5"/><circle cx="220" cy="45" r="1"/></g><circle cx="260" cy="420" r="160" fill="url(#sx-journey-earth)"/><g fill="none" stroke="#6e9caa" opacity=".3"><ellipse cx="260" cy="420" rx="80" ry="160"/><ellipse cx="260" cy="420" rx="160" ry="55"/><path d="M100 420h320M260 260v320"/></g><ellipse cx="260" cy="350" rx="226" ry="140" transform="rotate(-28 260 350)" fill="none" stroke="#accbd2" stroke-dasharray="3 9" opacity=".4"/><path d="M155 485Q40 240 275 90" fill="none" stroke="#ece59c" stroke-width="2" stroke-dasharray="5 9"/>
    <g class="sx-scene-rocket" transform="translate(135 285) rotate(18)"><path d="M0-70Q-24-36-18 22H18Q24-36 0-70Z" fill="#e7eef0"/><path d="M-18 5l-17 32 19-8M18 5l17 32-19-8" fill="#7aa6b0"/><path d="M-9 27L0 75 9 27" fill="#eee69b"/><circle cy="-25" r="8" fill="#163e50"/></g>
    <g class="sx-scene-station" transform="translate(330 160) rotate(-20)" stroke="#b4d4dc" stroke-width="2"><path d="M-65 0H65"/><rect x="-18" y="-12" width="36" height="24" fill="#dbe7e9"/><path d="M-82-42h30v84h-30zM52-42h30v84H52z" fill="#356a83"/><path d="M-82-14h30m-30 28h30M52-14h30m-30 28h30"/></g>
    <g class="sx-scene-network" stroke="#b6d5df" fill="#557e94"><path d="M335 80L430 260 230 210Z" fill="none" stroke-dasharray="4 6"/><path d="M315 70h40v18h-40zM410 250h40v18h-40zM210 200h40v18h-40z"/><circle cx="335" cy="79" r="9" fill="#f1e99f"/><circle cx="430" cy="259" r="9" fill="#f1e99f"/><circle cx="230" cy="209" r="9" fill="#f1e99f"/></g><g class="sx-scene-market" transform="translate(310 180)" fill="none" stroke="#eee69b" stroke-width="4"><path d="M0 80V15m30 65V-10m30 90V-40m30 120V-75"/></g></svg>'''))
    for i, item in enumerate(list(timeline)):
        date = item.xpath('.//*[contains(@class,"tl-aar")]')[0].text_content()
        button = html.Element('button', {'type':'button','data-sx-year':str(i),'aria-pressed':str(i==0).lower(),'aria-controls':'sx-chapter-'+str(i)})
        button.text=date; stage[1][1].append(button)
        item.tag='article'; item.set('class','sx-chapter'); item.set('id','sx-chapter-'+str(i))
        item.set('data-sx-chapter',str(i))
        if i: item.set('hidden','')
        stage[1][2].append(item)
    stage.set('data-era','0')
    timeline.getparent().replace(timeline, stage)

    # Keep the actual financial charts, remove nested display controls around them.
    numbers=page.get_element_by_id('noegletal')
    for node in numbers.xpath('.//details'):
        summary=node.find('summary')
        if summary is not None and any(s in summary.text_content().lower() for s in ['tal og graf','se grafen']):
            node.remove(summary); node.tag='div'
    numbers.classes.add('sx-financials')
    kpis=numbers.xpath('.//li[contains(@class,"kpi")]')
    if len(kpis)==2:
        note=html.fragment_fromstring('<details class="sx-stock-note"><summary>Om løn i aktier</summary></details>')
        tail=kpis[0].xpath('./p[contains(@class,"kpi-del")]')[0]
        for item in list(kpis[0])[list(kpis[0]).index(tail):]: note.append(item)
        kpis[0].append(note)
        share=16.44/19.59*100
        kpis[1].append(html.fragment_fromstring(f'<div class="sx-capex"><div class="sx-capex-track" aria-hidden="true"><span style="width:{share:.4f}%"></span></div><p>Cirka {share:.0f} % af investeringerne gik til AI.</p></div>'))

    perspectives=html.fragment_fromstring('<section class="sektion sx-perspectives" id="mads-spacex"><header><p class="sektion-kicker">VORES PERSPEKTIV</p><h2>Mads om SpaceX</h2><p>Se gennemgangene, eller følg de diskussioner, Mads tager op på X.</p></header><div class="sx-films"></div><h3 class="sx-mads-x-title">Mads på X</h3><div class="sx-mads-posts"></div></section>')
    for vid,title,day,start,stamp in [('GBPffuqKxi8','Starlink i Ukraine · Kort og godt, Ep. 7','20. oktober 2026',1990,'33:10'),('uDlalQXDfgc','Hvordan ser vi på SpaceX?','8. juni 2026',596,'09:56'),('M59oD0hdcE0','Mads gennemgår regnskabet for 2. kvartal','5. august 2026',0,'00:00')]:
        perspectives[1].append(html.fragment_fromstring(f'<article class="sx-film"><button class="sx-video-start" type="button" data-video="{vid}" data-start="{start}" aria-label="Afspil {title}"><img src="https://i.ytimg.com/vi/{vid}/hqdefault.jpg" alt="" loading="lazy"><span class="sx-play" aria-hidden="true">▶</span><span class="sx-video-time">Fra {stamp}</span></button><p class="sektion-kicker">{day}</p><h4>{title}</h4><a href="https://www.youtube.com/watch?v={vid}&amp;t={start}s" target="_blank" rel="noopener">Se på YouTube ↗</a></article>'))
    for post in ['2112436619244400908','2110461609793441807']:
        url='https://x.com/MadsC007/status/'+post
        perspectives[3].append(html.fragment_fromstring(f'<article><p class="sektion-kicker">Mads Christiansen · @MadsC007</p><div class="x-embed" data-x-id="{post}"><div class="x-embed-vent"><a href="{url}" target="_blank" rel="noopener">Se Mads’ opslag på X ↗</a></div></div></article>'))
    points=page.get_element_by_id('pointer')
    points.addprevious(perspectives)


