from pathlib import Path
from copy import deepcopy
from lxml import html


def refine_spacex(page, source, dest):
    def drop(node):
        node.getparent().remove(node)

    def unwrap(node):
        node.tag = 'div'
        node.attrib.pop('data-aaben-bred', None)
        for summary in node.findall('summary'):
            drop(summary)

    page.find('body').classes.add('sx-refined')
    page.find('head').append(html.fragment_fromstring('<link rel="stylesheet" href="../assets/css/spacex-review.css?v=1">'))
    page.find('body').append(html.fragment_fromstring('<script defer src="../assets/js/spacex-review.js?v=1"></script>'))
    for ext, folder in [('css', 'css'), ('js', 'js')]:
        (dest/'assets'/folder/('spacex-review.'+ext)).write_bytes(Path(__file__).with_name('spacex-review.'+ext).read_bytes())

    # Preserve the existing explanations and data, give the introduction a visual anchor.
    what = page.get_element_by_id('hvad')
    for node in what.xpath('.//details[contains(@class,"fold-kilder")]'):
        drop(node)
    intro = what.xpath('.//article')[0]
    intro.classes.add('sx-intro-copy')
    photo = html.fragment_fromstring('<figure class="sx-story-photo"><img src="../assets/img/booster-retur-1200.webp" alt="To Falcon Heavy-rakettrin vender tilbage til landingspladsen" loading="lazy"><figcaption>Genbrug ændrer økonomien i en opsendelse.<small>Foto: SpaceX / NOAA · CC0 · GOES-U, 2024</small></figcaption></figure>')
    intro.insert(0, photo)
    for index, li in enumerate(intro.xpath('./ul/li')):
        li.insert(0, html.fragment_fromstring('<span class="sx-step-no" aria-hidden="true">0'+str(index+1)+'</span>'))
    for node in what.xpath('.//details[contains(@class,"fold-mobil")]'):
        unwrap(node)

    # One interactive illustration, reusing the earlier V5 globe and existing descriptions.
    business = page.get_element_by_id('forretning')
    tiles = business.xpath('.//div[contains(@class,"flise-raekke")]/article')
    orbit = html.fromstring(Path(__file__).with_name('spacex-orbit.svg').read_text(encoding='utf-8'))
    orbit.attrib.pop('role', None)
    orbit.set('class', 'sx-orbit')
    orbit.set('aria-label', 'Udforsk opsendelser, Starlink og AI på Jorden')
    ids = ['launch', 'network', 'compute']
    labels = ['Opsendelser', 'Starlink', 'AI på Jorden']
    system = html.fragment_fromstring('<div class="sx-system s12"><div class="sx-orbit-wrap"></div><div class="sx-system-reading"><div class="sx-system-tabs" role="group" aria-label="Vælg en del af SpaceX"></div></div></div>')
    system[0].append(orbit)
    system[0].append(html.fragment_fromstring('<p class="sx-interaction-hint">Peg på raketten, satellitten eller datacentret — eller tryk for at udforske.</p>'))
    for i, (key, label, tile) in enumerate(zip(ids, labels, tiles)):
        group = orbit.xpath('.//*[@data-orbit-part="'+key+'"]')[0]
        group.set('tabindex', '0'); group.set('role', 'button'); group.set('aria-label', label)
        group.set('aria-controls', 'sx-part-'+key)
        system[1][0].append(html.fragment_fromstring('<button type="button" data-sx-select="'+key+'" aria-pressed="'+str(i==0).lower()+'" aria-controls="sx-part-'+key+'">'+label+'</button>'))
        tile.set('class', 'sx-part'); tile.set('id', 'sx-part-'+key); tile.set('data-sx-panel', key)
        if i: tile.set('hidden', '')
        for detail in tile.findall('details'): unwrap(detail)
        for link in tile.xpath('.//a[contains(@href,"sec.gov")]'): drop(link)
        system[1].append(tile)
    old = business.xpath('.//details[contains(@class,"fold-tegning")]')[0]
    old.getparent().replace(old, system)
    for row in business.xpath('.//div[contains(@class,"flise-raekke")]'): drop(row)

    # Put the two existing, identified SpaceX videos on this page, not just a cross-link.
    videos = business.xpath('.//div[contains(@class,"video-raekke")]')[0]
    videos.clear(); videos.set('class', 'sx-films s12'); videos.set('id','spacex-videoer')
    videos.append(html.fragment_fromstring('<header><p class="sektion-kicker">SE DET I VIRKELIGHEDEN</p><h3>Fra opsendelse til satellitter i kredsløb</h3></header>'))
    for vid, title, desc in [('wbSwFU6tY1c','Den første flyvning med Falcon Heavy','SpaceX · 2018'),('KzpVUXxdc68','En opsendelse med 53 satellitter','SpaceX · 2022')]:
        videos.append(html.fragment_fromstring('<article class="sx-film"><button type="button" class="sx-video-start" data-video="'+vid+'" aria-label="Afspil '+title+'"><img src="https://i.ytimg.com/vi/'+vid+'/hqdefault.jpg" alt="" loading="lazy"><span class="sx-play" aria-hidden="true">▶</span></button><p class="sektion-kicker">'+desc+'</p><h4>'+title+'</h4><a href="https://www.youtube.com/watch?v='+vid+'" target="_blank" rel="noopener">Åbn på YouTube ↗</a></article>'))

    # The archive's Falcon Heavy stream refuses embedding; keep its visual link usable.
    archived = videos.xpath('.//button[@data-video="wbSwFU6tY1c"]')[0]
    archived.tag = 'a'
    archived.set('href', 'https://www.youtube.com/watch?v=wbSwFU6tY1c')
    archived.set('target', '_blank'); archived.set('rel', 'noopener')
    archived.set('aria-label', 'Se Falcon Heavy Test Flight på YouTube (åbner i nyt vindue)')
    archived.attrib.pop('data-video'); archived.attrib.pop('type')
    # Keep every milestone; expose the story as a readable sequence instead of a fold.
    media = page.get_element_by_id('medier')
    page.get_element_by_id('h-medier').text = 'Fra de første raketter til en større forretning'
    for p in media.xpath('./header/p[contains(@class,"sektion-intro")]'): drop(p)
    for detail in media.xpath('./div/details'): unwrap(detail)
    for i, li in enumerate(media.xpath('.//ol[@class="tidslinje"]/li')):
        li.insert(0, html.fragment_fromstring('<span class="sx-milestone-no" aria-hidden="true">'+str(i+1).zfill(2)+'</span>'))
    xrow = media.xpath('.//div[@class="x-raekke"]')[0]
    xrow.getparent().insert(0, html.fragment_fromstring('<header class="sx-x-heading"><p class="sektion-kicker">DIREKTE FRA SELSKABERNE</p><h3>SpaceX og Starlink på X</h3></header>'))
    for article in xrow.findall('article'):
        for p in article.findall('p'):
            if 'xkort-dato' not in p.get('class',''): drop(p)
    for p in xrow.findall('p'): drop(p)

    # Ten ideas remain intact, but readers choose the argument that interests them.
    points = page.get_element_by_id('pointer')
    for detail in points.xpath('./details'): unwrap(detail)
    for i, li in enumerate(points.xpath('.//ol/li')):
        title = li.find('h3')
        body = li.xpath('./p[@class="spot-broed"]|./blockquote')[0]
        details = html.Element('details', {'class':'sx-point-expand'})
        summary = html.Element('summary'); summary.text = 'Læs argumentet'
        details.append(summary)
        for child in list(li):
            if child is not title and 'pointe-meta' not in child.get('class',''):
                details.append(child)
        li.append(details)
        if i==0: details.set('open','')
        # A short, existing sentence gives the reader a useful preview without invented quotations.
        full = ' '.join(body.text_content().split())
        lead = full.split('. ')[0].rstrip('.')+'.'
        if body.tag == 'blockquote': lead = '»' + lead.strip('»«') + '«'
        preview=html.Element('p',{'class':'sx-point-preview'}); preview.text=lead
        li.insert(list(li).index(details),preview)
        li.classes.add('sx-point')
    # Keep source attribution but remove the defensive introductory aside.
    intro = points.xpath('./header/p[contains(@class,"sektion-intro")]')[0]
    intro.text='Mads Christiansens perspektiver fra ugebreve, Substack og X. Start med det spørgsmål, der interesserer dig.'




    from spacex_story import enrich_spacex
    enrich_spacex(page)
